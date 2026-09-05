import { Reveal, Chapter } from "@/components/Reveal";

const STEPS = [
  {
    step: "01",
    title: "Aprenda",
    description: "Entenda os conceitos essenciais de energia e eficiência energética.",
  },
  {
    step: "02",
    title: "Pratique",
    description: "Resolva questões e descubra onde precisa melhorar.",
  },
  {
    step: "03",
    title: "Simule",
    description: "Treine com simulados e acompanhe sua evolução.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-ink py-16 text-white sm:py-24 lg:py-32" data-testid="how-it-works-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Chapter index="CAP. 03" label="Como Funciona" dark />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Três passos. <span className="text-volt">Nenhum mistério.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((item, i) => (
            <Reveal key={item.step} delay={0.1 + i * 0.14}>
              <article data-testid={`step-${item.step}`} className="group relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none block font-display text-[6rem] font-extrabold leading-none tracking-tight text-white/10 transition-colors duration-500 group-hover:text-volt/25 sm:text-[7.5rem]"
                >
                  {item.step}
                </span>
                <div className="-mt-8 sm:-mt-10">
                  <span className="mb-4 block h-1 w-12 rounded-full bg-volt transition-all duration-500 group-hover:w-24" />
                  <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-base leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
