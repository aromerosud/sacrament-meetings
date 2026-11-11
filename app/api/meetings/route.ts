import { getMeetings, getMeetingByDate } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  // Search by date when the date parameter is provided
  const date = searchParams.get("date");

  if (date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json(
        { error: "Invalid date format. Use YYYY-MM-DD." },
        { status: 400 },
      );
    }

    const meeting = await getMeetingByDate(date);

    return Response.json(meeting ? [meeting] : []);
  }

  // Search and pagination
  const query = searchParams.get("query") ?? "";
  const currentPage = Number(searchParams.get("page") ?? "1");

  if (!Number.isInteger(currentPage) || currentPage < 1) {
    return Response.json({ error: "Invalid page number" }, { status: 400 });
  }

  const meetings = await getMeetings(query, currentPage);

  return Response.json(meetings);
}
