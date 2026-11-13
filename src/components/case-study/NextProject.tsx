"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Project } from "@/data/workContent";
import ProjectThumb from "@/components/work/ProjectThumb";

export default function NextProject({
  prev,
  next,
}: {
  prev: Project;
  next: Project;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-se-olive text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 size-[520px] rounded-full bg-se-lime/10 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_50%_at_20%_90%,#000,transparent)]" />
      </div>

      <div className="page-container relative py-24 lg:py-32">
        <p data-fade className="text-sm text-se-lime">
          Next project
        </p>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Link href={`/work/${next.slug}`} data-fade className="group block">
            <p className="text-sm text-white/60">
              <span className="tabular-nums">{next.no}</span> · {next.category}
            </p>
            <h2 className="mt-4 text-[clamp(40px,6vw,96px)] leading-[0.98] tracking-[-0.04em] transition-colors duration-500 group-hover:text-se-lime">
              {next.title}
            </h2>
            <span className="mt-8 inline-grid size-14 place-items-center rounded-full bg-se-lime text-se-olive transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={22} aria-hidden />
            </span>
          </Link>

          <Link
            href={`/work/${next.slug}`}
            data-fade
            aria-label={`View ${next.title} case study`}
            className="block transition-transform duration-700 ease-se hover:-translate-y-2"
          >
            <ProjectThumb
              src={next.image}
              alt={`${next.title} website screenshot`}
              gradient={next.gradient}
              url={next.url}
              sizes="(min-width:1024px) 45vw, 100vw"
            />
          </Link>
        </div>

        <div
          data-fade
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm"
        >
          <Link
            href={`/work/${prev.slug}`}
            className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-se-lime"
          >
            <ArrowLeft size={16} aria-hidden /> {prev.title}
          </Link>
          <Link
            href="/work"
            className="text-white/70 transition-colors hover:text-se-lime"
          >
            All work
          </Link>
        </div>
      </div>
    </section>
  );
}
