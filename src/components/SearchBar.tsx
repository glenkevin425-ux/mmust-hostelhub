import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Wallet, BedDouble, Search } from "lucide-react";

const PRICE_RANGES = [
  { label: "Any price", value: "" },
  { label: "KSh 3,000 – 5,000", value: "3000-5000" },
  { label: "KSh 5,000 – 7,000", value: "5000-7000" },
  { label: "KSh 7,000 – 10,000", value: "7000-10000" },
];

const ROOM_TYPES = [
  { label: "Any room type", value: "" },
  { label: "Single Room", value: "single" },
  { label: "Two Sharing", value: "double" },
  { label: "Four Sharing", value: "quad" },
];

export default function SearchBar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("q", location);
    if (price) params.set("price", price);
    if (room) params.set("room", room);
    navigate(`/hostels?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-cardHover sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-stretch lg:gap-0 lg:divide-x lg:divide-slate-200"
    >
      <label className="flex items-center gap-3 rounded-xl px-3 py-2.5 lg:px-4">
        <MapPin size={18} className="shrink-0 text-brand-blue" />
        <span className="flex w-full flex-col">
          <span className="text-xs font-medium text-subink">Location</span>
          <input
            type="text"
            placeholder="Near MMUST"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border-0 p-0 text-sm font-medium text-ink placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
        </span>
      </label>

      <label className="flex items-center gap-3 rounded-xl px-3 py-2.5 lg:px-4">
        <Wallet size={18} className="shrink-0 text-brand-blue" />
        <span className="flex w-full flex-col">
          <span className="text-xs font-medium text-subink">Price range</span>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border-0 bg-transparent p-0 text-sm font-medium text-ink focus:outline-none focus:ring-0"
          >
            {PRICE_RANGES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </span>
      </label>

      <label className="flex items-center gap-3 rounded-xl px-3 py-2.5 lg:px-4">
        <BedDouble size={18} className="shrink-0 text-brand-blue" />
        <span className="flex w-full flex-col">
          <span className="text-xs font-medium text-subink">Room type</span>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full border-0 bg-transparent p-0 text-sm font-medium text-ink focus:outline-none focus:ring-0"
          >
            {ROOM_TYPES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </span>
      </label>

      <div className="flex items-center p-1.5 lg:pl-4">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#094a89] active:scale-[0.98] lg:w-auto"
        >
          <Search size={16} />
          Search
        </button>
      </div>
    </form>
  );
}
