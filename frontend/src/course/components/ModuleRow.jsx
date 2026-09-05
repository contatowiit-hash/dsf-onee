import { Link } from "react-router-dom";
import { CheckCircle2, Lock } from "lucide-react";
import { moduleProgress, isModuleUnlocked } from "@/course/data/modules";

export default function ModuleRow({ module, index, completed }) {
  const pct = moduleProgress(module, completed);
  const unlocked = isModuleUnlocked(index, completed);

  const content = (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-200 sm:p-5 ${
        unlocked ? "hover:-translate-y-0.5 hover:border-foreground/40" : "opacity-60"
      }`}
      data-testid={`module-row-${module.id}`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-sm font-extrabold ${
          pct === 100 ? "bg-volt text-ink" : "bg-secondary text-foreground"
        }`}
      >
        {String(module.id).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-bold text-foreground sm:text-base">
          {module.title}
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-volt transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="shrink-0 text-right">
        {pct === 100 ? (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-[#65a30d]" /> Concluído
          </span>
        ) : !unlocked ? (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-4 w-4" /> Bloqueado
          </span>
        ) : (
          <span className="text-xs font-semibold text-muted-foreground">{pct}%</span>
        )}
      </div>
    </div>
  );

  return unlocked ? (
    <Link to={`/curso/modulo/${module.id}`} className="block">
      {content}
    </Link>
  ) : (
    <div className="cursor-not-allowed">{content}</div>
  );
}
