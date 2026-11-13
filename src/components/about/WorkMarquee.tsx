"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/data/workContent";
import PillButton from "@/components/ui/PillButton";

const names = projects.map((p) => p.title);

function Row({ outline = false }: { outline?: boolean }) {
  return (
    <div className="flex w-max items-center gap-10 whitespace-nowrap text-[clamp(56px,9vw,150px)] font-medium leading-none tracking-[-0.04em]">
      {[...names, ...names].map((n, i) => (
        <span key={i} className="flex items-center gap-10">
          <span
            className={
              outline
                ? "text-transparent [-webkit-text-stroke:1.5px_rgba(221,244,106,0.7)]"
                : "text-white"
            }
          >
            {n}
          </span>
          <span
            aria-hidden
            className="size-3 rounded-full bg-se-lime sm:size-4"
          />
        </span>
      ))}
    </div>
  );
}

export default function WorkMarquee() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // The two rows slide in opposite directions as the section scrolls past
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        };
        gsap.fromTo(
          "[data-row-a]",
          { xPercent: 0 },
          { xPercent: -30, ease: "none", scrollTrigger: st },
        );
        gsap.fromTo(
          "[data-row-b]",
          { xPercent: -30 },
          { xPercent: 0, ease: "none", scrollTrigger: st },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-se-olive py-24 text-white lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 size-[480px] rounded-full bg-se-lime/10 blur-3xl" />
      </div>

      <div className="page-container relative">
        <p data-fade className="text-sm text-se-lime">
          Selected work
        </p>
      </div>

      <div className="relative mt-10 grid gap-6 lg:gap-8" aria-hidden>
        <div data-row-a>
          <Row />
        </div>
        <div data-row-b>
          <Row outline />
        </div>
      </div>

      <div className="page-container relative mt-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p data-fade className="max-w-[28rem] text-lg text-white/75">
          {projects.length} selected projects, from fashion e-commerce to SaaS
          platforms.
        </p>
        <div data-fade>
          <PillButton href="/work" variant="lime">
            View all work
          </PillButton>
        </div>
      </div>
    </section>
  );
}
