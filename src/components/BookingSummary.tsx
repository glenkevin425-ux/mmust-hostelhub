import { Hostel, RoomType } from "../types";

interface BookingSummaryProps {
  hostel: Hostel;
  room: RoomType;
  moveInDate: string;
}

export default function BookingSummary({ hostel, room, moveInDate }: BookingSummaryProps) {
  const formattedDate = moveInDate
    ? new Date(moveInDate).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })
    : "Not set";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold text-ink">Booking Summary</h3>

      <div className="mt-4 flex gap-3">
        <img src={hostel.images[0]} alt={hostel.name} className="h-16 w-16 rounded-lg object-cover" />
        <div>
          <p className="font-semibold text-ink">{hostel.name}</p>
          <p className="text-sm text-subink">{hostel.location}</p>
        </div>
      </div>

      <dl className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-subink">Room type</dt>
          <dd className="font-medium text-ink">{room.name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-subink">Move-in date</dt>
          <dd className="font-medium text-ink">{formattedDate}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="font-semibold text-ink">Total</span>
        <span className="text-lg font-bold text-brand-navy">
          KSh {room.price.toLocaleString()}
          <span className="text-xs font-medium text-subink">/month</span>
        </span>
      </div>
    </div>
  );
}
