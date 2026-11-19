import { headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Unable to determine the request host.");
  }

  return `${protocol}://${host}`;
}
