
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import Lenis from "lenis";

declare global {
  interface Window {
    __stackEthicLenis?: Lenis;
  }
}

const SIZE = 58;
const STROKE = 1.8;
const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollProgress() {
  const pathname = usePathname();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const raf = 0;

    const update = (scroll: number, limit: number) => {
      const progress =
        limit > 0
          ? Math.min(Math.max(scroll / limit, 0), 1)
          : 0;

      const percentage = Math.round(progress * 100);

      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(
          CIRCUMFERENCE * (1 - progress)
        );
      }

      if (percentRef.current) {
        percentRef.current.textContent = `${percentage}%`;
      }

      if (buttonRef.current) {
        const visible = scroll > 150;

        buttonRef.current.style.opacity = visible ? "1" : "0";
        buttonRef.current.style.visibility = visible
          ? "visible"
          : "hidden";
        buttonRef.current.style.transform = visible
          ? "translateY(0) scale(1)"
          : "translateY(12px) scale(.94)";
        buttonRef.current.style.pointerEvents = visible
          ? "auto"
          : "none";
      }
    };

    const updateFromNativeScroll = () => {
      const scroll = window.scrollY;
      const limit =
        document.documentElement.scrollHeight - window.innerHeight;

      update(scroll, limit);
    };

    const handleLenisScroll = (event: Event) => {
      const { scroll, limit } = (
        event as CustomEvent<{
          scroll: number;
          limit: number;
        }>
      ).detail;

      update(scroll, limit);
    };

    const handleResize = () => {
      updateFromNativeScroll();
    };

    updateFromNativeScroll();

    window.addEventListener(
      "stackethic:scroll",
      handleLenisScroll
    );

    window.addEventListener(
      "scroll",
      updateFromNativeScroll,
      { passive: true }
    );

    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement);

    return () => {
      window.removeEventListener(
        "stackethic:scroll",
        handleLenisScroll
      );

      window.removeEventListener(
        "scroll",
        updateFromNativeScroll
      );

      window.removeEventListener("resize", handleResize);

      observer.disconnect();

      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const scrollToTop = () => {
    const lenis = window.__stackEthicLenis;

    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "instant"
          : "smooth",
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      className="group fixed bottom-6 right-6 z-[100] grid size-[58px] place-items-center rounded-full border border-[#DDF46A]/20 bg-[#252B0B] text-[#DDF46A] shadow-[0_8px_35px_rgba(0,0,0,0.22)] transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:right-8"
      style={{
        opacity: 0,
        visibility: "hidden",
        transform: "translateY(12px) scale(.94)",
      }}
    >
      {/* Outer subtle border */}
      <span
        aria-hidden="true"
        className="absolute inset-[4px] rounded-full border border-white/[0.07]"
      />

      {/* Progress ring */}
      <svg
        className="absolute inset-0 size-full -rotate-90"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#DDF46A"
          strokeOpacity="0.13"
          strokeWidth={STROKE}
        />

        <circle
          ref={ringRef}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#DDF46A"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>

      {/* Center surface */}
      <span className="absolute inset-[9px] rounded-full bg-[#303914] transition-colors duration-300 group-hover:bg-[#DDF46A]" />

      {/* Arrow */}
      <ArrowUp
        size={19}
        strokeWidth={1.7}
        className="relative z-10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[#252B0B]"
      />

      {/* Percentage tooltip */}
      <span
        ref={percentRef}
        className="pointer-events-none absolute -left-[66px] top-1/2 -translate-y-1/2 rounded-full border border-[#DDF46A]/15 bg-[#252B0B] px-2.5 py-1 text-[10px] font-medium tracking-wider text-[#DDF46A] opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
      >
        0%
      </span>
    </button>
  );
}
