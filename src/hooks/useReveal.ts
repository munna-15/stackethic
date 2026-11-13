"use client";
import { useEffect, useRef } from "react";

/**
 * Attach the returned ref to a section. When .rv, .sv or [data-split]
 * elements inside it scroll into view, the `in` class is added
 * and the CSS in globals.css plays the animation.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 },
    );
    root
      .querySelectorAll(".rv,.sv,[data-split]")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}
