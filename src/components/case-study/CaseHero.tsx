"use client";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Project } from "@/data/workContent";
import SplitHeading from "@/components/ui/SplitHeading";
import ProjectThumb from "@/components/work/ProjectThumb";

export default function CaseHero({ project: p }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // Gentle parallax on the browser frame
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-parallax]",
          { y: 28 },
          {
            y: -28,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const host = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-se-olive text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -right-40 -top-40 size-[640px] rounded-full opacity-30 blur-3xl ${p.gradient}`}
        />
        <div className="absolute -left-32 bottom-0 size-[460px] rounded-full bg-se-lime/10 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_50%_at_80%_15%,#000,transparent)]" />
        <div className="absolute -right-56 -top-56 hidden size-[600px] rounded-full border border-white/10 lg:block" />
      </div>

      <div className="page-container relative pb-20 pt-32 sm:pt-40 lg:pb-28">
        <Link
          href="/work"
          data-fade
          className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-se-lime"
        >
          <ArrowLeft size={16} aria-hidden /> All work
        </Link>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div
              data-fade
              className="flex flex-wrap items-center gap-3 text-sm"
            >
              <span className="rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-se-lime">
                {p.category}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  p.kind === "software"
                    ? "bg-se-lime text-se-olive"
                    : "border border-white/20 text-white/80"
                }`}
              >
                {p.kind === "software" ? "Software platform" : "Website"}
              </span>
            </div>
            <SplitHeading
              as="h1"
              text={p.title}
              className="mt-6 max-w-[10em] text-[clamp(2.75rem,8vw,7rem)]"
            />
          </div>

          <div data-fade className="flex flex-wrap gap-3 lg:pb-3">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-se-lime px-6 py-3.5 text-sm font-medium text-se-olive transition-colors duration-300 hover:bg-white"
            >
              Visit live site
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className="relative mt-14 lg:mt-20">
          <div
            aria-hidden
            className="absolute -inset-6 mx-auto max-w-[1100px] rounded-[44px] bg-se-lime/10 blur-3xl"
          />
          <div data-parallax className="relative mx-auto max-w-[1100px]">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${p.title} live site`}
              className="block"
            >
              <ProjectThumb
                src={p.image}
                alt={`${p.title} website screenshot`}
                gradient={p.gradient}
                url={p.url}
                sizes="(min-width:1100px) 1100px, 100vw"
                priority
              />
            </a>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="se-glass inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-white">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-se-lime/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-se-lime" />
                </span>
                Live
              </span>
              <span className="truncate">{host}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
