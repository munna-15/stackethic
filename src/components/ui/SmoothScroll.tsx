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

    if (reduced.matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: {
        offset: window.innerWidth <= 768 ? -76 : -100,
      },
    });

    lenisRef.current = lenis;
    window.__stackEthicLenis = lenis;

    lenis.on("scroll", ({ scroll, limit }) => {
      ScrollTrigger.update();

      window.dispatchEvent(
        new CustomEvent("stackethic:scroll", {
          detail: { scroll, limit },
        }),
      );
    });

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
      lenis.scrollTo(0, {
        immediate: true,
        force: true,
      });
    }

    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
