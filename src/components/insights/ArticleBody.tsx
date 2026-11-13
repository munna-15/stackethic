"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { slugify, type Article } from "@/data/insightsContent";

export default function ArticleBody({ article: a }: { article: Article }) {
  const ref = useRef<HTMLElement>(null);
  const headings = a.body.filter(
    (b): b is { type: "h2"; text: string } => b.type === "h2",
  );

  // Thin reading-progress bar at the top of the screen
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-progress]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              end: "bottom 60%",
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
    <section ref={ref} className="bg-white text-[#1c220a]">
      <div
        aria-hidden
        data-progress
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-se-lime"
      />

      <div className="page-container grid gap-12 pb-24 pt-14 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-20 lg:pt-20">
        {/* Table of contents (desktop) */}
        <aside className="hidden lg:block">
          {headings.length > 0 && (
            <nav aria-label="On this page" className="sticky top-28">
              <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#8e967e]">
                On this page
              </p>
              <ul className="space-y-3 border-l border-[#e0e4d0]">
                {headings.map((h) => (
                  <li key={h.text}>
                    <a
                      href={`#${slugify(h.text)}`}
                      className="-ml-px block border-l border-transparent pl-4 text-sm text-[#5c6152] transition-colors duration-300 hover:border-se-olive hover:text-se-olive"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>

        {/* Article text */}
        <article>
          {a.body.map((b, i) => {
            if (b.type === "h2")
              return (
                <h2
                  key={i}
                  id={slugify(b.text)}
                  className="mt-14 scroll-mt-28 text-[clamp(26px,2.6vw,36px)] leading-[1.1] first:mt-0"
                >
                  {b.text}
                </h2>
              );
            if (b.type === "ul")
              return (
                <ul
                  key={i}
                  className="mt-5 space-y-3 text-[17px] leading-[1.65] text-[#3b4330]"
                >
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-se-olive"
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              );
            if (b.type === "quote")
              return (
                <blockquote
                  key={i}
                  className="my-12 border-l-[3px] border-se-lime pl-6 text-[clamp(22px,2.4vw,32px)] leading-[1.25] tracking-[-0.02em]"
                >
                  {b.text}
                </blockquote>
              );
            return (
              <p
                key={i}
                className="mt-5 text-[17px] leading-[1.75] text-[#3b4330] first:mt-0"
              >
                {b.text}
              </p>
            );
          })}
        </article>
      </div>
    </section>
  );
}
