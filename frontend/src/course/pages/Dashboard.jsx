import { Link, useOutletContext } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { MODULES, TOTAL_LESSONS, nextLesson } from "@/course/data/modules";
import { levelFor, streakFrom } from "@/course/data/gamification";
import ModuleRow from "@/course/components/ModuleRow";
import { Timer, Layers, Gamepad2, BookOpen, ArrowRight, Zap, Flame } from "lucide-react";

const ACTIONS = [
  {
    to: "/curso/simulado",
    icon: Timer,
    title: "Fazer simulado",
    description: "Teste seus conhecimentos com questões cronometradas.",
    testid: "action-simulado",
  },
  {
    to: "/curso/flashcards",
    icon: Layers,
    title: "Flashcards",
    description: "Revise conceitos importantes e fortaleça sua memória.",
    testid: "action-flashcards",
  },
  {
    to: "/curso/gamificacao",
    icon: Gamepad2,
    title: "Gamificação",
    description: "Veja seu XP, nível e conquistas de estudo.",
    testid: "action-gamificacao",
  },
  {
    to: "/curso/modulos",
    icon: BookOpen,
    title: "Conteúdo para estudar",
    description: "Acesse todas as aulas e materiais.",
    testid: "action-conteudo",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { progress } = useOutletContext();
  const completed = progress?.completed_lessons ?? [];
  const pct = Math.round((completed.length / TOTAL_LESSONS) * 100);
  const next = nextLesson(completed);
  const firstName = user?.name?.split(" ")[0] ?? "estudante";
  const xp = progress?.xp ?? 0;
  const { current: level } = levelFor(xp);
  const streak = streakFrom(progress?.activity_dates);
  const simuladosCount = progress?.simulados?.length ?? 0;

  return (
    <div className="space-y-10" data-testid="dashboard">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl" data-testid="dashboard-greeting">
          Olá, {firstName}!
        </h1>
        <p className="mt-1 text-muted-foreground">Continue sua preparação para a ONEE.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4" data-testid="stat-xp">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Zap className="h-3.5 w-3.5" /> XP</p>
          <p className="mt-1 font-display text-xl font-extrabold text-foreground sm:text-2xl">{xp}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4" data-testid="stat-level">
          <p className="text-xs text-muted-foreground">Nível</p>
          <p className="mt-1 truncate font-display text-xl font-extrabold text-foreground sm:text-2xl">{level.name}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4" data-testid="stat-streak">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Flame className="h-3.5 w-3.5" /> Sequência</p>
          <p className="mt-1 font-display text-xl font-extrabold text-foreground sm:text-2xl">
            {streak} {streak === 1 ? "dia" : "dias"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4" data-testid="stat-simulados">
          <p className="text-xs text-muted-foreground">Simulados</p>
          <p className="mt-1 font-display text-xl font-extrabold text-foreground sm:text-2xl">{simuladosCount}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-7" data-testid="progress-card">
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-base font-bold text-foreground">Seu progresso</p>
          <span className="font-display text-2xl font-extrabold text-foreground">{pct}%</span>
        </div>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-volt transition-all duration-700"
            style={{ width: `${pct}%` }}
            data-testid="progress-bar"
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Você já concluiu {completed.length} de {TOTAL_LESSONS} atividades.
        </p>
        {next && (
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to={`/curso/modulo/${next.module.id}/aula/${next.lesson.id}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-volt hover:text-ink"
              data-testid="continue-studying-button"
            >
              Continuar estudando
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Próxima aula: <strong className="text-foreground">{next.lesson.title}</strong> — {next.module.title}
            </p>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-foreground">Ações rápidas</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {ACTIONS.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-foreground/40"
              data-testid={action.testid}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt text-ink">
                <action.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-base font-bold text-foreground">
                  {action.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{action.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-foreground">Seu conteúdo de preparação</h2>
        <div className="mt-4 space-y-3">
          {MODULES.map((m, i) => (
            <ModuleRow key={m.id} module={m} index={i} completed={completed} />
          ))}
        </div>
      </div>
    </div>
  );
}
