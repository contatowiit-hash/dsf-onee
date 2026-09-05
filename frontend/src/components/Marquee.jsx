import { Zap } from "lucide-react";

const ITEMS = [
  "EFICIÊNCIA ENERGÉTICA",
  "QUESTÕES COMENTADAS",
  "SIMULADOS",
  "CONSUMO CONSCIENTE",
  "FÍSICA APLICADA",
  "REVISÃO FOCADA",
];

const Row = ({ hidden }) => (
  <div aria-hidden={hidden} className="flex shrink-0 items-center">
    {ITEMS.map((item) => (
      <span key={`${hidden}-${item}`} className="flex items-center">
        <span className="whitespace-nowrap px-8 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {item}
        </span>
        <Zap className="h-6 w-6 shrink-0 text-volt" fill="currentColor" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div
      data-testid="editorial-marquee"
      className="relative z-10 -rotate-1 overflow-hidden border-y border-white/10 bg-ink py-5"
    >
      <div className="marquee-track flex w-max">
        <Row hidden={false} />
        <Row hidden={true} />
      </div>
    </div>
  );
}
