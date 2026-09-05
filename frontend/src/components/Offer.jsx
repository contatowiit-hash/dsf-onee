import { useState } from "react";
import { Zap, Check, ShieldCheck } from "lucide-react";
import { Reveal, Chapter } from "@/components/Reveal";
import UpsellModal from "@/components/UpsellModal";

const INCLUDED = [
  "Aulas objetivas",
  "Material de revisão",
  "Banco de questões",
  "Simulados",
  "Gabaritos comentados",
];

export default function Offer() {
  const [upsellOpen, setUpsellOpen] = useState(false);
  return (
    <section id="oferta" className="scroll-mt-20 bg-ink py-16 text-white sm:py-24 lg:py-32" data-testid="offer-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Chapter index="CAP. 05" label="A Oferta" dark />
        </Reveal>

        <div className="mt-10 grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal delay={0.08}>
              <span className="inline-block rounded-full border border-volt/40 bg-volt/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-volt">
                Preparação 100% independente
              </span>
              <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Quer estudar com <span className="text-volt">tudo organizado?</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
                O Desafio ONEE reúne em um só lugar tudo o que você precisa para se preparar com
                foco — sem vínculo com a organização oficial da olimpíada.
              </p>
            </Reveal>

            <ul className="mt-9 grid gap-3.5 sm:grid-cols-2" data-testid="offer-included-list">
              {INCLUDED.map((item, i) => (
                <Reveal key={item} delay={0.1 + i * 0.07}>
                  <li className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-volt">
                      <Check className="h-4 w-4 text-ink" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-slate-200 sm:text-base">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.15}>
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur sm:p-10" data-testid="offer-price-card">
              <span className="absolute -top-4 left-8 rounded-full bg-volt px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
                Preço de lançamento
              </span>

              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Acesso completo ao Desafio ONEE
              </p>
              <div className="mt-5 flex items-end gap-3">
                <span className="font-display text-6xl font-extrabold tracking-tight text-volt sm:text-7xl">
                  R$ 19<span className="text-4xl sm:text-5xl">,90</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-400 sm:text-base">
                Pagamento único • Acesso imediato • Valor promocional de lançamento
              </p>

              <button
                onClick={() => setUpsellOpen(true)}
                data-testid="offer-checkout-button"
                className="pulse-glow group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-volt px-8 py-4 font-display text-lg font-extrabold text-ink transition-all duration-200 hover:-translate-y-1 hover:bg-bolt active:translate-y-0 active:scale-[0.97]"
              >
                COMEÇAR AGORA
                <Zap className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" fill="currentColor" />
              </button>

              <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 sm:text-sm" data-testid="offer-guarantee">
                <ShieldCheck className="h-4 w-4 shrink-0 text-volt" />
                7 dias de garantia incondicional — sem perguntas, sem burocracia.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <UpsellModal open={upsellOpen} onClose={() => setUpsellOpen(false)} />
    </section>
  );
}
