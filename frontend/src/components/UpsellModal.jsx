import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Check, GraduationCap } from "lucide-react";
import { EASE } from "@/components/Reveal";

const CHECKOUT_ESSENCIAL = "https://pay.hotmart.com/placeholder-desafio-onee-essencial";
const CHECKOUT_COMPLETO = "https://pay.hotmart.com/placeholder-desafio-onee-completo";

const ESSENCIAL_ITEMS = [
  "Aulas objetivas",
  "Material de revisão",
  "Banco de questões",
  "Simulados",
  "Gabaritos comentados",
];

export default function UpsellModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          data-testid="upsell-modal"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-paper p-6 text-ink sm:rounded-3xl sm:p-9"
          >
            <button
              onClick={onClose}
              data-testid="upsell-close-button"
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-ink transition-colors hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Antes de finalizar
            </p>
            <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Como você quer <span className="relative inline-block">se preparar?<span aria-hidden="true" className="absolute inset-x-0 bottom-0.5 -z-10 h-2.5 -rotate-1 rounded-sm bg-volt" /></span>
            </h3>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Essencial
                </p>
                <p className="mt-3 font-display text-4xl font-extrabold tracking-tight">
                  R$ 19<span className="text-2xl">,90</span>
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {ESSENCIAL_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Check className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={CHECKOUT_ESSENCIAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="upsell-essential-button"
                  className="mt-7 flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3.5 font-display text-sm font-extrabold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-volt active:translate-y-0 active:scale-[0.98]"
                >
                  CONTINUAR COM ESSENCIAL
                </a>
              </div>

              <div className="relative flex flex-col rounded-2xl border-2 border-ink bg-ink p-6 text-white shadow-[8px_8px_0_0_#CCFF00]">
                <span className="absolute -top-3.5 left-6 rounded-full bg-volt px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                  Recomendado
                </span>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-volt">
                  Completo
                </p>
                <p className="mt-3 font-display text-4xl font-extrabold tracking-tight text-volt">
                  R$ 27<span className="text-2xl">,93</span>
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  <li className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className="h-4 w-4 shrink-0 text-volt" strokeWidth={3} />
                    Tudo do plano Essencial
                  </li>
                  <li className="flex items-start gap-2.5 rounded-xl bg-volt/10 p-3 text-sm font-semibold text-volt">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" />
                    Professor IA 24h para tirar todas as suas dúvidas de energia e eficiência
                    energética
                  </li>
                </ul>
                <a
                  href={CHECKOUT_COMPLETO}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="upsell-complete-button"
                  className="group mt-7 flex items-center justify-center gap-2 rounded-full bg-volt px-6 py-3.5 font-display text-sm font-extrabold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-bolt active:translate-y-0 active:scale-[0.98]"
                >
                  QUERO O COMPLETO
                  <Zap className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" fill="currentColor" />
                </a>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              Pagamento único • 7 dias de garantia incondicional nos dois planos
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
