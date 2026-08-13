export interface RoomType {
  id: string;
  name: string;
  occupancy: string;
  price: number;
  spacesLeft: number | null; // null = plenty available
  available: boolean;
}

export interface Hostel {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  facilities: string[];
  roomTypes: RoomType[];
  genderPreference: "Male" | "Female" | "Mixed";
  availability: "Available" | "Filling Fast" | "Full";
}

export interface BookingDetails {
  fullName: string;
  regNumber: string;
  phone: string;
  email: string;
  gender: string;
  course: string;
  yearOfStudy: string;
  moveInDate: string;
  hostelId: string;
  roomId: string;
}
