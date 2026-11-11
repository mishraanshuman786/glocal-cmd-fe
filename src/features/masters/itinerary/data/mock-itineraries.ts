import type { Itinerary } from "../types/itinerary.types";

export const mockItineraries: Itinerary[] = [
  {
    id: "1",
    title: "Goa Tour Package 3N/4D",
    status: "ACTIVE",
    isActive: true,
    days: [
      {
        id: "1-1",
        dayNumber: 1,
        title: "Arrival in Goa",
        activities: [
          { id: "1-1-1", title: "Airport transfer", order: 1 },
          { id: "1-1-2", title: "Hotel check-in", order: 2 },
        ],
      },
      {
        id: "1-2",
        dayNumber: 2,
        title: "South Goa sightseeing",
        activities: [
          { id: "1-2-1", title: "Visit Miramar Beach", order: 1 },
          { id: "1-2-2", title: "Visit Old Goa churches", order: 2 },
        ],
      },
      {
        id: "1-3",
        dayNumber: 3,
        title: "North Goa sightseeing",
        activities: [
          { id: "1-3-1", title: "Visit Baga Beach", order: 1 },
        ],
      },
      {
        id: "1-4",
        dayNumber: 4,
        title: "Departure",
        activities: [
          { id: "1-4-1", title: "Airport transfer", order: 1 },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Kashmir Tour Package 5N/6D",
    status: "ACTIVE",
    isActive: true,
    days: Array.from({ length: 6 }, (_, index) => ({
      id: `2-${index + 1}`,
      dayNumber: index + 1,
      title: [
        "Jammu arrival, transfer to Pahalgam",
        "Pahalgam local sightseeing",
        "Gulmarg sightseeing",
        "Srinagar local sightseeing",
        "Sonamarg excursion",
        "Departure",
      ][index],
      activities: [
        {
          id: `2-${index + 1}-1`,
          title: "Local sightseeing and transfers",
          order: 1,
        },
      ],
    })),
  },
  {
    id: "3",
    title: "Bhuj and Kutch 2N/3D",
    status: "ACTIVE",
    isActive: true,
    days: [
      {
        id: "3-1",
        dayNumber: 1,
        title: "Rann Utsav, a tent city",
        activities: [
          { id: "3-1-1", title: "Arrival and camp check-in", order: 1 },
        ],
      },
      {
        id: "3-2",
        dayNumber: 2,
        title: "Kalo Dungar to Mandvi",
        activities: [
          { id: "3-2-1", title: "Sightseeing", order: 1 },
        ],
      },
      {
        id: "3-3",
        dayNumber: 3,
        title: "Departure",
        activities: [
          { id: "3-3-1", title: "Transfer to airport", order: 1 },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Nainital 2 Nights – 3 Days",
    status: "ACTIVE",
    isActive: true,
    days: [
      {
        id: "4-1",
        dayNumber: 1,
        title: "Delhi arrival, transfer to Nainital",
        activities: [
          { id: "4-1-1", title: "Arrival and transfer", order: 1 },
        ],
      },
      {
        id: "4-2",
        dayNumber: 2,
        title: "Nainital sightseeing + Kainchidham",
        activities: [
          { id: "4-2-1", title: "Local sightseeing", order: 1 },
        ],
      },
      {
        id: "4-3",
        dayNumber: 3,
        title: "Departure",
        activities: [
          { id: "4-3-1", title: "Return transfer", order: 1 },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Jaipur Heritage Tour 2N/3D",
    status: "DRAFT",
    isActive: false,
    days: [
      {
        id: "5-1",
        dayNumber: 1,
        title: "Jaipur arrival",
        activities: [
          { id: "5-1-1", title: "Hotel check-in", order: 1 },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "Manali Adventure 4N/5D",
    status: "ACTIVE",
    isActive: true,
    days: [
      {
        id: "6-1",
        dayNumber: 1,
        title: "Arrival in Manali",
        activities: [
          { id: "6-1-1", title: "Hotel transfer", order: 1 },
        ],
      },
    ],
  },
  {
    id: "7",
    title: "Kerala Backwaters 3N/4D",
    status: "INACTIVE",
    isActive: false,
    days: [
      {
        id: "7-1",
        dayNumber: 1,
        title: "Arrival in Kochi",
        activities: [
          { id: "7-1-1", title: "Airport transfer", order: 1 },
        ],
      },
    ],
  },
];