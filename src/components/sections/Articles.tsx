"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles } from "@/data/insightsContent";
import SplitHeading from "@/components/ui/SplitHeading";
import Photo from "@/components/ui/Photo";

export default function ArticlesSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  const featuredArticles = articles.slice(0, 3);

  return (
    <section ref={ref} className="bg-white text-[#1c220a]">
      <div className="page-container pb-20 pt-24">
        <div className="mb-9 flex items-baseline justify-between gap-5">
          <SplitHeading
            text="Our latest Articles"
            muted={[1]}
            className="text-[clamp(28px,3.4vw,48px)]"
          />

          <Link
            data-fade
            href="/insights"
            className="text-sm underline underline-offset-4"
          >
            Show All
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              data-card
              className="group relative flex h-[320px] items-end overflow-hidden rounded-2xl p-6 text-white"
            >
              <Photo
                src={article.cover}
                gradient={article.gradient}
                alt={article.title}
                className="transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
              />

              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(20,24,10,0.85)_100%)]"
              />

              <span
                data-item
                className="relative max-w-[14em] text-xl leading-[1.2] tracking-[-0.02em]"
              >
                {article.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
