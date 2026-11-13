"use client";
import { useState } from "react";
import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  gradient: string;
  url: string;
  sizes?: string;
  priority?: boolean;
};

// The frame takes the screenshot's own width/height ratio (kept between these limits),
// so the whole image is always visible on desktop and mobile.
const MIN_RATIO = 1.2;
const MAX_RATIO = 2;

/**
 * Browser-window frame for a website screenshot. Nothing is cropped:
 * the screen area adapts to the image ratio. If the file is missing, a gradient is shown.
 */
export default function ProjectThumb({
  src,
  alt,
  gradient,
  url,
  sizes = "(min-width:768px) 50vw, 100vw",
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  const [ratio, setRatio] = useState(1.6);
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const showImage = Boolean(src) && !failed;

  const applyRatio = (img: HTMLImageElement | null) => {
    if (img && img.naturalWidth && img.naturalHeight) {
      setRatio(
        Math.min(
          MAX_RATIO,
          Math.max(MIN_RATIO, img.naturalWidth / img.naturalHeight),
        ),
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-[18px] border border-black/10 bg-[#0f1306] shadow-[0_30px_60px_-30px_rgba(15,19,6,0.55)]">
      <div className="flex h-8 items-center gap-3 bg-[#1a2009] px-3 sm:h-9">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2 rounded-full bg-white/25" />
          <i className="size-2 rounded-full bg-white/25" />
          <i className="size-2 rounded-full bg-white/25" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-white/10 px-3 py-0.5 text-center text-[10px] text-white/60 sm:text-xs">
          {host}
        </span>
      </div>

      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        {!showImage && (
          <div aria-hidden className={`absolute inset-0 ${gradient}`} />
        )}
        {showImage && (
          <Image
            ref={applyRatio}
            src={src as string}
            alt={alt}
            fill
            sizes={sizes}
            quality={90}
            priority={priority}
            onLoad={(e) => applyRatio(e.currentTarget)}
            onError={() => setFailed(true)}
            className="object-contain object-top"
          />
        )}
      </div>
    </div>
  );
}
