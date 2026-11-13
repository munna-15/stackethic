"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { contactDetails, contactHero as c } from "@/data/contactContent";
import SplitHeading from "@/components/ui/SplitHeading";
import ContactForm from "./ContactForm";

const icons = [Mail, Phone, MapPin];

export default function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // Soft parallax on the decorative layers (skipped for reduced motion)
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
        gsap.to("[data-glow]", { y: -90, ease: "none", scrollTrigger: st });
        gsap.to("[data-ring-a]", { y: -140, ease: "none", scrollTrigger: st });
        gsap.to("[data-ring-b]", { y: -70, ease: "none", scrollTrigger: st });
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
        <div
          data-glow
          className="absolute -right-32 -top-20 size-[520px] rounded-full bg-se-lime/15 blur-3xl"
        />
        <div className="absolute -left-40 bottom-0 size-[460px] rounded-full bg-[#9bb35a]/15 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_50%_at_20%_15%,#000,transparent)]" />
        <div
          data-ring-a
          className="absolute -right-56 -top-56 hidden size-[600px] rounded-full border border-white/10 lg:block"
        />
        <div
          data-ring-b
          className="absolute -right-20 top-40 hidden size-[300px] rounded-full border border-se-lime/20 lg:block"
        />
      </div>

      <div className="page-container relative grid items-start gap-14 pb-24 pt-36 sm:pt-44 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pb-32">
        {/* Left: heading and contact details */}
        <div className="lg:pt-6">
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
            muted={[3]}
            className="mt-6 max-w-[9em] text-[clamp(2.75rem,6.4vw,5.75rem)]"
          />
          <p
            data-fade
            className="mt-5 max-w-[26rem] text-base text-white/70 sm:text-lg"
          >
            {c.text}
          </p>

          <ul
            data-fade
            className="mt-12 divide-y divide-white/10 border-y border-white/10"
          >
            {contactDetails.map((d, i) => {
              const Icon = icons[i % icons.length];
              const inner = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-se-lime transition-colors duration-300 group-hover:bg-se-lime group-hover:text-se-olive">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs text-white/50">
                      {d.label}
                    </span>
                    <span className="block text-base sm:text-lg">
                      {d.value}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={d.label}>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="group flex items-center gap-4 py-5 transition-colors hover:text-se-lime"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 py-5">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: form card */}
        <div data-fade>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
