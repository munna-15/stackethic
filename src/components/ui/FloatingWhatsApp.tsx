"use client";

import { useState } from "react";
import { X, MessageCircle, Phone, ArrowUpRight, Headset } from "lucide-react";

const phoneNumber = "8801792960610";
const message = "Hi StackEthic, I'd like to discuss a project.";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const callUrl = `tel:+${phoneNumber}`;

  const cardStyle =
    "absolute right-0 flex w-[220px] items-center gap-3 rounded-[20px] border border-white/70 bg-white/85 p-3 text-[#252B0B] shadow-[0_12px_40px_rgba(37,43,11,0.12)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]";

  const hiddenStyle =
    "invisible translate-y-4 scale-95 opacity-0 pointer-events-none";

  const visibleStyle = "visible translate-y-0 scale-100 opacity-100";

  return (
    <div
      className="
        fixed right-6 bottom-[94px] z-[100]
        flex items-center justify-center
        sm:right-8
        md:top-1/2 md:bottom-auto md:-translate-y-1/2
      "
    >
      <div className="relative flex size-[62px] items-center justify-center">
        {/* WhatsApp Card */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isOpen ? 0 : -1}
          aria-hidden={!isOpen}
          className={`
            ${cardStyle}
            bottom-[calc(100%+12px)]
            ${isOpen ? visibleStyle : hiddenStyle}
          `}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[15px] bg-[#252B0B] text-[#DDF46A]">
            <MessageCircle size={20} strokeWidth={1.7} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[12px] font-semibold">WhatsApp us</span>
            <span className="mt-1 block text-[10px] text-[#858873]">
              Let's talk about your project
            </span>
          </span>

          <ArrowUpRight size={15} className="shrink-0 text-[#858873]" />
        </a>

        {/* Call Card */}
        <a
          href={callUrl}
          tabIndex={isOpen ? 0 : -1}
          aria-hidden={!isOpen}
          className={`
            ${cardStyle}
            bottom-[calc(100%+112px)]
            md:top-[calc(100%+12px)] md:bottom-auto
            ${isOpen ? visibleStyle : hiddenStyle}
          `}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[15px] bg-[#E5EBCB] text-[#252B0B]">
            <Phone size={19} strokeWidth={1.7} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[12px] font-semibold">Call us</span>
            <span className="mt-1 block text-[10px] text-[#858873]">
              Speak directly with us
            </span>
          </span>

          <ArrowUpRight size={15} className="shrink-0 text-[#858873]" />
        </a>

        {/* Main Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
          aria-expanded={isOpen}
          className="
            group relative z-10 flex size-[62px]
            items-center justify-center rounded-full
            border border-[#DDF46A]/25
            bg-[#252B0B] text-[#DDF46A]
            shadow-[0_10px_35px_rgba(37,43,11,0.25)]
            transition-all duration-500
            hover:shadow-[0_12px_40px_rgba(37,43,11,0.32)]
            active:scale-95
          "
        >
          <span className="absolute inset-[5px] rounded-full border border-white/10" />

          {/* Headset */}
          <span
            className={`
              absolute transition-all duration-500
              ${
                isOpen
                  ? "rotate-90 scale-50 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }
            `}
          >
            <Headset size={24} strokeWidth={1.6} />
          </span>

          {/* Close */}
          <span
            className={`
              absolute transition-all duration-500
              ${
                isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-50 opacity-0"
              }
            `}
          >
            <X size={23} strokeWidth={1.6} />
          </span>

          {/* Status Indicator */}
          {!isOpen && (
            <span className="absolute right-[7px] top-[7px] size-[9px] rounded-full border-2 border-[#252B0B] bg-[#DDF46A]">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#DDF46A] opacity-50" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
