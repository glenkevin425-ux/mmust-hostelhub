import { Check } from "lucide-react";
import { RoomType } from "../types";

interface RoomCardProps {
  room: RoomType;
  selected: boolean;
  onSelect: (roomId: string) => void;
}

export default function RoomCard({ room, selected, onSelect }: RoomCardProps) {
  return (
    <div
      className={`rounded-2xl border-2 p-5 transition-colors ${
        selected ? "border-brand-blue bg-brand-light" : "border-slate-200 bg-white"
      } ${!room.available ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-ink">{room.name}</h4>
          <p className="text-sm text-subink">{room.occupancy}</p>
        </div>
        {selected && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-white">
            <Check size={14} />
          </span>
        )}
      </div>

      <p className="mt-4 font-bold text-brand-navy">
        KSh {room.price.toLocaleString()}
        <span className="text-xs font-medium text-subink">/month</span>
      </p>

      <p className="mt-1 text-xs font-medium text-subink">
        {!room.available
          ? "Fully booked"
          : room.spacesLeft !== null
          ? `${room.spacesLeft} space${room.spacesLeft === 1 ? "" : "s"} left`
          : "Available"}
      </p>

      <button
        type="button"
        disabled={!room.available}
        onClick={() => onSelect(room.id)}
        className={`mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
          selected
            ? "bg-brand-blue text-white"
            : "bg-brand-navy text-white hover:bg-[#0e2a4e]"
        }`}
      >
        {selected ? "Selected" : "Select Room"}
      </button>
    </div>
  );
}
