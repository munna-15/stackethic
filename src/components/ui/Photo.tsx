"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  gradient: string;
  className?: string;
  /** Tell Next.js how wide the image shows on screen. Use "100vw" for full-width images */
  sizes?: string;
  quality?: number;
  priority?: boolean;
};

/** Shows the photo when `src` is set, otherwise a gradient placeholder */
export default function Photo({
  src,
  alt = "",
  gradient,
  className = "",
  sizes = "(min-width:1024px) 33vw, 100vw",
  quality = 75,
  priority = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      aria-hidden={!src}
      className={`absolute inset-0 ${gradient} ${className}`}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
