import { Hostel } from "../types";
import hall1Photo from "../assets/hostels/hall-1.jpg";
import hall2Photo from "../assets/hostels/hall-2.jpg";
import hall3Photo from "../assets/hostels/hall-3.jpg";
import hall4Photo from "../assets/hostels/hall-4.jpg";

// NOTE: Placeholder prices, facilities and ratings below —
// replace with real figures from the MMUST accommodation office.
// Photos are real MMUST hall photos supplied by the user.
export const hostels: Hostel[] = [
  {
    id: "hall-1",
    name: "Hall 1",
    location: "MMUST Main Campus",
    distanceKm: 0.2,
    price: 5000,
    rating: 4.5,
    reviewCount: 142,
    images: [hall1Photo],
    description:
      "Hall 1 is one of MMUST's on-campus halls of residence, offering students a short walk to lecture halls, the library and the main cafeteria. Rooms are allocated through the university's standard accommodation process.",
    facilities: ["Wi-Fi", "Water", "Security", "Study Area", "Electricity"],
    roomTypes: [
      { id: "h1-double", name: "Two Sharing", occupancy: "2 students", price: 5000, spacesLeft: null, available: true },
      { id: "h1-quad", name: "Four Sharing", occupancy: "4 students", price: 3800, spacesLeft: 6, available: true },
    ],
    genderPreference: "Mixed",
    availability: "Available",
  },
  {
    id: "hall-2",
    name: "Hall 2",
    location: "MMUST Main Campus",
    distanceKm: 0.3,
    price: 5000,
    rating: 4.4,
    reviewCount: 118,
    images: [hall2Photo],
    description:
      "Hall 2 sits within the main campus grounds, close to the sports fields and student union. It's a popular choice among continuing students for its central location.",
    facilities: ["Wi-Fi", "Water", "Security", "Electricity"],
    roomTypes: [
      { id: "h2-double", name: "Two Sharing", occupancy: "2 students", price: 5000, spacesLeft: null, available: true },
      { id: "h2-quad", name: "Four Sharing", occupancy: "4 students", price: 3800, spacesLeft: 4, available: true },
    ],
    genderPreference: "Mixed",
    availability: "Available",
  },
  {
    id: "hall-3",
    name: "Hall 3",
    location: "MMUST Main Campus",
    distanceKm: 0.25,
    price: 5200,
    rating: 4.6,
    reviewCount: 131,
    images: [hall3Photo],
    description:
      "Hall 3 is a recently refurbished on-campus hall, with upgraded washrooms and a dedicated evening study room. It's a short walk from the School of Engineering.",
    facilities: ["Wi-Fi", "Water", "Security", "Study Area", "CCTV"],
    roomTypes: [
      { id: "h3-double", name: "Two Sharing", occupancy: "2 students", price: 5200, spacesLeft: null, available: true },
      { id: "h3-quad", name: "Four Sharing", occupancy: "4 students", price: 4000, spacesLeft: 3, available: true },
    ],
    genderPreference: "Mixed",
    availability: "Filling Fast",
  },
  {
    id: "hall-4-male",
    name: "Hall 4 (Male)",
    location: "MMUST Main Campus",
    distanceKm: 0.35,
    price: 4800,
    rating: 4.3,
    reviewCount: 96,
    images: [hall4Photo],
    description:
      "Hall 4 (Male) is the men's wing of Hall 4, located at the edge of the main campus. It has a gated entrance with a resident caretaker and a shared common room.",
    facilities: ["Wi-Fi", "Water", "Security", "Electricity"],
    roomTypes: [
      { id: "h4m-double", name: "Two Sharing", occupancy: "2 students", price: 4800, spacesLeft: null, available: true },
      { id: "h4m-quad", name: "Four Sharing", occupancy: "4 students", price: 3500, spacesLeft: 5, available: true },
    ],
    genderPreference: "Male",
    availability: "Available",
  },
  {
    id: "hall-4-female",
    name: "Hall 4 (Female)",
    location: "MMUST Main Campus",
    distanceKm: 0.35,
    price: 4800,
    rating: 4.5,
    reviewCount: 104,
    images: [hall4Photo],
    description:
      "Hall 4 (Female) is the women's wing of Hall 4, sharing the same compound as Hall 4 (Male) but with a separate secured entrance and dedicated caretaker.",
    facilities: ["Wi-Fi", "Water", "Security", "Electricity", "CCTV"],
    roomTypes: [
      { id: "h4f-double", name: "Two Sharing", occupancy: "2 students", price: 4800, spacesLeft: null, available: true },
      { id: "h4f-quad", name: "Four Sharing", occupancy: "4 students", price: 3500, spacesLeft: 2, available: true },
    ],
    genderPreference: "Female",
    availability: "Filling Fast",
  },
];

export const getHostelById = (id: string) => hostels.find((h) => h.id === id);
