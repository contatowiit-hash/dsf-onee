import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, Chapter, EASE } from "@/components/Reveal";

const FAQS = [
  {
    q: "Isso é oficial da ONEE?",
    a: "Não. O Desafio ONEE é uma preparação 100% independente, sem vínculo com a ANEEL ou com a organização da olimpíada. Nosso objetivo é ajudar você a estudar os conteúdos de energia e eficiência energética de forma organizada.",
  },
  {
    q: "Para quais anos escolares serve?",
    a: "Para estudantes do 8º e 9º ano do Ensino Fundamental — e também para os responsáveis que querem acompanhar e apoiar a preparação de perto.",
  },
  {
    q: "Preciso ter conhecimento prévio?",
    a: "Não. As aulas começam do básico e explicam cada conceito de forma simples, passo a passo, com linguagem feita para estudantes do ensino fundamental.",
  },
  {
    q: "Posso estudar pelo celular?",
    a: "Sim. Todo o conteúdo pode ser acessado pelo celular, tablet ou computador — no seu ritmo, onde e quando quiser.",
  },
  {
    q: "Quanto tempo preciso estudar por dia?",
    a: "O conteúdo é direto ao ponto. Com sessões curtas e consistentes de estudo você já avança bem — o ideal é manter uma rotina regular até a prova.",
  },
  {
    q: "Existe garantia?",
    a: "Sim. Você tem 7 dias de garantia incondicional: se não gostar do material, devolvemos o valor integral, sem perguntas.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-24 lg:py-32" data-testid="faq-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Reveal>
              <Chapter index="CAP. 06" label="FAQ" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Perguntas <span className="text-slate-400">frequentes</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-600 sm:text-lg">
                Transparência total, sem promessas milagrosas. Se restar alguma dúvida, fale com a
                gente.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {FAQS.map((item, i) => (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    data-testid={`faq-question-${i + 1}`}
                    className="group flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="font-display text-base font-bold transition-colors duration-200 group-hover:text-slate-500 sm:text-lg">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: open === i ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        open === i ? "bg-ink text-volt" : "bg-slate-100 text-ink"
                      }`}
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-sm leading-relaxed text-slate-600 sm:text-base" data-testid={`faq-answer-${i + 1}`}>
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
