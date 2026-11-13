"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles, categories } from "@/data/insightsContent";
import SplitHeading from "@/components/ui/SplitHeading";
import ArticleCard from "./ArticleCard";

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

  // Cards rise in on scroll, and again every time the filter changes
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-article]"),
        );
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [filter], revertOnUpdate: true },
  );

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
