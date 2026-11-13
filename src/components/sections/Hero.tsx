"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ---------- Content ---------- */

const HEADLINE = [
  ["Build", "for", "fast"],
  ["moving", "business"],
];

const SUBTITLE =
  "AI-first ERP powering next-gen finance & accounting. General ledger, revenue automation, close management.";

/* ---------- Cashflow card data ---------- */

type Tone = "olive" | "lime";
type Tab = "Weekly" | "Monthly" | "Yearly";

const TABS: Tab[] = ["Weekly", "Monthly", "Yearly"];

const COLUMN_DEFS: { offset: number; tones: Tone[] }[] = [
  { offset: 10, tones: ["olive", "lime"] },
  { offset: 4, tones: ["lime", "olive", "lime"] },
  { offset: 0, tones: ["lime", "olive", "lime"] },
  { offset: -2, tones: ["lime", "olive", "lime"] },
];

let segmentCounter = 0;

const COLUMNS = COLUMN_DEFS.map((col) => ({
  offset: col.offset,
  segs: col.tones.map((tone) => ({ tone, i: segmentCounter++ })),
}));

const DATA: Record<Tab, number[]> = {
  Weekly: [22, 4, 5, 24, 12, 8, 16, 16, 8, 30, 24],
  Monthly: [30, 6, 8, 18, 16, 6, 26, 10, 10, 22, 28],
  Yearly: [16, 5, 6, 30, 8, 10, 20, 20, 6, 34, 18],
};

/* ---------- Cashflow card ---------- */

function CashflowCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFirstRun = useRef(true);
  const [tab, setTab] = useState<Tab>("Weekly");

  useGSAP(
    () => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }

      const heights = DATA[tab];

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.to("[data-seg]", {
        height: (i: number) => heights[i],
        duration: reduce ? 0 : 0.7,
        ease: "power3.out",
        stagger: reduce ? 0 : 0.04,
        overwrite: "auto",
      });
    },
    { scope: cardRef, dependencies: [tab] },
  );

  return (
    <div
      ref={cardRef}
      data-card
      role="group"
      aria-label="Cashflow overview"
      className="w-full rounded-[20px] bg-white p-4 text-se-olive shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] motion-safe:opacity-0 lg:w-[clamp(264px,21vw,320px)] xl:p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[17px] font-semibold leading-none tracking-[-0.02em]">
            Cashflow
          </p>

          <span className="rounded-full bg-se-olive px-2 py-[3px] text-[10px] font-medium leading-none text-se-lime">
            +23%
          </span>
        </div>

        <svg
          viewBox="0 0 10 10"
          aria-hidden="true"
          className="h-2.5 w-2.5 text-se-olive/30"
          fill="currentColor"
        >
          <circle cx="2" cy="2" r="1.4" />
          <circle cx="8" cy="2" r="1.4" />
          <circle cx="2" cy="8" r="1.4" />
          <circle cx="8" cy="8" r="1.4" />
        </svg>
      </div>

      <div
        role="tablist"
        aria-label="Cashflow period"
        className="mt-3 flex gap-4 text-[11px] leading-none"
      >
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`transition-colors duration-300 ${
              tab === t
                ? "font-semibold text-se-olive"
                : "text-se-olive/45 hover:text-se-olive/80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        data-chart
        role="img"
        aria-label={`${tab} cashflow chart`}
        className="mt-5 flex h-[112px] items-center gap-2 motion-safe:opacity-0"
      >
        {COLUMNS.map((col, c) => (
          <div
            key={c}
            className="flex flex-1 flex-col gap-[3px]"
            style={{ marginTop: col.offset }}
          >
            {col.segs.map((seg) => (
              <span
                key={seg.i}
                data-seg
                className={`block w-full rounded-[4px] ${
                  seg.tone === "olive" ? "bg-se-olive" : "bg-se-lime"
                }`}
                style={{ height: DATA.Weekly[seg.i] }}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] leading-none text-se-olive/40">
        5 updates on each response
      </p>
    </div>
  );
}

/* ---------- Hero ---------- */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      const scrollTriggerConfig = {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ---------- Entrance animation ---------- */

        const tl = gsap.timeline({
          delay: 0.15,
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(
          ".se-word",
          { opacity: 0, y: 28, filter: "blur(14px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.09,
            clearProps: "filter,transform",
          },
          0.2,
        )
          .fromTo(
            "[data-hero-sub]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.9, clearProps: "transform" },
            0.85,
          )
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.9, clearProps: "transform" },
            1.05,
          )
          .fromTo(
            "[data-card]",
            { opacity: 0, y: 56 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power4.out",
              clearProps: "transform",
            },
            0.6,
          )
          .to("[data-chart]", { opacity: 1, duration: 0.5 }, 1.0)
          .from(
            "[data-seg]",
            {
              scaleY: 0,
              transformOrigin: "50% 50%",
              duration: 0.9,
              stagger: 0.05,
              clearProps: "transform",
            },
            1.05,
          )
          .fromTo(
            "[data-indicator]",
            { opacity: 0, scaleY: 0, transformOrigin: "50% 0%" },
            { opacity: 1, scaleY: 1, duration: 0.8, clearProps: "transform" },
            1.4,
          );

        /* ---------- Scroll parallax (content, all screens) ---------- */

        // Hero content moves upward and fades out.
        gsap.to("[data-hero-content]", {
          y: -70,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: scrollTriggerConfig,
        });

        /* ---------- Scroll indicator progress ---------- */

        gsap.to("[data-thumb]", {
          yPercent: 200,
          ease: "none",
          scrollTrigger: { ...scrollTriggerConfig, scrub: 0.4 },
        });
      });

      // Background parallax only on desktop. On phones the photo is not
      // oversized, so the whole picture stays visible.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to("[data-hero-bg]", {
            yPercent: 14,
            ease: "none",
            scrollTrigger: scrollTriggerConfig,
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[560px] flex-col overflow-hidden bg-se-olive text-white sm:min-h-[640px] lg:min-h-[100svh]"
    >
      {/* Background photo + warm dark overlays.
          Phones: fills the section exactly (full picture, same ratio as desktop).
          Desktop: taller than the section so the parallax can move it. */}
      <div
        data-hero-bg
        className="absolute inset-x-0 top-0 z-0 h-full lg:-top-[10%] lg:h-[125%]"
        aria-hidden="true"
      >
        <Image
          src="/images/stackethic/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_20%]"
        />

        {/* Left-to-right warm shadow */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,14,8,0.72)_0%,rgba(20,14,8,0.38)_38%,rgba(20,14,8,0.08)_70%,rgba(20,14,8,0.22)_100%)]" />

        {/* Bottom shadow */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,10,6,0.62)_0%,rgba(14,10,6,0)_45%)]" />

        {/* Top shadow behind navbar */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,10,6,0.45)_0%,rgba(14,10,6,0)_22%)]" />
      </div>

      {/* Hero content */}
      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-[1760px] flex-1 flex-col justify-end px-4 pb-2.5 pt-14 sm:px-6 sm:pb-6 sm:pt-24 lg:px-11 lg:pb-7 lg:pt-28"
      >
        <div>
          <h1
            aria-label="Build for fast moving business"
            className="se-heading text-[6.4vw] text-white sm:text-[clamp(3rem,7vw,5rem)] lg:text-[clamp(3.5rem,5vw,6rem)]"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} aria-hidden="true" className="block">
                {line.map((word, j) => (
                  <Fragment key={word}>
                    <span className="se-word motion-safe:opacity-0">
                      {word}
                    </span>
                    {j < line.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mt-1.5 max-w-[50vw] text-[2.6vw] leading-[1.35] text-white/75 motion-safe:opacity-0 sm:mt-5 sm:max-w-[34rem] sm:text-base sm:leading-[1.4]"
          >
            {SUBTITLE}
          </p>

          <div data-hero-cta className="mt-2.5 motion-safe:opacity-0 sm:mt-7">
            <Link
              href="#signup"
              className="group inline-flex h-7 items-center gap-1 rounded-full bg-se-lime px-3.5 text-[10px] font-medium leading-none text-se-olive transition-colors duration-300 hover:bg-white sm:h-12 sm:gap-2 sm:px-6 sm:text-[15px]"
            >
              Get started
              <ArrowRight
                strokeWidth={2}
                aria-hidden="true"
                className="size-3 transition-transform duration-300 group-hover:translate-x-1 sm:size-4"
              />
            </Link>
          </div>
        </div>

        {/* Cashflow card + scroll indicator */}
        <div className="absolute bottom-2.5 right-3 w-[280px] origin-bottom-right scale-[0.46] min-[480px]:scale-[0.6] sm:bottom-6 sm:right-6 sm:w-[300px] sm:scale-[0.75] lg:bottom-11 lg:right-11 lg:w-auto lg:scale-100">
          <div
            data-indicator
            aria-hidden="true"
            className="absolute -left-4 top-6 hidden h-24 w-[3px] overflow-hidden rounded-full bg-white/25 motion-safe:opacity-0 md:block"
          >
            <span
              data-thumb
              className="block h-1/3 w-full rounded-full bg-white"
            />
          </div>

          <CashflowCard />
        </div>
      </div>
    </section>
  );
}
