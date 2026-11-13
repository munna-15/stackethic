"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const animatedElements = new Set<Element>();

      const splitElements = root.querySelectorAll<HTMLElement>("[data-split]");

      splitElements.forEach((heading) => {
        const words = heading.querySelectorAll<HTMLElement>(".se-word");

        if (!words.length) return;

        animatedElements.add(heading);
        words.forEach((word) => animatedElements.add(word));

        gsap.fromTo(
          words,
          { opacity: 0.15, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      const cardElements = root.querySelectorAll<HTMLElement>("[data-card]");

      cardElements.forEach((card, index) => {
        if (animatedElements.has(card)) return;

        animatedElements.add(card);

        const items = Array.from(
          card.querySelectorAll<HTMLElement>("[data-item]"),
        ).filter((item) => !animatedElements.has(item));

        items.forEach((item) => animatedElements.add(item));

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });

        timeline.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: (index % 3) * 0.12,
          },
        );

        if (items.length) {
          timeline.fromTo(
            items,
            { y: 20, opacity: 0 },
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

      const fadeElements = root.querySelectorAll<HTMLElement>("[data-fade]");

      fadeElements.forEach((element) => {
        if (animatedElements.has(element)) return;

        animatedElements.add(element);

        gsap.fromTo(
          element,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    },
    {
      scope,
      dependencies: [],
    },
  );
}
