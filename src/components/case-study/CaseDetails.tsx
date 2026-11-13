"use client";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Project } from "@/data/workContent";
import ProjectThumb from "@/components/work/ProjectThumb";

/** Challenge, solution and extra screenshots. Renders nothing until `details` is filled in. */
export default function CaseDetails({ project: p }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  const d = p.details;
  const hasText = Boolean(d?.challenge || d?.solution);
  const hasGallery = Boolean(d?.gallery?.length);
  if (!d || (!hasText && !hasGallery)) return null;

  return (
    <section ref={ref} className="bg-[#f4f6ea] text-[#1c220a]">
      <div className="page-container py-24">
        {hasText && (
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            {d.challenge && (
              <div data-fade>
                <p className="text-sm uppercase tracking-[0.14em] text-[#8e967e]">
                  The challenge
                </p>
                <p className="mt-4 text-[clamp(18px,1.8vw,24px)] leading-[1.4]">
                  {d.challenge}
                </p>
              </div>
            )}
            {d.solution && (
              <div data-fade>
                <p className="text-sm uppercase tracking-[0.14em] text-[#8e967e]">
                  Our approach
                </p>
                <p className="mt-4 text-[clamp(18px,1.8vw,24px)] leading-[1.4]">
                  {d.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {hasGallery && (
          <div
            className={`grid gap-8 md:grid-cols-2 ${hasText ? "mt-16" : ""}`}
          >
            {d.gallery!.map((src, i) => (
              <div key={src} data-fade>
                <ProjectThumb
                  src={src}
                  alt={`${p.title} screenshot ${i + 1}`}
                  gradient={p.gradient}
                  url={p.url}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
