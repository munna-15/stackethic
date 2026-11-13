"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { testimonials } from "@/data/landingContent";
import Photo from "@/components/ui/Photo";

export default function TestimonialSection() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const [i, setI] = useState(0);
  const t = testimonials[i];
  useScrollReveal(ref);

  // Cross-fade the text when the slide changes (skipped on first render and for reduced motion)
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
    },
    { dependencies: [i], scope: ref },
  );

  const go = (n: number) =>
    setI((p) => (p + n + testimonials.length) % testimonials.length);

  return (
    <section
      ref={ref}
      className="relative min-h-[640px] overflow-hidden bg-[#1d2a10] text-white lg:h-[780px]"
    >
      <Photo
        src={t.image}
        sizes="100vw"
        quality={90}
        gradient="bg-[radial-gradient(50%_70%_at_70%_30%,#6c8a3a,transparent_70%),linear-gradient(150deg,#1d2a10,#3b4a1c)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,30,10,0)_40%,rgba(25,30,10,0.75)_100%)]"
      />

      <div className="page-container absolute inset-x-0 bottom-14 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div ref={textRef} className="max-w-[820px]">
          <p data-fade className="text-sm font-medium text-se-lime">
            {t.author}
          </p>
          <blockquote
            data-fade
            className="mt-4 text-[clamp(24px,2.6vw,36px)] leading-[1.25] tracking-[-0.02em]"
          >
            {t.quote}
          </blockquote>
        </div>
        
      </div>
    </section>
  );
}
