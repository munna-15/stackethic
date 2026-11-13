"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { workHero as c } from "@/data/workContent";
import SplitHeading from "@/components/ui/SplitHeading";
import Photo from "@/components/ui/Photo";

export default function WorkHero() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // Layered parallax on scroll + bouncing scroll hint (skipped for reduced motion)
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
        gsap.to("[data-bg]", { yPercent: 14, ease: "none", scrollTrigger: st });
        gsap.to("[data-glow]", { y: -90, ease: "none", scrollTrigger: st });
        gsap.to("[data-ring-a]", { y: -160, ease: "none", scrollTrigger: st });
        gsap.to("[data-content]", {
          y: -70,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: st,
        });
        gsap.to("[data-hint]", {
          y: 6,
          duration: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[560px] flex-col overflow-hidden bg-se-olive text-white sm:min-h-[640px] lg:min-h-[100svh]"
    >
      {/* Photo is taller than the section so it can move without showing edges */}
      <div
        data-bg
        className="absolute inset-x-0 -top-[10%] h-[125%]"
        aria-hidden={!c.image}
      >
        <Photo
          src={c.image}
          alt={c.imageAlt}
          sizes="100vw"
          quality={90}
          priority
          gradient="bg-[radial-gradient(60%_60%_at_75%_30%,#8aa34a,transparent_70%),linear-gradient(150deg,#3b4a1c,#1d2a10)]"
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,24,6,0.78)_0%,rgba(18,24,6,0.4)_45%,rgba(18,24,6,0.1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,24,6,0.7)_0%,rgba(18,24,6,0)_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,6,0.5)_0%,rgba(18,24,6,0)_22%)]" />
        <div
          data-glow
          className="absolute inset-0 bg-[radial-gradient(40%_50%_at_90%_10%,rgba(221,244,106,0.18),transparent_70%)]"
        />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(60%_60%_at_85%_35%,#000,transparent)]" />
        <div
          data-ring-a
          className="absolute -right-52 -top-52 hidden size-[560px] rounded-full border border-white/10 lg:block"
        />
      </div>

      <div
        data-content
        className="page-container relative z-10 flex flex-1 flex-col justify-end pb-6 pt-28 sm:pb-10 lg:pb-14"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span
              data-fade
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/10 px-4 py-1.5 text-sm text-se-lime backdrop-blur-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-se-lime/60" />
                <span className="relative inline-flex size-2 rounded-full bg-se-lime" />
              </span>
              {c.eyebrow}
            </span>
            <SplitHeading
              as="h1"
              text={c.title}
              muted={[2]}
              className="mt-5 max-w-[8em] text-[clamp(2.75rem,7.4vw,6.75rem)]"
            />
            <p
              data-fade
              className="mt-4 max-w-[26rem] text-base text-white/75 sm:text-lg"
            >
              {c.text}
            </p>
            <a
              data-fade
              href="#projects"
              className="mt-7 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-se-lime"
            >
              <span
                data-hint
                className="grid size-9 place-items-center rounded-full border border-white/30"
              >
                <ArrowDown size={16} aria-hidden />
              </span>
              See the projects
            </a>
          </div>

          <div data-fade className="w-full lg:w-[min(380px,34vw)]">
            <div className="se-glass grid grid-cols-3 divide-x divide-white/15 rounded-2xl border border-white/15 py-3 sm:py-4">
              {c.stats.map((s) => (
                <div key={s.label} className="px-3 text-center">
                  <p className="text-[clamp(20px,2.4vw,32px)] font-medium leading-none tracking-[-0.03em] text-se-lime">
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-[10px] text-white/70 sm:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
