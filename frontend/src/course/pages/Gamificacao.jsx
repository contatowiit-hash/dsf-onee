import { useOutletContext } from "react-router-dom";
import { TOTAL_LESSONS } from "@/course/data/modules";
import { Gamepad2, Zap, BookOpen, Timer, Star, Award } from "lucide-react";

export default function Gamificacao() {
  const { progress } = useOutletContext();
  const xp = progress?.xp ?? 0;
  const completed = progress?.completed_lessons?.length ?? 0;
  const simulados = progress?.simulados?.length ?? 0;
  const level = Math.floor(xp / 100) + 1;
  const levelPct = xp % 100;

  const achievements = [
    { icon: BookOpen, label: "Primeira aula", desc: "Conclua sua primeira aula", unlocked: completed >= 1 },
    { icon: Zap, label: "Aquecimento", desc: "Conclua 5 atividades", unlocked: completed >= 5 },
    { icon: Star, label: "Dedicação total", desc: "Conclua 15 atividades", unlocked: completed >= 15 },
    { icon: Timer, label: "Primeiro simulado", desc: "Finalize um simulado", unlocked: simulados >= 1 },
    { icon: Gamepad2, label: "100 XP", desc: "Acumule 100 XP", unlocked: xp >= 100 },
    { icon: Award, label: "Preparação completa", desc: "Conclua todos os módulos", unlocked: completed >= TOTAL_LESSONS },
  ];

  return (
    <div className="space-y-8" data-testid="gamificacao-page">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Gamificação
        </h1>
        <p className="mt-1 text-muted-foreground">Seu XP, nível e conquistas de estudo.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">XP total</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-foreground" data-testid="xp-total">{xp}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Nível</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-foreground" data-testid="level">{level}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-volt" style={{ width: `${levelPct}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">{100 - levelPct} XP para o próximo nível</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Simulados feitos</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-foreground">{simulados}</p>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-foreground">Conquistas</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {achievements.map((a) => (
            <div
              key={a.label}
              className={`flex items-center gap-4 rounded-2xl border p-5 ${
                a.unlocked ? "border-volt bg-volt/10" : "border-border bg-card opacity-50"
              }`}
              data-testid={`achievement-${a.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  a.unlocked ? "bg-volt text-ink" : "bg-secondary text-muted-foreground"
                }`}
              >
                <a.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-foreground sm:text-base">{a.label}</p>
                <p className="text-xs text-muted-foreground sm:text-sm">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
