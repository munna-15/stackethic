"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ---------- Neutral placeholder wordmarks (replace with real client logos) ---------- */

type Kind =
  | "ring"
  | "bars"
  | "hex"
  | "spark"
  | "tri"
  | "dots"
  | "wave"
  | "notch";

const LOGOS: { name: string; kind: Kind; style: string }[] = [
  { name: "Lumora", kind: "ring", style: "font-semibold tracking-[-0.04em]" },
  {
    name: "Vantiq",
    kind: "hex",
    style: "font-semibold uppercase tracking-[0.12em] text-[0.78em]",
  },
  { name: "orbitly", kind: "dots", style: "font-medium tracking-[-0.03em]" },
  { name: "Kestrel", kind: "tri", style: "font-bold tracking-[-0.05em]" },
  { name: "Nimbus", kind: "wave", style: "font-medium tracking-[-0.02em]" },
  {
    name: "Fieldnote",
    kind: "notch",
    style: "font-semibold tracking-[-0.04em]",
  },
  {
    name: "Arcadia",
    kind: "spark",
    style: "font-medium uppercase tracking-[0.1em] text-[0.78em]",
  },
  { name: "Quanta", kind: "bars", style: "font-bold tracking-[-0.05em]" },
  {
    name: "Halcyon",
    kind: "ring",
    style: "font-medium lowercase tracking-[-0.03em]",
  },
  { name: "Trellis", kind: "hex", style: "font-semibold tracking-[-0.04em]" },
];

function Mark({ kind }: { kind: Kind }) {
  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    className: "h-[1em] w-[1em] shrink-0",
    fill: "currentColor",
  } as const;

  switch (kind) {
    case "ring":
      return (
        <svg {...common}>
          <circle
            cx="12"
            cy="12"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
          />
        </svg>
      );
    case "bars":
      return (
        <svg {...common}>
          <rect x="3" y="12" width="4" height="9" rx="1" />
          <rect x="10" y="6" width="4" height="15" rx="1" />
          <rect x="17" y="2" width="4" height="19" rx="1" />
        </svg>
      );
    case "hex":
      return (
        <svg {...common}>
          <path d="M12 2 21 7v10l-9 5-9-5V7z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 1c1 6 5 10 11 11-6 1-10 5-11 11-1-6-5-10-11-11C7 11 11 7 12 1z" />
        </svg>
      );
    case "tri":
      return (
        <svg {...common}>
          <path d="M12 3 22 21H2z" />
        </svg>
      );
    case "dots":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="4.5" />
          <circle cx="17" cy="7" r="4.5" />
          <circle cx="7" cy="17" r="4.5" />
          <circle cx="17" cy="17" r="4.5" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          <path
            d="M2 15c3-8 6-8 10 0s7 8 10 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "notch":
      return (
        <svg {...common}>
          <path d="M3 3h12a6 6 0 0 1 6 6v12H9a6 6 0 0 1-6-6z" />
        </svg>
      );
  }
}

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={`flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16 lg:gap-20 lg:pr-20 ${
        duplicate
          ? "motion-reduce:hidden"
          : "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0"
      }`}
    >
      {LOGOS.map((logo) => (
        <li
          key={logo.name}
          className="flex items-center gap-2 whitespace-nowrap text-[22px] leading-none text-se-olive/75 sm:text-2xl"
        >
          <Mark kind={logo.kind} />
          <span className={`font-se-display ${logo.style}`}>{logo.name}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Section ---------- */

const EDGE_MASK =
  "[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]";

export default function LogoMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!section || !viewport || !track) return;

        // Entrance
        gsap.fromTo(
          "[data-marquee-pill]",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          },
        );
        gsap.fromTo(
          viewport,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          },
        );

        // Endless loop: the track holds two identical groups, so -50% is seamless
        const loop = gsap.to(track, {
          xPercent: -50,
          duration: 50,
          ease: "none",
          repeat: -1,
        });

        // Only run while the section is on screen
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()),
        });
        if (!st.isActive) loop.pause();

        // Ease to a stop on hover
        const slow = () =>
          gsap.to(loop, {
            timeScale: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        const resume = () =>
          gsap.to(loop, {
            timeScale: 1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        viewport.addEventListener("mouseenter", slow);
        viewport.addEventListener("mouseleave", resume);

        return () => {
          viewport.removeEventListener("mouseenter", slow);
          viewport.removeEventListener("mouseleave", resume);
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Trusted by growing businesses"
      className="bg-se-paper py-14 font-se-sans sm:py-16 lg:pb-4 lg:pt-20"
    >
      <div className="px-4 sm:px-6">
        <p
          data-marquee-pill
          className="mx-auto w-fit max-w-full rounded-full bg-se-olive/[0.06] px-4 py-2 text-center text-[12px] leading-snug text-se-olive/70 motion-safe:opacity-0 sm:text-[13px]"
        >
          Join over 500 businesses already growing with StackEthic.
        </p>
      </div>

      <div
        ref={viewportRef}
        className={`relative mt-9 overflow-hidden motion-safe:opacity-0 sm:mt-10 ${EDGE_MASK}`}
      >
        <div ref={trackRef} className="flex w-max motion-reduce:w-full">
          <LogoGroup />
          <LogoGroup duplicate />
        </div>
      </div>
    </section>
  );
}
