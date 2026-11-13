"use client";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { featured as f } from "@/data/workContent";
import SplitHeading from "@/components/ui/SplitHeading";
import ProjectThumb from "./ProjectThumb";

export default function FeaturedProject() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // Subtle parallax on the browser frame while scrolling past
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-parallax]",
          { y: 36 },
          {
            y: -36,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
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

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-se-olive text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 size-[480px] rounded-full bg-se-lime/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 size-[520px] rounded-full bg-[#9bb35a]/15 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_50%_at_20%_10%,#000,transparent)]" />
        <div className="absolute -right-56 -top-56 hidden size-[600px] rounded-full border border-white/10 lg:block" />
      </div>

      <div className="page-container relative pb-24 pt-20 lg:pb-32 lg:pt-28">
        <div className="mb-14 flex flex-col gap-5 lg:mb-20">
          <span
            data-fade
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-se-lime"
          >
            <span className="size-1.5 rounded-full bg-se-lime" />
            Spotlight
          </span>
          <SplitHeading
            text="Featured project"
            className="text-[clamp(34px,4.6vw,68px)]"
          />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Details */}
          <div>
            <p
              data-fade
              className="flex items-center gap-3 text-sm text-white/70"
            >
              <span className="text-[clamp(40px,4vw,60px)] font-medium leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(221,244,106,0.5)]">
                {f.no}
              </span>
              {f.category}
            </p>
            <h3
              data-fade
              className="mt-5 text-[clamp(34px,4vw,60px)] leading-[1.02]"
            >
              {f.title}
            </h3>
            <p
              data-fade
              className="mt-4 max-w-[30rem] text-[15px] text-[#c8d0b8] sm:text-base"
            >
              {f.description}
            </p>

            <ul
              data-fade
              className="mt-6 grid gap-2.5 text-sm text-white/85 sm:grid-cols-2"
            >
              {f.focus.map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check
                    size={14}
                    aria-hidden
                    className="shrink-0 text-se-lime"
                  />
                  {x}
                </li>
              ))}
            </ul>

            <div data-fade className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/work/${f.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-se-lime px-6 py-3.5 text-sm font-medium text-se-olive transition-colors duration-300 hover:bg-white"
              >
                View case study
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm text-white transition-colors duration-300 hover:bg-white/10"
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

          {/* Browser frame */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[44px] bg-se-lime/10 blur-3xl"
            />
            <div data-parallax className="relative">
              <Link
                href={`/work/${f.slug}`}
                aria-label={`View ${f.title} case study`}
                className="block"
              >
                <ProjectThumb
                  src={f.image}
                  alt={`${f.title} website screenshot`}
                  gradient={f.gradient}
                  url={f.url}
                  sizes="(min-width:1024px) 60vw, 100vw"
                  priority
                />
              </Link>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span className="se-glass inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-white">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-se-lime/60" />
                    <span className="relative inline-flex size-2 rounded-full bg-se-lime" />
                  </span>
                  Live
                </span>
                <span className="truncate">
                  {f.url.replace(/^https?:\/\//, "")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
