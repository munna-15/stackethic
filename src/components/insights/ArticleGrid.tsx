"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles, categories } from "@/data/insightsContent";
import SplitHeading from "@/components/ui/SplitHeading";
import ArticleCard from "./ArticleCard";

// SSR-e warning na dite
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// The first article is shown as "Latest" above, so the grid lists the rest
const rest = articles.slice(1);
const available = categories.filter(
  (c) => c === "All" || rest.some((a) => a.category === c),
);

export default function ArticleGrid() {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  useScrollReveal(ref);

  const visible =
    filter === "All" ? rest : rest.filter((a) => a.category === filter);

  // Cards rise in when near the viewport, and again when the filter changes
  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-article]"),
    );
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 24 });

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((e) => e.isIntersecting);
        entering.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.06,
            ease: "power2.out",
            clearProps: "transform,opacity",
          });
        });
      },
      // 200px age-i start, tai image load-er layout shift-e bhul hoy na
      { rootMargin: "0px 0px 200px 0px", threshold: 0 },
    );

    cards.forEach((c) => io.observe(c));

    return () => {
      io.disconnect();
      gsap.killTweensOf(cards);
      gsap.set(cards, { clearProps: "transform,opacity" });
    };
  }, [filter]);

  return (
    <section ref={ref} className="bg-white text-[#1c220a]">
      <div className="page-container pb-28 pt-20 lg:pt-28">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SplitHeading
            text="More articles"
            className="text-[clamp(30px,3.8vw,56px)]"
          />

          <div
            data-fade
            role="group"
            aria-label="Filter articles"
            className="flex flex-wrap gap-2"
          >
            {available.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={filter === cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  filter === cat
                    ? "border-se-olive bg-se-olive text-se-lime"
                    : "border-[#d1d5db] hover:bg-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <div key={a.slug} data-article>
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
