import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-12 text-white" data-testid="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-volt">
                <Zap className="h-5 w-5 text-ink" fill="currentColor" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">
                DESAFIO <span className="text-slate-500">ONEE</span>
              </span>
            </span>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Preparação independente para estudantes do 8º e 9º ano que querem chegar mais
              preparados para a Olimpíada Nacional de Eficiência Energética.
            </p>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-slate-500" data-testid="footer-disclaimer">
            Aviso legal: o Desafio ONEE é um material de preparação independente e não possui
            vínculo oficial, associação ou endosso da ANEEL, de órgãos governamentais ou dos
            organizadores da ONEE. Nenhum resultado, medalha ou classificação é prometido ou
            garantido.
          </p>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
            © 2026 Desafio ONEE — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
