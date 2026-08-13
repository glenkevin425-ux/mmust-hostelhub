import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 sm:aspect-[16/8]">
        <img
          src={images[active]}
          alt={`${alt} — photo ${active + 1}`}
          className="h-full w-full object-cover transition-opacity duration-200"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1} of ${alt}`}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                i === active ? "border-brand-blue" : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
