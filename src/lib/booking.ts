import type { Hostel, RoomType } from "../types/hostel";

export type BookingStatus = "Pending" | "Cancelled";

export interface BookingRecord {
  ref: string;
  hostelId: string;
  roomId: string;
  hostelName: string;
  roomName: string;
  moveInDate: string;
  status: BookingStatus;
  createdAt: string;
  cancelledAt?: string;
}

const ACTIVITY_PREFIX = "mmust-hostelhub:activity:";
const BOOKING_PREFIX = "mmust-hostelhub:booking:";

export interface ActivityRecord {
  id: string;
  label: string;
  timestamp: string;
}

function bookingKey(userId: string) {
  return `${BOOKING_PREFIX}${userId}`;
}

function activityKey(userId: string) {
  return `${ACTIVITY_PREFIX}${userId}`;
}

export function getBooking(userId?: string | null): BookingRecord | null {
  if (!userId) return null;
  try {
    const raw = localStorage.getItem(bookingKey(userId));
    return raw ? (JSON.parse(raw) as BookingRecord) : null;
  } catch {
    return null;
  }
}

export function saveBooking(userId: string, booking: BookingRecord) {
  localStorage.setItem(bookingKey(userId), JSON.stringify(booking));
}

export function clearBooking(userId: string) {
  localStorage.removeItem(bookingKey(userId));
}

export function addActivity(userId: string, label: string) {
  try {
    const key = activityKey(userId);
    const existing = JSON.parse(localStorage.getItem(key) || "[]") as ActivityRecord[];
    const next: ActivityRecord[] = [
      { id: `${Date.now()}-${Math.random()}`, label, timestamp: new Date().toISOString() },
      ...existing,
    ].slice(0, 10);
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // Activity is informational; never block the booking flow if storage fails.
  }
}

export function getActivities(userId?: string | null): ActivityRecord[] {
  if (!userId) return [];
  try {
    return JSON.parse(localStorage.getItem(activityKey(userId)) || "[]") as ActivityRecord[];
  } catch {
    return [];
  }
}

export function createBookingRecord({
  userId,
  hostel,
  room,
  moveInDate,
}: {
  userId: string;
  hostel: Hostel;
  room: RoomType;
  moveInDate: string;
}): BookingRecord {
  const ref = `MMH-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const booking: BookingRecord = {
    ref,
    hostelId: hostel.id,
    roomId: room.id,
    hostelName: hostel.name,
    roomName: room.name,
    moveInDate,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  saveBooking(userId, booking);
  addActivity(userId, `Booking request submitted · ${ref}`);
  return booking;
}
