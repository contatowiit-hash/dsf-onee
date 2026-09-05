import { Reveal, Chapter } from "@/components/Reveal";

const TOPICS = [
  "Energia elétrica",
  "Potência e consumo",
  "kWh e cálculo de consumo",
  "Conta de energia",
  "Eficiência energética",
  "Fontes de energia",
  "Sustentabilidade",
  "Segurança elétrica",
  "Equipamentos e consumo doméstico",
];

export default function ContentGrid() {
  return (
    <section id="conteudo" className="scroll-mt-20 py-16 sm:py-24 lg:py-32" data-testid="content-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Chapter label="Conteúdo" />
        </Reveal>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={0.08}>
            <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              O que você vai <span className="text-slate-400">estudar</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="max-w-sm text-base leading-relaxed text-slate-600 sm:text-lg">
              Os temas essenciais de energia e eficiência energética, organizados do básico ao
              avançado.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic, i) => (
            <Reveal key={topic} delay={0.05 + i * 0.06}>
              <article
                data-testid={`topic-card-${i + 1}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-ink"
              >
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover:text-volt">
                    Tema {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold leading-snug transition-colors duration-300 group-hover:text-white sm:text-lg">
                    {topic}
                  </h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
