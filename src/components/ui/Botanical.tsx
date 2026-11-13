/** Faint line-art clover used as a card watermark */
export default function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
      className={className}
    >
      <path d="M60 110V60" />
      <path d="M60 60c-22 0-30-22-14-32 10-6 20 2 14 32Z" />
      <path d="M60 60c22 0 30-22 14-32-10-6-20 2-14 32Z" />
      <path d="M60 60c-22 0-32 18-18 30 10 8 22-2 18-30Z" />
      <path d="M60 60c22 0 32 18 18 30-10 8-22-2-18-30Z" />
    </svg>
  );
}
