export interface Filters {
  maxPrice: number;
  maxDistance: number;
  roomType: string;
  facilities: string[];
  gender: string;
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
}

const ROOM_TYPES = ["Any", "Single Room", "Two Sharing", "Four Sharing"];
const GENDER_OPTIONS = ["Any", "Male", "Female", "Mixed"];
const FACILITY_OPTIONS = ["Wi-Fi", "Security", "Water", "Parking", "Hot Shower", "Study Area"];

export default function FilterPanel({ filters, onChange, onClear }: FilterPanelProps) {
  const toggleFacility = (facility: string) => {
    const next = filters.facilities.includes(facility)
      ? filters.facilities.filter((f) => f !== facility)
      : [...filters.facilities, facility];
    onChange({ ...filters, facilities: next });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-ink">Filters</h3>
        <button type="button" onClick={onClear} className="text-xs font-semibold text-brand-blue hover:underline">
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <label htmlFor="maxPrice" className="font-medium text-ink">Max price</label>
            <span className="text-subink">KSh {filters.maxPrice.toLocaleString()}</span>
          </div>
          <input
            id="maxPrice"
            type="range"
            min={3000}
            max={10000}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-brand-blue"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <label htmlFor="maxDistance" className="font-medium text-ink">Max distance</label>
            <span className="text-subink">{filters.maxDistance} km</span>
          </div>
          <input
            id="maxDistance"
            type="range"
            min={0.5}
            max={3}
            step={0.1}
            value={filters.maxDistance}
            onChange={(e) => onChange({ ...filters, maxDistance: Number(e.target.value) })}
            className="w-full accent-brand-blue"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-ink">Room type</p>
          <div className="flex flex-wrap gap-2">
            {ROOM_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ ...filters, roomType: type })}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  filters.roomType === type
                    ? "border-brand-blue bg-brand-light text-brand-blue"
                    : "border-slate-200 text-subink hover:border-brand-blue"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-ink">Gender preference</p>
          <div className="flex flex-wrap gap-2">
            {GENDER_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChange({ ...filters, gender: g })}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  filters.gender === g
                    ? "border-brand-blue bg-brand-light text-brand-blue"
                    : "border-slate-200 text-subink hover:border-brand-blue"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-ink">Facilities</p>
          <div className="space-y-2">
            {FACILITY_OPTIONS.map((facility) => (
              <label key={facility} className="flex items-center gap-2.5 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={filters.facilities.includes(facility)}
                  onChange={() => toggleFacility(facility)}
                  className="h-4 w-4 rounded border-slate-300 accent-brand-blue"
                />
                {facility}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
