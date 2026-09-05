import { useOutletContext } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { TOTAL_LESSONS } from "@/course/data/modules";
import { Award, Lock, Zap } from "lucide-react";

export default function Certificado() {
  const { user } = useAuth();
  const { progress } = useOutletContext();
  const completed = progress?.completed_lessons?.length ?? 0;
  const pct = Math.round((completed / TOTAL_LESSONS) * 100);
  const unlocked = pct === 100;

  return (
    <div className="space-y-8" data-testid="certificado-page">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Meu certificado
        </h1>
        <p className="mt-1 text-muted-foreground">
          Conclua 100% das atividades para liberar seu certificado de preparação.
        </p>
      </div>

      {unlocked ? (
        <div className="rounded-3xl border-2 border-ink bg-card p-10 text-center shadow-[10px_10px_0_0_#CCFF00]" data-testid="certificate">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-volt">
            <Zap className="h-7 w-7 text-ink" fill="currentColor" />
          </span>
          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Certificado de conclusão
          </p>
          <p className="mt-4 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
            {user?.name}
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            concluiu a preparação independente Desafio ONEE para a Olimpíada Nacional de
            Eficiência Energética.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center" data-testid="certificate-locked">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </span>
          <p className="mt-5 font-display text-lg font-bold text-foreground">
            Certificado bloqueado
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Você já concluiu {pct}% das atividades. Continue estudando para desbloquear.
          </p>
          <div className="mt-5 h-2 w-full max-w-xs overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-volt" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Award className="mt-0.5 h-4 w-4 shrink-0" />
        O certificado comprova a conclusão desta preparação independente e não é um documento
        oficial da ONEE.
      </p>
    </div>
  );
}
