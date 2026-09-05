import { Compass, HelpCircle, TimerOff } from "lucide-react";
import { Reveal, Chapter } from "@/components/Reveal";

const PROBLEMS = [
  {
    number: "01",
    icon: Compass,
    title: "Não sabe quais assuntos priorizar",
    description:
      "Tanta informação solta por aí que fica impossível saber o que realmente importa para a prova.",
  },
  {
    number: "02",
    icon: HelpCircle,
    title: "Estuda, mas não sabe se realmente aprendeu",
    description:
      "Lê, relê, grifa o caderno… e mesmo assim fica aquela dúvida: será que eu entendi de verdade?",
  },
  {
    number: "03",
    icon: TimerOff,
    title: "Chega na prova sem ter treinado questões suficientes",
    description:
      "Na hora da prova, a falta de treino com questões pesa — e o nervosismo toma conta.",
  },
];

export default function Problems() {
  return (
    <section id="problema" className="scroll-mt-20 py-16 sm:py-24 lg:py-32" data-testid="problems-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Chapter label="O problema" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Você sabe exatamente <span className="text-slate-400">o que estudar?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            A maioria dos estudantes se dedica — mas estuda do jeito errado. Se você se identifica
            com algum destes pontos, o problema não é falta de esforço.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {PROBLEMS.map((problem, i) => (
            <Reveal key={problem.number} delay={0.1 + i * 0.12} className="h-full">
              <article
                data-testid={`problem-card-${problem.number}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:shadow-[8px_8px_0_0_#CCFF00] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-volt transition-colors duration-300 group-hover:bg-volt group-hover:text-ink">
                    <problem.icon className="h-6 w-6" />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold leading-snug sm:text-xl">
                  {problem.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {problem.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
