import { Zap } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36" data-testid="final-cta-section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/25 blur-[140px]"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Pare de estudar <span className="relative inline-block">no aleatório.<span aria-hidden="true" className="absolute inset-x-0 bottom-1 -z-10 h-4 -rotate-1 rounded-sm bg-volt" /></span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Organize seus estudos, pratique e chegue à olimpíada mais preparado.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="#oferta"
            data-testid="final-cta-button"
            className="pulse-glow group mt-10 inline-flex items-center gap-2.5 rounded-full bg-ink px-10 py-5 font-display text-lg font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-volt hover:text-ink active:translate-y-0 active:scale-[0.97] sm:text-xl"
          >
            QUERO COMEÇAR
            <Zap className="h-6 w-6 text-volt transition-colors duration-200 group-hover:text-ink" fill="currentColor" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
