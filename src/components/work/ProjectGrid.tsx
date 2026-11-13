"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { filters, gridProjects } from "@/data/workContent";
import SplitHeading from "@/components/ui/SplitHeading";
import ProjectThumb from "./ProjectThumb";

// Only show filter buttons that have at least one project
const available = filters.filter(
  (f) => f === "All" || gridProjects.some((p) => p.group === f),
);

export default function ProjectGrid() {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  useScrollReveal(ref);

  const visible =
    filter === "All"
      ? gridProjects
      : gridProjects.filter((p) => p.group === filter);

  // Cards rise in on scroll, and again every time the filter changes
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-project]"),
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
    <section ref={ref} id="projects" className="bg-white text-[#1c220a]">
      <div className="page-container pb-28 pt-20 lg:pt-28">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span
              data-fade
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d1d5db] px-4 py-1.5 text-sm text-[#5c6152]"
            >
              <span className="size-1.5 rounded-full bg-se-olive" />
              {gridProjects.length} more projects
            </span>
            <SplitHeading
              text="More selected work"
              className="mt-5 text-[clamp(32px,4vw,60px)]"
            />
          </div>

          <div
            data-fade
            role="group"
            aria-label="Filter projects"
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
                    : "border-[#d1d5db] text-[#1c220a] hover:bg-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {visible.map((p) => (
            <article key={p.slug} data-project className="group md:even:mt-20">
              <Link
                href={`/work/${p.slug}`}
                aria-label={`View ${p.title} case study`}
                className="block transition-transform duration-700 ease-se group-hover:-translate-y-2"
              >
                <ProjectThumb
                  src={p.image}
                  alt={`${p.title} website screenshot`}
                  gradient={p.gradient}
                  url={p.url}
                />
              </Link>

              <div className="mt-7 flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-3 text-sm text-[#5c6152]">
                    <span className="tabular-nums text-[#8e967e]">{p.no}</span>
                    {p.category}
                  </p>
                  <h3 className="mt-2 text-[clamp(26px,2.6vw,38px)] leading-[1.05]">
                    {p.title}
                  </h3>
                </div>
                <span
                  className={`mt-1 shrink-0 rounded-full px-3 py-1 text-xs ${
                    p.kind === "software"
                      ? "bg-se-olive text-se-lime"
                      : "border border-[#d1d5db] text-[#5c6152]"
                  }`}
                >
                  {p.kind === "software" ? "Software platform" : "Website"}
                </span>
              </div>

              <p className="mt-3 max-w-[32rem] text-[15px] text-[#5c6152]">
                {p.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {p.focus.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-[#e5e7eb] px-3 py-1 text-xs text-[#5c6152]"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/work/${p.slug}`}
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-[#232a0e] px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-olive-light"
                >
                  View case study
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 rounded-full border border-[#d1d5db] px-5 py-3 text-sm text-[#1c220a] transition-colors duration-300 hover:bg-black/5"
                >
                  Live site
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
