import { Link } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import { Hostel } from "../types";
import Rating from "./Rating";
import FacilityList from "./FacilityList";

interface HostelCardProps {
  hostel: Hostel;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export default function HostelCard({ hostel, isSaved, onToggleSave }: HostelCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardHover">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Link to={`/hostels/${hostel.id}`}>
          <img
            src={hostel.images[0]}
            alt={`${hostel.name} exterior`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          aria-label={isSaved ? `Remove ${hostel.name} from saved hostels` : `Save ${hostel.name}`}
          onClick={() => onToggleSave(hostel.id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform active:scale-90 shadow-sm"
        >
          <Heart
            size={18}
            className={isSaved ? "fill-brand-blue text-brand-blue" : "text-slate-500"}
          />
        </button>
        {hostel.availability === "Filling Fast" && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-navy/90 px-3 py-1 text-xs font-semibold text-white">
            Filling fast
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/hostels/${hostel.id}`} className="min-w-0">
            <h3 className="truncate font-semibold text-ink hover:text-brand-blue">{hostel.name}</h3>
          </Link>
          <Rating value={hostel.rating} />
        </div>

        <div className="flex items-center gap-1.5 text-sm text-subink">
          <MapPin size={14} />
          <span>{hostel.location} · {hostel.distanceKm} km from MMUST</span>
        </div>

        <FacilityList facilities={hostel.facilities} />

        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-xs text-subink">From</p>
            <p className="font-bold text-brand-navy">
              KSh {hostel.price.toLocaleString()}
              <span className="text-xs font-medium text-subink">/semester</span>
            </p>
          </div>
          <Link
            to={`/hostels/${hostel.id}`}
            className="rounded-lg bg-brand-light px-4 py-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
