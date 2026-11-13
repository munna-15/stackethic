"use client";
import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Article } from "@/data/insightsContent";
import SplitHeading from "@/components/ui/SplitHeading";
import ArticleCard from "./ArticleCard";

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  if (articles.length === 0) return null;

  return (
    <section ref={ref} className="bg-[#f4f6ea] text-[#1c220a]">
      <div className="page-container py-24 lg:py-32">
        <div className="mb-12 flex items-end justify-between gap-5">
          <SplitHeading
            text="Keep reading"
            className="text-[clamp(30px,3.8vw,56px)]"
          />
          <Link
            data-fade
            href="/insights"
            className="text-sm underline underline-offset-4"
          >
            All insights
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <div key={a.slug} data-fade>
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
