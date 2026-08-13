import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export default function Rating({ value, reviewCount, size = "sm" }: RatingProps) {
  const iconSize = size === "sm" ? 14 : 18;
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className={`inline-flex items-center gap-1 ${textSize}`}>
      <Star size={iconSize} className="fill-amber-400 text-amber-400" />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-subink">({reviewCount} reviews)</span>
      )}
    </div>
  );
}
