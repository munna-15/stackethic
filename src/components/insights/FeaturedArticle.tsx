"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles, readTime } from "@/data/insightsContent";
import Photo from "@/components/ui/Photo";

export default function FeaturedArticle() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const a = articles[0];

  return (
    <section ref={ref} className="bg-white text-[#1c220a]">
      <div className="page-container pt-16 lg:pt-24">
        <Link
          href={`/insights/${a.slug}`}
          data-card
          className="group grid overflow-hidden rounded-[28px] bg-se-olive text-white lg:grid-cols-[1.15fr_1fr]"
        >
          <div className="relative min-h-[280px] lg:min-h-[480px]">
            <Photo
              src={a.cover}
              alt={a.title}
              gradient={a.gradient}
              sizes="(min-width:1024px) 55vw, 100vw"
              quality={75}
              priority
              className="transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
            />
            <span className="se-glass absolute left-4 top-4 rounded-full border border-white/20 px-3.5 py-1.5 text-xs">
              Latest
            </span>
          </div>

          <div className="flex flex-col justify-between gap-10 p-7 sm:p-10">
            <div>
              <p data-item className="text-sm text-se-lime">
                {a.category} · {readTime(a)} min read
              </p>
              <h2
                data-item
                className="mt-4 text-[clamp(28px,3vw,46px)] leading-[1.05]"
              >
                {a.title}
              </h2>
              <p
                data-item
                className="mt-4 text-[15px] text-[#c8d0b8] sm:text-base"
              >
                {a.excerpt}
              </p>
            </div>
            <span
              data-item
              className="inline-flex items-center gap-2 text-sm font-medium text-se-lime"
            >
              Read article
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
