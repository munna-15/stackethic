"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;

    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {}, root);
    const animatedElements = new Set<Element>();
    const revealTasks = new Map<Element, () => void>();

    const splitElements = root.querySelectorAll<HTMLElement>("[data-split]");

    splitElements.forEach((heading) => {
      const words = heading.querySelectorAll<HTMLElement>(".se-word");

      if (!words.length) return;

      animatedElements.add(heading);
      words.forEach((word) => animatedElements.add(word));

      context.add(() => {
        gsap.set(words, {
          opacity: 0.15,
          y: 14,
        });
      });

      revealTasks.set(heading, () => {
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
        });
      });
    });

    const cardElements = root.querySelectorAll<HTMLElement>("[data-card]");

    cardElements.forEach((card, index) => {
      if (animatedElements.has(card)) return;

      animatedElements.add(card);

      const items = Array.from(
        card.querySelectorAll<HTMLElement>("[data-item]"),
      ).filter((item) => !animatedElements.has(item));

      items.forEach((item) => animatedElements.add(item));

      context.add(() => {
        gsap.set(card, {
          y: 40,
          opacity: 0,
        });

        if (items.length) {
          gsap.set(items, {
            y: 20,
            opacity: 0,
          });
        }
      });

      revealTasks.set(card, () => {
        const timeline = gsap.timeline();

        timeline.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: (index % 3) * 0.12,
        });

        if (items.length) {
          timeline.to(
            items,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: "power3.out",
            },
            "-=0.35",
          );
        }
      });
    });

    const fadeElements = root.querySelectorAll<HTMLElement>("[data-fade]");

    fadeElements.forEach((element) => {
      if (animatedElements.has(element)) return;

      animatedElements.add(element);

      context.add(() => {
        gsap.set(element, {
          y: 20,
          opacity: 0,
        });
      });

      revealTasks.set(element, () => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        });
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const reveal = revealTasks.get(entry.target);

          if (!reveal) return;

          context.add(reveal);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealTasks.forEach((_, element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, [scope]);
}
