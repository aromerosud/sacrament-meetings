"use client";

import { useActionState, useState } from "react";
import type { ChangeEvent } from "react";
import { createMeeting, updateMeeting } from "@/lib/actions";
import type { State, SpeakerItem, SacramentMeeting } from "@/lib/types";

const initialState: State = {
  message: "",
};

const initialFormValues: Record<string, string> = {
  date: "",
  meetingType: "regular",
  presiding: "",
  conducting: "",
  openingHymnNumber: "",
  openingHymnTitle: "",
  openingPrayer: "",
  sacramentHymnNumber: "",
  sacramentHymnTitle: "",
  closingHymnNumber: "",
  closingHymnTitle: "",
  closingPrayer: "",
  announcements: "",
  wardBusiness: "",
  stakeBusiness: "",
};

const initialParticipants: SpeakerItem[] = [
  { name: "", topic: "", type: "speaker" },
];

function getInitialFormValues(
  meeting?: SacramentMeeting,
): Record<string, string> {
  if (!meeting) {
    return initialFormValues;
  }

  return {
    date: meeting.date.split("T")[0],
    meetingType: meeting.meetingType,
    presiding: meeting.presiding,
    conducting: meeting.conducting,
    openingHymnNumber: String(meeting.openingHymn.number),
    openingHymnTitle: meeting.openingHymn.title,
    openingPrayer: meeting.openingPrayer,
    sacramentHymnNumber: String(meeting.sacramentHymn.number),
    sacramentHymnTitle: meeting.sacramentHymn.title,
    closingHymnNumber: String(meeting.closingHymn.number),
    closingHymnTitle: meeting.closingHymn.title,
    closingPrayer: meeting.closingPrayer,
    announcements: meeting.announcements?.join("\n") ?? "",
    wardBusiness: meeting.wardBusiness
      .map((item) => item.description)
      .join("\n"),
    stakeBusiness: String(meeting.stakeBusiness),
  };
}

function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p key={error} className="text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}

export default function MeetingForm({
  meeting,
}: {
  meeting?: SacramentMeeting;
}) {
  const action = meeting ? updateMeeting.bind(null, meeting.id) : createMeeting;

  const [state, formAction, isPending] = useActionState(action, initialState);

  const [formValues, setFormValues] = useState(() =>
    getInitialFormValues(meeting),
  );

  const [participants, setParticipants] = useState<SpeakerItem[]>(() =>
    meeting?.speakers?.length ? meeting.speakers : initialParticipants,
  );

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleParticipantChange(
    index: number,
    field: keyof SpeakerItem,
    value: string,
  ) {
    setParticipants((previous) =>
      previous.map((participant, i) =>
        i === index ? { ...participant, [field]: value } : participant,
      ),
    );
  }

  function addParticipant() {
    setParticipants((previous) => [
      ...previous,
      { name: "", topic: "", type: "speaker" },
    ]);
  }

  function removeParticipant(index: number) {
    setParticipants((previous) => previous.filter((_, i) => i !== index));
  }

  return (
    <form action={formAction} className="space-y-6">
      <input
        type="hidden"
        name="speakers"
        value={JSON.stringify(participants)}
      />

      <div>
        <label htmlFor="date">Meeting date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formValues.date}
          onChange={handleChange}
          aria-describedby="date-error"
          required
        />
        <FieldErrors id="date" errors={state.errors?.date} />
      </div>

      <div>
        <label htmlFor="meetingType">Meeting type</label>
        <select
          id="meetingType"
          name="meetingType"
          value={formValues.meetingType}
          onChange={handleChange}
          aria-describedby="meetingType-error"
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>
        <FieldErrors id="meetingType" errors={state.errors?.meetingType} />
      </div>

      <div>
        <label htmlFor="presiding">Presiding</label>
        <input
          id="presiding"
          name="presiding"
          value={formValues.presiding}
          onChange={handleChange}
          aria-describedby="presiding-error"
        />
        <FieldErrors id="presiding" errors={state.errors?.presiding} />
      </div>

      <div>
        <label htmlFor="conducting">Conducting</label>
        <input
          id="conducting"
          name="conducting"
          value={formValues.conducting}
          onChange={handleChange}
          aria-describedby="conducting-error"
        />
        <FieldErrors id="conducting" errors={state.errors?.conducting} />
      </div>

      <div>
        <label htmlFor="openingHymnNumber">Opening hymn number</label>
        <input
          type="number"
          id="openingHymnNumber"
          name="openingHymnNumber"
          value={formValues.openingHymnNumber}
          onChange={handleChange}
          aria-describedby="openingHymnNumber-error"
        />
        <FieldErrors
          id="openingHymnNumber"
          errors={state.errors?.openingHymnNumber}
        />
      </div>

      <div>
        <label htmlFor="openingHymnTitle">Opening hymn title</label>
        <input
          id="openingHymnTitle"
          name="openingHymnTitle"
          value={formValues.openingHymnTitle}
          onChange={handleChange}
          aria-describedby="openingHymnTitle-error"
        />
        <FieldErrors
          id="openingHymnTitle"
          errors={state.errors?.openingHymnTitle}
        />
      </div>

      <div>
        <label htmlFor="openingPrayer">Opening prayer</label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          value={formValues.openingPrayer}
          onChange={handleChange}
          aria-describedby="openingPrayer-error"
        />
        <FieldErrors id="openingPrayer" errors={state.errors?.openingPrayer} />
      </div>

      <div>
        <label htmlFor="sacramentHymnNumber">Sacrament hymn number</label>
        <input
          type="number"
          id="sacramentHymnNumber"
          name="sacramentHymnNumber"
          value={formValues.sacramentHymnNumber}
          onChange={handleChange}
          aria-describedby="sacramentHymnNumber-error"
        />
        <FieldErrors
          id="sacramentHymnNumber"
          errors={state.errors?.sacramentHymnNumber}
        />
      </div>

      <div>
        <label htmlFor="sacramentHymnTitle">Sacrament hymn title</label>
        <input
          id="sacramentHymnTitle"
          name="sacramentHymnTitle"
          value={formValues.sacramentHymnTitle}
          onChange={handleChange}
          aria-describedby="sacramentHymnTitle-error"
        />
        <FieldErrors
          id="sacramentHymnTitle"
          errors={state.errors?.sacramentHymnTitle}
        />
      </div>

      <div>
        <label htmlFor="closingHymnNumber">Closing hymn number</label>
        <input
          type="number"
          id="closingHymnNumber"
          name="closingHymnNumber"
          value={formValues.closingHymnNumber}
          onChange={handleChange}
          aria-describedby="closingHymnNumber-error"
        />
        <FieldErrors
          id="closingHymnNumber"
          errors={state.errors?.closingHymnNumber}
        />
      </div>

      <div>
        <label htmlFor="closingHymnTitle">Closing hymn title</label>
        <input
          id="closingHymnTitle"
          name="closingHymnTitle"
          value={formValues.closingHymnTitle}
          onChange={handleChange}
          aria-describedby="closingHymnTitle-error"
        />
        <FieldErrors
          id="closingHymnTitle"
          errors={state.errors?.closingHymnTitle}
        />
      </div>

      <div>
        <label htmlFor="closingPrayer">Closing prayer</label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          value={formValues.closingPrayer}
          onChange={handleChange}
          aria-describedby="closingPrayer-error"
        />
        <FieldErrors id="closingPrayer" errors={state.errors?.closingPrayer} />
      </div>

      <div>
        <label htmlFor="announcements">Announcements</label>
        <textarea
          id="announcements"
          name="announcements"
          value={formValues.announcements}
          onChange={handleChange}
          aria-describedby="announcements-error"
        />
        <FieldErrors id="announcements" errors={state.errors?.announcements} />
      </div>

      <div>
        <label htmlFor="wardBusiness">Ward business</label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          value={formValues.wardBusiness}
          onChange={handleChange}
          aria-describedby="wardBusiness-error"
        />
        <FieldErrors id="wardBusiness" errors={state.errors?.wardBusiness} />
      </div>

      <div>
        <label htmlFor="stakeBusiness">Stake business</label>
        <input
          type="checkbox"
          id="stakeBusiness"
          name="stakeBusiness"
          checked={formValues.stakeBusiness === "true"}
          onChange={(event) =>
            setFormValues((previous) => ({
              ...previous,
              stakeBusiness: String(event.target.checked),
            }))
          }
          aria-describedby="stakeBusiness-error"
        />
        <FieldErrors id="stakeBusiness" errors={state.errors?.stakeBusiness} />
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Speakers and musical numbers</h2>

        {participants.map((participant, index) => (
          <div key={index} className="space-y-2 rounded border p-4">
            <div>
              <label htmlFor={`participant-name-${index}`}>Name</label>
              <input
                id={`participant-name-${index}`}
                value={participant.name}
                onChange={(event) =>
                  handleParticipantChange(index, "name", event.target.value)
                }
                aria-describedby={`participant-${index}-name-error`}
              />
              <FieldErrors
                id={`participant-${index}-name`}
                errors={state.errors?.[`speakers.${index}.name`]}
              />
            </div>

            <div>
              <label htmlFor={`participant-topic-${index}`}>
                Topic or description
              </label>
              <input
                id={`participant-topic-${index}`}
                value={participant.topic}
                onChange={(event) =>
                  handleParticipantChange(index, "topic", event.target.value)
                }
                aria-describedby={`participant-${index}-topic-error`}
              />
              <FieldErrors
                id={`participant-${index}-topic`}
                errors={state.errors?.[`speakers.${index}.topic`]}
              />
            </div>

            <div>
              <label htmlFor={`participant-type-${index}`}>
                Participation type
              </label>
              <select
                id={`participant-type-${index}`}
                value={participant.type}
                onChange={(event) =>
                  handleParticipantChange(index, "type", event.target.value)
                }
                aria-describedby={`participant-${index}-type-error`}
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical number</option>
              </select>
              <FieldErrors
                id={`participant-${index}-type`}
                errors={state.errors?.[`speakers.${index}.type`]}
              />
            </div>

            <FieldErrors
              id={`participant-${index}`}
              errors={state.errors?.speakers}
            />

            {participants.length > 1 && (
              <button
                type="button"
                onClick={() => removeParticipant(index)}
                className="text-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addParticipant}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition-colors"
        >
          Add speaker or musical number
        </button>
      </section>

      {state.message && (
        <p aria-live="polite" className="text-red-600">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending
          ? "Saving..."
          : meeting
            ? "Update meeting"
            : "Create meeting"}
      </button>
    </form>
  );
}
