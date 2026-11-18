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
  "Thoughtful websites, custom software, AI automation and cloud solutions for ambitious businesses.";

/* ---------- Engineering card data ---------- */

type Tone = "olive" | "lime";
type Tab = "Digital" | "Software" | "AI";

const TABS: Tab[] = ["Digital", "Software", "AI"];

const COLUMN_DEFS: { offset: number; tones: Tone[] }[] = [
  { offset: 10, tones: ["olive", "lime"] },
  { offset: 4, tones: ["lime", "olive", "lime"] },
  { offset: 0, tones: ["lime", "olive", "lime"] },
  { offset: -2, tones: ["lime", "olive", "lime"] },
];

let segmentCounter = 0;

const COLUMNS = COLUMN_DEFS.map((col) => ({
  offset: col.offset,
  segs: col.tones.map((tone) => ({
    tone,
    i: segmentCounter++,
  })),
}));

const DATA: Record<Tab, number[]> = {
  Digital: [22, 4, 5, 24, 12, 8, 16, 16, 8, 30, 24],
  Software: [30, 6, 8, 18, 16, 6, 26, 10, 10, 22, 28],
  AI: [16, 5, 6, 30, 8, 10, 20, 20, 6, 34, 18],
};

const CARD_CONTENT: Record<
  Tab,
  { title: string; label: string; caption: string }
> = {
  Digital: {
    title: "Web experiences",
    label: "01 / Digital",
    caption: "Thoughtful design. Purposeful development.",
  },
  Software: {
    title: "Custom software",
    label: "02 / Engineering",
    caption: "Built around the way your business works.",
  },
  AI: {
    title: "Intelligent automation",
    label: "03 / AI solutions",
    caption: "Smarter workflows. More room to grow.",
  },
};

/* ---------- Chart layout ---------- */

const CHART_HEIGHT = 112;
const BAR_HEIGHT = 34;
const BAR_GAP = 3;

function getChartLayout(tab: Tab) {
  const heights = DATA[tab];

  return COLUMNS.flatMap((col) => {
    const columnHeights = col.segs.map((seg) => heights[seg.i]);

    const totalHeight =
      columnHeights.reduce((sum, height) => sum + height, 0) +
      BAR_GAP * (col.segs.length - 1);

    const startY = (CHART_HEIGHT - totalHeight) / 2 + col.offset / 2;

    let currentY = startY;

    return col.segs.map((seg) => {
      const height = heights[seg.i];

      const item = {
        i: seg.i,
        y: currentY,
        scale: height / BAR_HEIGHT,
      };

      currentY += height + BAR_GAP;

      return item;
    });
  });
}

const INITIAL_LAYOUT = getChartLayout("Digital");

/* ---------- Engineering card ---------- */

function CashflowCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const previousTab = useRef<Tab>("Digital");

  const [tab, setTab] = useState<Tab>("Digital");
  const content = CARD_CONTENT[tab];

  /* Initial chart entrance */

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      const chart = card.querySelector("[data-chart]");
      const segments = card.querySelectorAll<HTMLElement>("[data-seg]");

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(chart, { autoAlpha: 1, y: 0 });
        gsap.set(segments, { opacity: 1 });
        return;
      }

      const entrance = gsap.timeline({
        delay: 0.2,
        defaults: { ease: "power3.out" },
      });

      entrance.fromTo(
        chart,
        {
          autoAlpha: 0,
          y: 9,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
        },
      );

      entrance.fromTo(
        segments,
        {
          y: (i: number) => INITIAL_LAYOUT[i].y + 5,
          scaleY: (i: number) => INITIAL_LAYOUT[i].scale * 0.78,
          opacity: 0.78,
        },
        {
          y: (i: number) => INITIAL_LAYOUT[i].y,
          scaleY: (i: number) => INITIAL_LAYOUT[i].scale,
          opacity: 1,
          duration: 0.9,
          stagger: {
            each: 0.045,
            from: "start",
          },
          ease: "power3.out",
          overwrite: "auto",
        },
        0.08,
      );
    },
    { scope: cardRef },
  );

  /* Smooth chart morph on tab change */

  useGSAP(
    () => {
      if (previousTab.current === tab) {
        previousTab.current = tab;
        return;
      }

      previousTab.current = tab;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const layout = getChartLayout(tab);

      gsap.to("[data-seg]", {
        y: (i: number) => layout[i].y,
        scaleY: (i: number) => layout[i].scale,
        duration: reduce ? 0 : 0.9,
        ease: "power3.inOut",
        stagger: reduce ? 0 : 0.025,
        overwrite: "auto",
      });
    },
    {
      scope: cardRef,
      dependencies: [tab],
    },
  );

  return (
    <div
      ref={cardRef}
      data-card
      role="group"
      aria-label="StackEthic engineering overview"
      className="w-full rounded-[20px] bg-white p-4 text-se-olive shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] motion-safe:opacity-0 lg:w-[clamp(264px,21vw,320px)] xl:p-5"
    >
      {/* Card heading */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[17px] font-semibold leading-none tracking-[-0.02em]">
            Engineering
          </p>

          <span className="rounded-full bg-se-olive px-2 py-[3px] text-[10px] font-medium leading-none text-se-lime">
            Studio
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

      {/* Tabs */}

      <div
        role="tablist"
        aria-label="Engineering disciplines"
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

      {/* Selected service information */}

      <div className="mt-5 flex min-h-[43px] items-end justify-between">
        <div className="min-w-0">
          <p
            className="h-[12px] text-[10px] font-medium uppercase tracking-[0.12em] text-se-olive/40"
            aria-live="polite"
          >
            {content.label}
          </p>

          <p
            className="mt-1.5 h-[19px] overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-semibold tracking-[-0.04em]"
            aria-live="polite"
          >
            {content.title}
          </p>
        </div>
      </div>

      {/* Animated visual */}

      <div
        data-chart
        role="img"
        aria-label={`${content.title} visual`}
        className="mt-5 flex h-[112px] items-center gap-2 overflow-hidden motion-safe:opacity-0"
      >
        {COLUMNS.map((col, c) => (
          <div
            key={c}
            className="relative h-full flex-1"
            style={{ marginTop: col.offset }}
          >
            {col.segs.map((seg) => {
              const initial = INITIAL_LAYOUT[seg.i];

              return (
                <span
                  key={seg.i}
                  data-seg
                  className={`absolute left-0 top-0 block h-[34px] w-full rounded-[4px] ${
                    seg.tone === "olive" ? "bg-se-olive" : "bg-se-lime"
                  }`}
                  style={{
                    transform: `translateY(${initial.y}px) scaleY(${initial.scale})`,
                    transformOrigin: "50% 0%",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Description */}

      <div className="mt-3 flex h-[14px] items-center overflow-hidden">
        <p
          aria-live="polite"
          className="truncate text-[10px] leading-none text-se-olive/40"
        >
          {content.caption}
        </p>
      </div>
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

      /* Full entrance animation */

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          delay: 0.12,
          defaults: {
            ease: "power3.out",
          },
        });

        /* Headline */

        tl.fromTo(
          ".se-word",
          {
            opacity: 0,
            y: 32,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.085,
            clearProps: "filter,transform",
          },
          0.15,
        )

          /* Subtitle */

          .fromTo(
            "[data-hero-sub]",
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              clearProps: "transform",
            },
            0.8,
          )

          /* CTA */

          .fromTo(
            "[data-hero-cta]",
            {
              opacity: 0,
              y: 16,
              scale: 0.97,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "transform",
            },
            1.0,
          )

          /* Engineering card */

          .fromTo(
            "[data-card]",
            {
              opacity: 0,
              y: 42,
              scale: 0.975,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.15,
              ease: "power4.out",
              clearProps: "transform",
            },
            0.55,
          )

          /* Scroll indicator */

          .fromTo(
            "[data-indicator]",
            {
              opacity: 0,
              scaleY: 0,
              transformOrigin: "50% 0%",
            },
            {
              opacity: 1,
              scaleY: 1,
              duration: 0.8,
              clearProps: "transform",
            },
            1.35,
          );

        /* Subtle content parallax */

        gsap.to("[data-hero-content]", {
          y: -70,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: scrollTriggerConfig,
        });

        /* Scroll indicator movement */

        gsap.to("[data-thumb]", {
          yPercent: 200,
          ease: "none",
          scrollTrigger: {
            ...scrollTriggerConfig,
            scrub: 0.4,
          },
        });
      });

      /* Desktop background parallax */

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
      {/* Background photo */}

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

        {/* Top shadow */}

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
              href="/contact"
              className="group inline-flex h-7 items-center gap-1 rounded-full bg-se-lime px-3.5 text-[10px] font-medium leading-none text-se-olive transition-colors duration-300 hover:bg-white sm:h-12 sm:gap-2 sm:px-6 sm:text-[15px]"
            >
              Let&apos;s build
              <ArrowRight
                strokeWidth={2}
                aria-hidden="true"
                className="size-3 transition-transform duration-300 group-hover:translate-x-1 sm:size-4"
              />
            </Link>
          </div>
        </div>

        {/* Original right-side card placement and scroll indicator */}

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
