import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { readTime, type Article } from "@/data/insightsContent";
import Photo from "@/components/ui/Photo";

/** Reusable article card used on the Insights page and under articles */
export default function ArticleCard({ article: a }: { article: Article }) {
  return (
    <Link href={`/insights/${a.slug}`} className="group block">
      <div
        data-img
        className="relative aspect-[16/10] overflow-hidden rounded-[20px]"
      >
        <Photo
          src={a.cover}
          alt={a.title}
          gradient={a.gradient}
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          quality={75}
          className="transition-transform duration-700 ease-se group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,24,6,0.35)_0%,transparent_55%)]"
        />
        <span className="se-glass absolute left-4 top-4 rounded-full border border-white/20 px-3 py-1 text-xs text-white">
          {a.category}
        </span>
      </div>

      <div className="mt-5">
        <p data-item className="text-xs text-[#8e967e]">
          {a.date ? `${a.date} · ` : ""}
          {readTime(a)} min read
        </p>
        <h3
          data-item
          className="mt-2 text-[clamp(21px,1.8vw,26px)] leading-[1.15] transition-colors duration-300 group-hover:text-se-olive/70"
        >
          {a.title}
        </h3>
        <p data-item className="mt-2 line-clamp-2 text-[15px] text-[#5c6152]">
          {a.excerpt}
        </p>
        <span
          data-item
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
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
  );
}
