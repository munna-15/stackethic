"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import SplitText from "../SplitText";

const experts = [
  {
    src: "/images/experts/expert-01.avif",
    alt: "Expert team member 1",
  },
  {
    src: "/images/experts/expert-02.avif",
    alt: "Expert team member 2",
  },
  {
    src: "/images/experts/expert-03.avif",
    alt: "Expert team member 3",
  },
  {
    src: "/images/experts/expert-04.png",
    alt: "Expert team member 4",
  },
];

export default function Cta() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-[linear-gradient(180deg,#fbfcf8,#ecf7b8)] pb-32 pt-28 text-center text-forest lg:pb-44 lg:pt-36"
    >
      <div className="wrap">
        <SplitText
          text="Speak to our software experts"
          className="mx-auto max-w-[10em] text-[clamp(42px,6.5vw,88px)]"
        />

        <p className="rv mx-auto mt-7 max-w-[34em] text-[clamp(16px,1.5vw,20px)] leading-relaxed text-[#5d6647]">
          Tell us what you want to build. Our team will review your idea and
          suggest the right plan, so you can move forward with confidence.
        </p>

        <div className="rv mt-10 inline-flex flex-wrap items-center justify-center gap-5 text-base">
          <span className="font-medium">Experts</span>

          {/* Expert Profile Images */}
          <div className="flex items-center pl-1">
            {experts.map((expert, index) => (
              <div
                key={expert.src}
                className={`relative size-11 shrink-0 overflow-hidden rounded-full border-[2px] border-white bg-[#dce5c2] shadow-sm ${
                  index !== 0 ? "-ml-3" : ""
                }`}
              >
                <Image
                  src={expert.src}
                  alt={expert.alt}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <Link
            href="mailto:hello@StackEthic.com"
            className="btn px-8! py-4! text-lg!"
          >
            Talk to us <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
