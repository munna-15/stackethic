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

    const context = gsap.context(() => {});
    const animatedElements = new Set<Element>();
    const revealTasks = new Map<Element, () => void>();

    // Split headings
    const splitElements = root.querySelectorAll<HTMLElement>("[data-split]");

    splitElements.forEach((heading) => {
      const words = heading.querySelectorAll<HTMLElement>(".se-word");
      if (!words.length) return;

      animatedElements.add(heading);
      words.forEach((word) => animatedElements.add(word));

      gsap.set(words, {
        opacity: 0.25,
        y: 6,
      });

      revealTasks.set(heading, () => {
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.025,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    });

    // Cards
    const cardElements = root.querySelectorAll<HTMLElement>("[data-card]");

    cardElements.forEach((card, index) => {
      if (animatedElements.has(card)) return;

      animatedElements.add(card);

      const items = Array.from(
        card.querySelectorAll<HTMLElement>("[data-item]"),
      ).filter((item) => !animatedElements.has(item));

      items.forEach((item) => animatedElements.add(item));

      gsap.set(card, {
        y: 16,
        opacity: 0,
      });

      if (items.length) {
        gsap.set(items, {
          y: 6,
          opacity: 0,
        });
      }

      revealTasks.set(card, () => {
        // Simple tween instead of creating a timeline for every card
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.48,
          delay: index * 0.04,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (items.length) {
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.38,
            stagger: 0.035,
            delay: index * 0.04 + 0.08,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    });

    // Fade elements
    const fadeElements = root.querySelectorAll<HTMLElement>("[data-fade]");

    fadeElements.forEach((element) => {
      if (animatedElements.has(element)) return;

      animatedElements.add(element);

      gsap.set(element, {
        y: 6,
        opacity: 0,
      });

      revealTasks.set(element, () => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    });

    // Observe only reveal targets
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
        threshold: 0.01,
        rootMargin: "0px 0px -2% 0px",
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
