"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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

/** Seconds each tab stays before the card moves on by itself */
const AUTO_SECONDS = 4.5;

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
  const isFirstRun = useRef(true);
  const tiltReady = useRef(false);
  const timerRef = useRef<gsap.core.Tween | null>(null);

  const [tab, setTab] = useState<Tab>("Digital");

  const content = CARD_CONTENT[tab];

  /* Tab change: sliding pill, bars morph, text swaps, auto-advance timer */
  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      const first = isFirstRun.current;
      isFirstRun.current = false;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Sliding pill behind the active tab
      const btn = card.querySelector<HTMLElement>(`[data-tab="${tab}"]`);
      const pill = card.querySelector<HTMLElement>("[data-pill]");
      if (btn && pill) {
        const to = { x: btn.offsetLeft, width: btn.offsetWidth };
        if (first || reduce) gsap.set(pill, to);
        else gsap.to(pill, { ...to, duration: 0.7, ease: "expo.out" });
      }

      if (!first) {
        // Bars morph into the new shape as a left-to-right wave
        const layout = getChartLayout(tab);
        gsap.to("[data-seg]", {
          y: (i: number) => layout[i].y,
          scaleY: (i: number) => layout[i].scale,
          duration: reduce ? 0 : 1,
          ease: "expo.inOut",
          stagger: reduce ? 0 : 0.035,
          overwrite: "auto",
        });

        // Text slides and un-blurs in
        if (!reduce) {
          gsap.fromTo(
            "[data-swap]",
            { opacity: 0, y: 10, filter: "blur(5px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "filter,transform",
            },
          );
        }
      }

      // Auto-advance: a thin line fills, then the next tab opens
      timerRef.current?.kill();
      if (!reduce) {
        const index = TABS.indexOf(tab);
        gsap.set("[data-timer]", { scaleX: 0 });
        timerRef.current = gsap.to("[data-timer]", {
          scaleX: 1,
          duration: AUTO_SECONDS,
          ease: "none",
          delay: first ? 3.2 : 0.4,
          onComplete: () => setTab(TABS[(index + 1) % TABS.length]),
        });
      }
    },
    { scope: cardRef, dependencies: [tab] },
  );

  /* Idle life: columns breathe softly, 3D tilt switches on after the entrance */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-col]", {
          scaleY: 1.045,
          transformOrigin: "50% 50%",
          duration: () => 2.2 + Math.random() * 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.35, from: "start" },
          delay: 3,
        });
        gsap.delayedCall(2.4, () => {
          tiltReady.current = true;
        });
      });
      return () => mm.revert();
    },
    { scope: cardRef },
  );

  /* Pointer: pause the timer, tilt the card, light follows the cursor */
  const onEnter = () => timerRef.current?.pause();

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || !tiltReady.current || e.pointerType !== "mouse") return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    card.style.setProperty("--my", `${(py + 0.5) * 100}%`);
    gsap.to(card, {
      rotationY: px * 9,
      rotationX: -py * 9,
      transformPerspective: 900,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    timerRef.current?.resume();
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto",
    });
    gsap.to(card.querySelectorAll("[data-col]"), {
      opacity: 1,
      duration: 0.4,
      overwrite: "auto",
    });
  };

  /* Hover a column: the others dim */
  const focusColumn = (index: number | null) => {
    const cols = cardRef.current?.querySelectorAll("[data-col]");
    if (!cols) return;
    gsap.to(cols, {
      opacity: (i: number) => (index === null || i === index ? 1 : 0.35),
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      data-card
      role="group"
      aria-label="StackEthic engineering overview"
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onFocus={onEnter}
      onBlur={() => timerRef.current?.resume()}
      className="group/card relative w-full overflow-hidden rounded-[20px] bg-white p-4 text-se-olive shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] motion-safe:opacity-0 lg:w-[clamp(264px,21vw,320px)] xl:p-5"
    >
      {/* Light that follows the cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), rgba(220,245,90,0.35), transparent 65%)",
        }}
      />

      <div className="relative">
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

        {/* Tabs with a sliding pill */}

        <div
          role="tablist"
          aria-label="Engineering disciplines"
          className="relative mt-3 inline-flex gap-0.5 rounded-full bg-se-olive/[0.05] p-0.5 text-[11px] leading-none"
        >
          <span
            data-pill
            aria-hidden="true"
            className="absolute left-0 top-0.5 h-[calc(100%-4px)] w-0 rounded-full bg-se-lime"
          />
          {TABS.map((t) => (
            <button
              key={t}
              data-tab={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`relative z-10 rounded-full px-3 py-1.5 transition-colors duration-300 ${
                tab === t
                  ? "font-semibold text-se-olive"
                  : "text-se-olive/50 hover:text-se-olive/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Auto-advance timer line */}

        <div
          aria-hidden="true"
          className="mt-3 h-px overflow-hidden bg-se-olive/10"
        >
          <span
            data-timer
            className="block h-full w-full origin-left scale-x-0 bg-se-olive"
          />
        </div>

        {/* Selected service information */}

        <div className="mt-4 flex min-h-[43px] items-end justify-between">
          <div className="min-w-0">
            <p
              data-swap
              className="h-[12px] text-[10px] font-medium uppercase tracking-[0.12em] text-se-olive/40"
              aria-live="polite"
            >
              {content.label}
            </p>

            <p
              data-swap
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
          onPointerLeave={() => focusColumn(null)}
          className="mt-4 flex h-[112px] items-center gap-2 overflow-hidden motion-safe:opacity-0"
        >
          {COLUMNS.map((col, c) => (
            <div
              key={c}
              data-col
              onPointerEnter={() => focusColumn(c)}
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
                      seg.tone === "olive"
                        ? "bg-se-olive"
                        : "bg-se-lime shadow-[0_0_14px_rgba(220,245,90,0.55)]"
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
            data-swap
            aria-live="polite"
            className="truncate text-[10px] leading-none text-se-olive/40"
          >
            {content.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      const scrollTriggerConfig = {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ---------- Entrance ---------- */

        const tl = gsap.timeline({
          delay: 0.1,
          defaults: { ease: "power3.out" },
        });

        tl
          // Photo settles in slowly while a dark veil lifts
          .fromTo(
            "[data-hero-img]",
            { scale: 1.14 },
            { scale: 1, duration: 2.6, ease: "expo.out" },
            0,
          )
          .fromTo(
            "[data-hero-veil]",
            { opacity: 0.6 },
            { opacity: 0, duration: 1.6, ease: "power2.out" },
            0,
          )
          // Headline: word by word, blur to sharp
          .fromTo(
            ".se-word",
            { opacity: 0, y: 44, filter: "blur(16px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.3,
              stagger: 0.075,
              ease: "expo.out",
              clearProps: "filter,transform",
            },
            0.25,
          )
          .fromTo(
            "[data-hero-sub]",
            { opacity: 0, y: 22, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1,
              clearProps: "filter,transform",
            },
            0.85,
          )
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 22, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "back.out(1.6)",
              clearProps: "transform",
            },
            1.05,
          )
          // Card rises, then its chart reveals as a wave
          .fromTo(
            "[data-card]",
            { opacity: 0, y: 70, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.5,
              ease: "expo.out",
              clearProps: "transform",
            },
            0.6,
          )
          .fromTo(
            "[data-glow]",
            { opacity: 0 },
            { opacity: 0.5, duration: 2, ease: "power2.out" },
            0.9,
          )
          .to("[data-chart]", { opacity: 1, duration: 0.6 }, 1.0)
          .fromTo(
            "[data-seg]",
            {
              scaleY: 0,
              y: (i: number) =>
                INITIAL_LAYOUT[i].y +
                (INITIAL_LAYOUT[i].scale * BAR_HEIGHT) / 2,
            },
            {
              scaleY: (i: number) => INITIAL_LAYOUT[i].scale,
              y: (i: number) => INITIAL_LAYOUT[i].y,
              duration: 1.3,
              ease: "expo.out",
              stagger: 0.06,
            },
            1.15,
          )
          .fromTo(
            "[data-indicator]",
            { opacity: 0, scaleY: 0, transformOrigin: "50% 0%" },
            { opacity: 1, scaleY: 1, duration: 0.8, clearProps: "transform" },
            1.5,
          );

        // Glow behind the card breathes
        gsap.to("[data-glow]", {
          opacity: 0.25,
          scale: 1.08,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 3,
        });

        /* ---------- Scroll parallax ---------- */

        gsap.to("[data-hero-content]", {
          y: -70,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: scrollTriggerConfig,
        });

        gsap.to("[data-thumb]", {
          yPercent: 200,
          ease: "none",
          scrollTrigger: { ...scrollTriggerConfig, scrub: 0.4 },
        });
      });

      /* Desktop only: photo parallax and a magnetic button */

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (hover: hover)",
        () => {
          gsap.to("[data-hero-bg]", {
            yPercent: 14,
            ease: "none",
            scrollTrigger: scrollTriggerConfig,
          });

          const cta = ctaRef.current;
          if (!cta) return;

          const onMove = (e: PointerEvent) => {
            const r = cta.getBoundingClientRect();
            gsap.to(cta, {
              x: (e.clientX - (r.left + r.width / 2)) * 0.3,
              y: (e.clientY - (r.top + r.height / 2)) * 0.4,
              duration: 0.4,
              ease: "power3.out",
            });
          };
          const onLeave = () =>
            gsap.to(cta, {
              x: 0,
              y: 0,
              duration: 0.9,
              ease: "elastic.out(1, 0.5)",
            });

          cta.addEventListener("pointermove", onMove);
          cta.addEventListener("pointerleave", onLeave);
          return () => {
            cta.removeEventListener("pointermove", onMove);
            cta.removeEventListener("pointerleave", onLeave);
          };
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
          data-hero-img
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

        {/* Dark veil that lifts on load (only with motion enabled) */}

        <div
          data-hero-veil
          className="absolute inset-0 bg-[#0e0a06] opacity-0 motion-safe:opacity-60"
        />
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
              ref={ctaRef}
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

        {/* Card, glow behind it, and the scroll indicator */}

        <div className="absolute bottom-2.5 right-3 w-[280px] origin-bottom-right scale-[0.46] min-[480px]:scale-[0.6] sm:bottom-6 sm:right-6 sm:w-[300px] sm:scale-[0.75] lg:bottom-11 lg:right-11 lg:w-auto lg:scale-100">
          <div
            data-glow
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] bg-se-lime/40 opacity-0 blur-3xl"
          />

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
