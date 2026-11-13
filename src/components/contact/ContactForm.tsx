"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { contactForm as f } from "@/data/contactContent";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-xl border border-[#e0e4d0] bg-[#fbfcf8] px-4 text-[15px] text-[#1c220a] outline-none transition placeholder:text-[#a3a58f] focus:border-se-olive focus:ring-2 focus:ring-se-lime/60";

export default function ContactForm() {
  const [types, setTypes] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const toggle = (t: string) =>
    setTypes((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"),
          message: fd.get("message"),
          website: fd.get("website"), // hidden spam trap
          types,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      setStatus("success");
      form.reset();
      setTypes([]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[28px] bg-white p-8 text-[#1c220a] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-se-lime text-se-olive">
          <Check size={26} aria-hidden />
        </span>
        <h2 className="mt-6 text-[clamp(28px,3vw,40px)] leading-[1.05]">
          {f.success.title}
        </h2>
        <p className="mt-3 max-w-[26rem] text-[#5c6152]">{f.success.text}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-[#d1d5db] px-6 py-3 text-sm transition-colors hover:bg-black/5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[28px] bg-white p-6 text-[#1c220a] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-10"
    >
      <h2 className="text-[clamp(26px,2.6vw,36px)] leading-[1.05]">
        {f.title}
      </h2>
      <p className="mt-2 text-[15px] text-[#5c6152]">{f.text}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm">Name</span>
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={`${field} h-12`}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm">Email</span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@company.com"
            className={`${field} h-12`}
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm">
          Company <span className="text-[#a3a58f]">(optional)</span>
        </span>
        <input
          name="company"
          maxLength={120}
          autoComplete="organization"
          placeholder="Company or project name"
          className={`${field} h-12`}
        />
      </label>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {f.types.map((t) => {
            const on = types.includes(t);
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(t)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  on
                    ? "border-se-olive bg-se-olive text-se-lime"
                    : "border-[#d1d5db] hover:bg-black/5"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm">Tell us about your project</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={5}
          placeholder="What are you building, and what would you like our help with?"
          className={`${field} min-h-[140px] resize-y py-3`}
        />
      </label>

      {/* Spam trap: real people never see or fill this */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-se-olive px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-olive-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />{" "}
              Sending...
            </>
          ) : (
            <>
              {f.submit}
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-red-700">
          {status === "error" ? error : ""}
        </p>
      </div>
    </form>
  );
}
