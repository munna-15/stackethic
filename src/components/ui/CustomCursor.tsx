"use client";

import { useEffect, useRef } from "react";

type CursorMode = "default" | "view";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;

    if (!cursor || !label) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame = 0;
    let visible = false;
    let mode: CursorMode = "default";

    const render = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      frame = requestAnimationFrame(render);
    };

    const setMode = (nextMode: CursorMode) => {
      if (mode === nextMode) return;

      mode = nextMode;
      cursor.dataset.mode = nextMode;
    };

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        cursor.classList.add("is-visible");
      }

      const target = event.target as HTMLElement | null;

      if (!target) return;

      const viewTarget = target.closest("[data-cursor='view']");
      const excludedTarget = target.closest(
        "input, textarea, select, [contenteditable='true']",
      );

      if (excludedTarget) {
        setMode("default");
        cursor.classList.add("is-hidden");
        return;
      }

      cursor.classList.remove("is-hidden");

      if (viewTarget) {
        label.textContent = "VIEW";
        setMode("view");
      } else {
        setMode("default");
      }
    };

    const handleLeave = () => {
      visible = false;
      cursor.classList.remove("is-visible");
    };

    document.documentElement.classList.add("has-custom-cursor");

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);

      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="architectural-cursor"
      data-mode="default"
    >
      <div className="architectural-cursor__arrow">
        <svg viewBox="0 0 32 38" fill="none">
          <path
            d="M3 2.5V31L10.4 23.7L16.1 35L21.1 32.5L15.4 21.1H28L3 2.5Z"
            fill="#DDF46A"
            stroke="#252B0B"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div ref={labelRef} className="architectural-cursor__label">
        VIEW
      </div>
    </div>
  );
}
