"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * StackEthic loading screen.
 * Shows on every full page load (opening the site, refreshing), not on page-to-page navigation.
 * It stays for at least MIN_MS, waits for the page to really finish loading (up to MAX_MS),
 * then lifts like a curtain. Page animations (hero, nav) are paused until the curtain lifts.
 */

const MIN_MS = 1800;
const MAX_MS = 6000;

type Phase = "loading" | "exit" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  /* While loading: pause GSAP so hero and nav animations wait behind the curtain.
     When the phase changes, the cleanup resumes them, so they play as the curtain lifts. */
  useEffect(() => {
    if (phase !== "loading") return;
    gsap.globalTimeline.pause();
    return () => {
      gsap.globalTimeline.resume();
    };
  }, [phase]);

  /* Lock page scroll until the loader is gone */
  useEffect(() => {
    if (phase === "done") return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [phase]);

  /* Progress: eases up to 90%, then jumps to 100% once the page has really loaded */
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const minMs = reduce ? 600 : MIN_MS;
    const start = performance.now();
    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    let raf = 0;
    let finishing = false;
    let finishStart = 0;
    let from = 0;

    const apply = (p: number) => {
      if (countRef.current)
        countRef.current.textContent = String(Math.round(p));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p / 100})`;
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      let p = 0;

      if (!finishing) {
        const t = Math.min(elapsed / minMs, 1);
        p = 90 * (1 - Math.pow(1 - t, 3));
        if ((loaded && elapsed >= minMs) || elapsed >= MAX_MS) {
          finishing = true;
          finishStart = now;
          from = p;
        }
      }

      if (finishing) {
        const k = Math.min((now - finishStart) / 450, 1);
        p = from + (100 - from) * k;
        apply(p);
        if (k >= 1) {
          setPhase("exit");
          return;
        }
      } else {
        apply(p);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  /* Remove the loader from the page after the curtain has lifted */
  useEffect(() => {
    if (phase !== "exit") return;
    const id = setTimeout(() => setPhase("done"), 1000);
    return () => clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;
  const exit = phase === "exit";

  return (
    <>
      {/* Without JavaScript the loader would never leave, so hide it */}
      <noscript>
        <style>{`#se-preloader{display:none !important}`}</style>
      </noscript>

      <style>{`
        @keyframes se-pre-left{from{opacity:0;transform:translateX(-46px)}to{opacity:1;transform:none}}
        @keyframes se-pre-right{from{opacity:0;transform:translateX(46px)}to{opacity:1;transform:none}}
        @keyframes se-pre-word{from{opacity:0;clip-path:inset(-10% 100% -10% 0);transform:translateX(-14px)}to{opacity:1;clip-path:inset(-10% 0 -10% 0);transform:none}}
        @keyframes se-pre-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        @keyframes se-pre-ring{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
        @keyframes se-pre-glow{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes se-pre-shine{to{background-position:-200% 0}}
        #se-preloader .pre-l{transform-box:fill-box;animation:se-pre-left .9s cubic-bezier(.22,1,.36,1) .1s both}
        #se-preloader .pre-r{transform-box:fill-box;animation:se-pre-right .9s cubic-bezier(.22,1,.36,1) .1s both}
        #se-preloader .pre-word{
          background:linear-gradient(90deg,#fff 0%,#fff 42%,#dcf55a 50%,#fff 58%,#fff 100%);
          background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
          animation:se-pre-word .9s cubic-bezier(.22,1,.36,1) .45s both, se-pre-shine 2.4s linear 1.4s infinite;
        }
        #se-preloader .pre-up{animation:se-pre-up .8s cubic-bezier(.22,1,.36,1) 1s both}
        #se-preloader .pre-ring{animation:se-pre-ring 1.2s cubic-bezier(.22,1,.36,1) .2s both}
        #se-preloader .pre-glow{animation:se-pre-glow 4s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){#se-preloader *{animation:none !important}}
      `}</style>

      <div
        id="se-preloader"
        role="status"
        aria-live="polite"
        aria-busy={!exit}
        className="fixed inset-0 z-[9990] overflow-hidden bg-[#0b1006] text-white"
        style={{
          clipPath: exit
            ? "inset(0% 0% 100% 0% round 0px 0px 40px 40px)"
            : "inset(0% 0% 0% 0% round 0px 0px 0px 0px)",
          transition: "clip-path 900ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <span className="sr-only">Loading StackEthic</span>

        {/* Decoration */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="pre-glow absolute -right-24 -top-24 size-[520px] rounded-full bg-se-lime/15 blur-3xl" />
          <div
            className="pre-glow absolute -bottom-32 -left-24 size-[520px] rounded-full bg-[#4f6b1c]/30 blur-3xl"
            style={{ animationDelay: "-2s" }}
          />
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_50%_at_50%_50%,#000,transparent)]" />
        </div>

        {/* Logo */}
        <div
          className="absolute inset-0 grid place-items-center"
          style={{
            opacity: exit ? 0 : 1,
            transform: exit ? "translateY(-30px) scale(0.96)" : "none",
            transition:
              "opacity 500ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Rings behind the logo */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="pre-ring size-[min(78vw,420px)] rounded-full border border-white/[0.07]" />
              <div className="pre-ring absolute inset-[16%] rounded-full border border-se-lime/20" />
            </div>

            <div className="relative flex items-center gap-3 sm:gap-4">
              <svg
                viewBox="0 0 24 16"
                aria-hidden="true"
                className="h-[34px] w-[51px] text-se-lime sm:h-14 sm:w-[84px]"
                fill="currentColor"
              >
                <path className="pre-l" d="M8 1.2 1 8l7 6.8z" />
                <path className="pre-r" d="M23 1.2h-5.5L9.5 8l8 6.8H23L15 8z" />
              </svg>
              <span className="pre-word font-se-display text-[clamp(38px,9vw,84px)] font-semibold leading-none tracking-[-0.04em]">
                StackEthic
              </span>
            </div>

            <p className="pre-up relative mt-5 text-[11px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
              Digital engineering studio
            </p>
          </div>
        </div>

        {/* Bottom: label, counter and progress line */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ opacity: exit ? 0 : 1, transition: "opacity 400ms ease" }}
        >
          <div className="flex items-end justify-between px-5 pb-6 sm:px-8 sm:pb-8">
            <p className="pre-up text-[11px] uppercase tracking-[0.2em] text-white/40 sm:text-xs">
              Loading
            </p>
            <p
              className="pre-up flex items-baseline gap-1 tabular-nums"
              aria-hidden
            >
              <span
                ref={countRef}
                className="text-[clamp(48px,9vw,120px)] font-medium leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(221,244,106,0.7)]"
              >
                0
              </span>
              <span className="text-lg text-se-lime/70 sm:text-2xl">%</span>
            </p>
          </div>
          <div className="h-[3px] w-full bg-white/10">
            <span
              ref={barRef}
              className="block h-full origin-left bg-se-lime shadow-[0_0_14px_rgba(221,244,106,0.7)]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
