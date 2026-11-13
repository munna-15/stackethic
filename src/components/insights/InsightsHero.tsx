"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles, insightsHero as c } from "@/data/insightsContent";
import SplitHeading from "@/components/ui/SplitHeading";
import Photo from "@/components/ui/Photo";

export default function InsightsHero() {
  const ref = useRef<HTMLElement>(null);

  useScrollReveal(ref);

  const hasImage = Boolean(c.image);

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

        // Background image parallax
        if (root.querySelector("[data-bg]")) {
          gsap.to("[data-bg]", {
            yPercent: 14,
            ease: "none",
            scrollTrigger: st,
          });
        }

        // Layered decorative parallax
        gsap.to("[data-ring-a]", {
          y: -160,
          ease: "none",
          scrollTrigger: st,
        });

        gsap.to("[data-ring-b]", {
          y: -80,
          ease: "none",
          scrollTrigger: st,
        });

        // Content parallax
        gsap.to("[data-content]", {
          y: -70,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: st,
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden bg-se-olive text-white ${
        hasImage
          ? "flex min-h-[560px] flex-col sm:min-h-[640px] lg:min-h-[100svh]"
          : ""
      }`}
    >
      {/* Background Image */}
      {hasImage && (
        <>
          <div
            data-bg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-[10%] h-[125%]"
          >
            <Photo
              src={c.image}
              alt={c.imageAlt}
              sizes="100vw"
              quality={90}
              priority
              gradient="bg-[linear-gradient(150deg,#3b4a1c,#1d2a10)]"
            />
          </div>

          {/* Image Overlays */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,24,6,0.78)_0%,rgba(18,24,6,0.4)_45%,rgba(18,24,6,0.1)_100%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,24,6,0.7)_0%,rgba(18,24,6,0)_55%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,6,0.5)_0%,rgba(18,24,6,0)_22%)]" />
          </div>
        </>
      )}

      {/* Decorative Layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          data-glow
          className="absolute -right-32 -top-20 size-[520px] rounded-full bg-se-lime/15 blur-3xl"
        />

        {!hasImage && (
          <div className="absolute -left-40 bottom-0 size-[440px] rounded-full bg-[#9bb35a]/15 blur-3xl" />
        )}

        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_50%_at_80%_20%,#000,transparent)]" />

        <div
          data-ring-a
          className="absolute -right-56 -top-56 hidden size-[600px] rounded-full border border-white/10 lg:block"
        />

        <div
          data-ring-b
          className="absolute -right-20 top-40 hidden size-[300px] rounded-full border border-se-lime/20 lg:block"
        />
      </div>

      {/* Hero Content */}
      <div
        data-content
        className={`page-container relative z-10 ${
          hasImage
            ? "flex flex-1 flex-col justify-end pb-10 pt-32 lg:pb-14"
            : "pb-20 pt-36 sm:pt-44 lg:pb-28"
        }`}
      >
        <div className="flex flex-wrap items-center gap-3" data-fade>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/10 px-4 py-1.5 text-sm text-se-lime backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-se-lime/60" />

              <span className="relative inline-flex size-2 rounded-full bg-se-lime" />
            </span>

            {c.eyebrow}
          </span>

          <span className="text-sm text-white/60">
            {articles.length} articles
          </span>
        </div>

        <SplitHeading
          as="h1"
          text={c.title}
          muted={[3, 4]}
          className="mt-6 max-w-[11em] text-[clamp(2.6rem,6.4vw,5.75rem)]"
        />

        <p
          data-fade
          className="mt-5 max-w-[30rem] text-base text-white/70 sm:text-lg"
        >
          {c.text}
        </p>
      </div>
    </section>
  );
}
