import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"],
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Anderson",
    openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Sister Johnson",
    wardBusiness: [{ description: "Announcement of upcoming ward activities" }],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: "Brother Miller", topic: "The Power of Prayer", type: "speaker" },
      {
        name: "Sister Davis",
        topic: "Following Jesus Christ",
        type: "speaker",
      },
    ],
    closingHymn: { number: 85, title: "How Firm a Foundation" },
    closingPrayer: "Brother Wilson",
    announcements: ["Ward temple night: May 17"],
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Brother Taylor",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      { name: "Sister Brown", topic: "", type: "speaker" },
      { name: "Brother Clark", topic: "", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    closingPrayer: "Sister White",
    announcements: ["Youth activity: May 22"],
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "stake",
    presiding: "Stake President Johnson",
    conducting: "Brother Anderson",
    openingHymn: { number: 27, title: "Praise to the Man" },
    openingPrayer: "Sister Miller",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      {
        name: "Elder Davis",
        topic: "Building Faith in Jesus Christ",
        type: "speaker",
      },
      { name: "Sister Wilson", topic: "Serving One Another", type: "speaker" },
    ],
    closingHymn: { number: 134, title: "I Believe in Christ" },
    closingPrayer: "Brother Thomas",
    announcements: ["Stake conference: June 7"],
  },
  {
    id: 5,
    date: "2026-05-31",
    meetingType: "general",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Sister Garcia",
    wardBusiness: [
      { description: "Sustaining of new ward missionaries" },
      { description: "Presentation of Primary activities" },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 188, title: "Thy Will, O Lord, Be Done" },
    speakers: [
      {
        name: "Brother Adams",
        topic: "The Importance of Temple Worship",
        type: "speaker",
      },
      {
        name: "Sister Moore",
        topic: "Strengthening Our Families",
        type: "speaker",
      },
      { name: "Primary Children", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 89, title: "The Lord Is My Light" },
    closingPrayer: "Brother Martin",
    announcements: ["Family history activity: June 5"],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}
