"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gallery } from "@/data/aboutContent";
import SplitHeading from "@/components/ui/SplitHeading";
import Photo from "@/components/ui/Photo";

// Layout + parallax speed for each panel (negative speed moves the other way)
const layout = [
  { cell: "md:col-span-5", ratio: "aspect-[4/5]", speed: 0.18 },
  { cell: "md:col-span-7 md:mt-32", ratio: "aspect-[16/11]", speed: -0.12 },
  { cell: "md:col-span-6 md:col-start-4", ratio: "aspect-[16/10]", speed: 0.1 },
];

export default function ParallaxGallery() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // Two layers of parallax: the whole panel drifts, and the picture slides inside its frame
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
          const speed = Number(panel.dataset.speed || 0);
          const inner = panel.querySelector("[data-inner]");
          const st = {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          };
          gsap.fromTo(
            panel,
            { y: -speed * 100 },
            { y: speed * 100, ease: "none", scrollTrigger: st },
          );
          if (inner)
            gsap.fromTo(
              inner,
              { yPercent: -8 },
              { yPercent: 8, ease: "none", scrollTrigger: st },
            );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="overflow-hidden bg-white text-[#1c220a]">
      <div className="page-container py-24 lg:py-36">
        <SplitHeading
          text={gallery.title}
          className="max-w-[9em] text-[clamp(34px,4.8vw,68px)]"
        />

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-8 lg:mt-24">
          {gallery.items.map((g, i) => {
            const l = layout[i % layout.length];
            return (
              <figure
                key={g.label}
                data-panel
                data-speed={l.speed}
                className={l.cell}
              >
                <div
                  className={`relative overflow-hidden rounded-[24px] ${l.ratio}`}
                >
                  <div data-inner className="absolute inset-x-0 -inset-y-[10%]">
                    <Photo
                      src={g.image}
                      alt={g.label}
                      gradient={g.gradient}
                      sizes="(min-width:768px) 50vw, 100vw"
                      quality={85}
                    />
                  </div>
                </div>
                <figcaption className="mt-4 flex items-center gap-3 text-sm text-[#5c6152]">
                  <span className="tabular-nums text-[#8e967e]">0{i + 1}</span>
                  {g.label}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
