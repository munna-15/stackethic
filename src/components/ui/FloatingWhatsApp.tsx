"use client";

import { useState } from "react";
import { X } from "lucide-react";

const phoneNumber = "8801792960610";
const message = "Hi StackEthic, I'd like to discuss a project.";

export default function FloatingWhatsApp() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-2 sm:bottom-7 sm:right-7">
      {isPopupVisible && (
        <div className="whatsapp-popup relative flex items-center gap-3 rounded-full border border-[#e8e9df] bg-[#F7F7F0] py-2.5 pl-4 pr-2 shadow-[0_8px_30px_rgba(37,43,11,0.10)]">
          <p className="whitespace-nowrap text-xs font-medium text-[#252B0B]">
            Need help? Let's talk.
          </p>

          <button
            type="button"
            onClick={() => setIsPopupVisible(false)}
            aria-label="Close message"
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-[#777b68] transition-colors hover:bg-[#e9ebdf] hover:text-[#252B0B]"
          >
            <X size={13} strokeWidth={1.8} />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with StackEthic on WhatsApp"
        className="flex size-[54px] items-center justify-center rounded-full bg-[#252B0B] text-[#DDF46A] shadow-[0_8px_30px_rgba(37,43,11,0.18)] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#354316] active:scale-95"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-[25px]"
          aria-hidden="true"
        >
          <path
            d="M20.1 3.9A11.7 11.7 0 0 0 1.7 18l-1.1 4 4.1-1.1a11.8 11.8 0 0 0 5.6 1.4h.1A11.7 11.7 0 0 0 20.1 3.9Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.8 7.3c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.3s1 2.7 1.1 2.9c.2.2 2 3.2 4.9 4.3 2.4.9 2.9.7 3.4.6.5-.1 1.6-.7 1.8-1.4.2-.7.2-1.2.1-1.4-.1-.1-.3-.2-.6-.4l-1.9-.9c-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6l.4-.5c.2-.2.3-.4.4-.6.1-.2 0-.4 0-.5l-.7-1.8Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
