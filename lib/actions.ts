"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { State } from "@/lib/types";
import { z } from "zod";

import {
  addMeeting,
  updateMeeting as updateMeetingDB,
  deleteMeeting as deleteMeetingDB,
} from "@/lib/meetings-db";

const MeetingFormSchema = z
  .object({
    date: z.string().trim().min(1, "Date is required."),
    meetingType: z.enum([
      "testimony",
      "regular",
      "stake",
      "general",
      "special",
    ]),
    presiding: z.string().trim().min(1, "Presiding is required."),
    conducting: z.string().trim().min(1, "Conducting is required."),

    announcements: z.string().optional().default(""),

    openingHymnNumber: z
      .string()
      .regex(/^[1-9]\d*$/, "Enter a valid opening hymn number.")
      .transform(Number),
    openingHymnTitle: z
      .string()
      .trim()
      .min(1, "Opening hymn title is required."),
    openingPrayer: z.string().trim().min(1, "Opening prayer is required."),

    wardBusiness: z.string().optional().default(""),

    stakeBusiness: z.preprocess(
      (value) => value === "true" || value === "on",
      z.boolean(),
    ),

    sacramentHymnNumber: z
      .string()
      .regex(/^[1-9]\d*$/, "Enter a valid sacrament hymn number.")
      .transform(Number),
    sacramentHymnTitle: z
      .string()
      .trim()
      .min(1, "Sacrament hymn title is required."),

    speakers: z
      .string()
      .optional()
      .default("[]")
      .transform((value, ctx) => {
        try {
          const participants = JSON.parse(value);

          return participants.filter(
            (participant: { name?: string; topic?: string }) =>
              participant.name?.trim() || participant.topic?.trim(),
          );
        } catch {
          ctx.addIssue({
            code: "custom",
            message: "Invalid participant data.",
          });
          return z.NEVER;
        }
      })
      .pipe(
        z.array(
          z.object({
            name: z.string().trim().min(1, "Name is required."),
            topic: z.string().trim(),
            type: z.enum(["speaker", "musical-number"]),
          }),
        ),
      ),

    closingHymnNumber: z
      .string()
      .regex(/^[1-9]\d*$/, "Enter a valid closing hymn number.")
      .transform(Number),
    closingHymnTitle: z
      .string()
      .trim()
      .min(1, "Closing hymn title is required."),
    closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
  })
  .superRefine((data, ctx) => {
    if (data.meetingType !== "testimony") {
      data.speakers.forEach((speaker, index) => {
        if (!speaker.topic.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "Topic is required.",
            path: ["speakers", index, "topic"],
          });
        }
      });
    }
  })
  .transform((data) => ({
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: data.wardBusiness
      .split("\n")
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({ description })),
    stakeBusiness: data.stakeBusiness,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: data.speakers,
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  }));

export async function createMeeting(
  prevState: State,
  formData: FormData,
): Promise<State> {
  void prevState;

  const formValues: Record<string, string> = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key,
      typeof value === "string" ? value : "",
    ]),
  );

  const validatedFields = MeetingFormSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.issues.reduce(
        (errors, issue) => {
          const key = issue.path.join(".");
          errors[key] ??= [];
          errors[key].push(issue.message);
          return errors;
        },
        {} as Record<string, string[]>,
      ),
      values: formValues,
    };
  }

  const meetingData = validatedFields.data;

  try {
    await addMeeting(meetingData);
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw new Error("Unable to create the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData,
): Promise<State> {
  void prevState;

  if (!Number.isInteger(id) || id <= 0) {
    return { message: "Invalid meeting ID." };
  }

  const formValues: Record<string, string> = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key,
      typeof value === "string" ? value : "",
    ]),
  );

  const validatedFields = MeetingFormSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.issues.reduce(
        (errors, issue) => {
          const key = issue.path.join(".");
          errors[key] ??= [];
          errors[key].push(issue.message);
          return errors;
        },
        {} as Record<string, string[]>,
      ),
      values: formValues,
    };
  }

  const meetingData = validatedFields.data;

  let updatedMeeting;

  try {
    updatedMeeting = await updateMeetingDB(id, meetingData);
  } catch (error) {
    console.error("Error updating meeting:", error);
    throw new Error("Unable to update the meeting. Please try again.");
  }

  if (!updatedMeeting) {
    return {
      message: "Meeting not found.",
      values: formValues,
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeeting(id: number, formData: FormData) {
  void formData;

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid meeting ID.");
  }

  let deleted;

  try {
    deleted = await deleteMeetingDB(id);
  } catch (error) {
    console.error("Error deleting meeting:", error);
    throw new Error("Failed to delete meeting. Please try again.");
  }

  if (!deleted) {
    throw new Error("Meeting not found.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}
