"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __stackEthicLenis?: Lenis;
  }
}

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(pointer: coarse)");
    if (reduced.matches || touch.matches) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      smoothWheel: true,
      anchors: {
        offset: window.innerWidth <= 768 ? -76 : -100,
      },
    });

    lenisRef.current = lenis;
    window.__stackEthicLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__stackEthicLenis;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    if (lenis && !window.location.hash) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }

    // Layout shesh hole refresh (prothome rAF, tarpor image load-er por abar)
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    const id = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(id);
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
    };
  }, [pathname]);

  return null;
}
