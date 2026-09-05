import { Zap, Brain, PenLine, Trophy, BarChart3, Repeat } from "lucide-react";
import { Reveal, Chapter } from "@/components/Reveal";

const BENEFITS = [
  { icon: Zap, title: "Conteúdo resumido", description: "Só o essencial, sem enrolação e sem excesso de teoria." },
  { icon: Brain, title: "Explicações fáceis de entender", description: "Linguagem simples, feita para estudantes do ensino fundamental." },
  { icon: PenLine, title: "Questões para praticar", description: "Treine o raciocínio e fixe cada assunto na prática." },
  { icon: Trophy, title: "Simulados", description: "Treine como se fosse o dia da prova e ganhe confiança." },
  { icon: BarChart3, title: "Acompanhamento da evolução", description: "Veja seu progresso e saiba onde focar os estudos." },
  { icon: Repeat, title: "Revisões dos principais assuntos", description: "Volte aos pontos-chave sempre que precisar reforçar." },
];

export default function Solution() {
  return (
    <section id="solucao" className="scroll-mt-20 bg-[#F3F4F0] py-16 sm:py-24 lg:py-32" data-testid="solution-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Chapter index="CAP. 02" label="A Solução" />
        </Reveal>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={0.08}>
            <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Um caminho simples para <span className="relative inline-block">estudar melhor.<span aria-hidden="true" className="absolute inset-x-0 bottom-1 -z-10 h-3 -rotate-1 rounded-sm bg-volt" /></span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="max-w-sm text-base leading-relaxed text-slate-600 sm:text-lg">
              O Desafio ONEE organiza a sua preparação em trilhas objetivas — do conceito à prática.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={0.08 + i * 0.08} className="h-full">
              <article
                data-testid={`solution-card-${i + 1}`}
                className="group flex h-full items-start gap-5 rounded-2xl border border-transparent bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink sm:p-7"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-volt text-ink transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <benefit.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold sm:text-lg">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{benefit.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
