"use client";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ArrowLeft } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { readTime, type Article } from "@/data/insightsContent";
import SplitHeading from "@/components/ui/SplitHeading";
import Photo from "@/components/ui/Photo";

export default function ArticleHero({ article: a }: { article: Article }) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // With a heroImage: full-width photo behind the title.
  // Without it: the wide cover picture sits under the title instead.
  const hasHero = Boolean(a.heroImage);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        if (root.querySelector("[data-bg]"))
          gsap.to("[data-bg]", {
            yPercent: 14,
            ease: "none",
            scrollTrigger: st,
          });
        if (root.querySelector("[data-cover]"))
          gsap.fromTo(
            "[data-cover]",
            { yPercent: -6 },
            { yPercent: 6, ease: "none", scrollTrigger: st },
          );
        gsap.to("[data-glow]", { y: -80, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden bg-se-olive text-white ${
        hasHero ? "flex min-h-[520px] flex-col lg:min-h-[78svh]" : ""
      }`}
    >
      {hasHero && (
        <>
          <div data-bg className="absolute inset-x-0 -top-[10%] h-[125%]">
            <Photo
              src={a.heroImage}
              alt={a.title}
              sizes="100vw"
              quality={90}
              priority
              gradient={a.gradient}
            />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,24,6,0.85)_0%,rgba(18,24,6,0.35)_55%,rgba(18,24,6,0.2)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,6,0.55)_0%,rgba(18,24,6,0)_25%)]" />
          </div>
        </>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          data-glow
          className="absolute -right-32 -top-20 size-[480px] rounded-full bg-se-lime/15 blur-3xl"
        />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_40%_at_80%_15%,#000,transparent)]" />
      </div>

      <div
        className={`page-container relative z-10 ${
          hasHero
            ? "flex flex-1 flex-col justify-end pb-12 pt-32 lg:pb-16"
            : "pt-32 sm:pt-40"
        }`}
      >
        <Link
          href="/insights"
          data-fade
          className="inline-flex w-fit items-center gap-2 text-sm text-white/70 transition-colors hover:text-se-lime"
        >
          <ArrowLeft size={16} aria-hidden /> All insights
        </Link>

        <div
          data-fade
          className="mt-8 flex flex-wrap items-center gap-3 text-sm"
        >
          <span className="rounded-full border border-white/25 bg-black/10 px-4 py-1.5 text-se-lime backdrop-blur-sm">
            {a.category}
          </span>
          <span className="text-white/70">
            {a.date ? `${a.date} · ` : ""}
            {readTime(a)} min read
          </span>
        </div>

        <SplitHeading
          as="h1"
          text={a.title}
          className="mt-6 max-w-[14em] text-[clamp(2.4rem,5.6vw,5rem)]"
        />
        <p
          data-fade
          className="mt-5 max-w-[34rem] text-base text-white/75 sm:text-lg"
        >
          {a.excerpt}
        </p>
      </div>

      {/* No heroImage: wide cover picture under the title, lower half sits on the white article section */}
      {!hasHero && (
        <>
          <div className="page-container relative mt-14 lg:mt-20">
            <div className="relative aspect-[16/8] overflow-hidden rounded-t-[28px] border border-b-0 border-white/10">
              <div data-cover className="absolute inset-x-0 -inset-y-[8%]">
                <Photo
                  src={a.cover}
                  alt={a.title}
                  gradient={a.gradient}
                  sizes="(min-width:1440px) 1280px, 100vw"
                  quality={90}
                  priority
                />
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[1px] bg-white"
          />
        </>
      )}
    </section>
  );
}
