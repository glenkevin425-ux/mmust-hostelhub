import {
  Wifi,
  Droplets,
  ShieldCheck,
  BookOpen,
  Zap,
  WashingMachine,
  Car,
  Flame,
  UtensilsCrossed,
  Camera,
  Sofa,
  LucideIcon,
} from "lucide-react";

const FACILITY_ICON: Record<string, LucideIcon> = {
  "Wi-Fi": Wifi,
  Water: Droplets,
  Security: ShieldCheck,
  "24/7 Security": ShieldCheck,
  "Study Area": BookOpen,
  Electricity: Zap,
  Laundry: WashingMachine,
  Parking: Car,
  "Hot Shower": Flame,
  Kitchen: UtensilsCrossed,
  CCTV: Camera,
  "Furnished Rooms": Sofa,
};

interface FacilityListProps {
  facilities: string[];
  variant?: "chips" | "grid";
}

export default function FacilityList({ facilities, variant = "chips" }: FacilityListProps) {
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {facilities.map((facility) => {
          const Icon = FACILITY_ICON[facility] ?? ShieldCheck;
          return (
            <div
              key={facility}
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <Icon size={18} className="text-brand-blue shrink-0" />
              <span className="text-sm font-medium text-ink">{facility}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <p className="text-sm text-subink truncate">
      {facilities.slice(0, 3).join(" · ")}
      {facilities.length > 3 ? ` +${facilities.length - 3} more` : ""}
    </p>
  );
}
