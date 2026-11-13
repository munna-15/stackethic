"use client";
import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { manifesto } from "@/data/aboutContent";

export default function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);

  // Scroll-scrubbed reveal: each word lights up as you scroll through the paragraph
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.querySelectorAll("[data-w]"),
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: root.querySelector("[data-text]"),
              start: "top 82%",
              end: "bottom 50%",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="approach" className="bg-white text-[#1c220a]">
      <div className="page-container py-28 lg:py-44">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d1d5db] px-4 py-1.5 text-sm text-[#5c6152]">
          <span className="size-1.5 rounded-full bg-se-olive" />
          {manifesto.label}
        </span>
        <p
          data-text
          className="mt-8 max-w-[1100px] text-[clamp(28px,4.2vw,64px)] leading-[1.12] tracking-[-0.03em]"
        >
          {manifesto.text.split(" ").map((w, i) => (
            <Fragment key={i}>
              <span data-w className="inline-block">
                {w}
              </span>{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
