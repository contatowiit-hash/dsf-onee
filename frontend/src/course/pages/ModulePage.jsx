import { Link, Navigate, useOutletContext, useParams } from "react-router-dom";
import { MODULES, moduleProgress, isModuleUnlocked } from "@/course/data/modules";
import { ArrowLeft, CheckCircle2, ChevronRight, GraduationCap, Lock } from "lucide-react";

export default function ModulePage() {
  const { id } = useParams();
  const { progress } = useOutletContext();
  const completed = progress?.completed_lessons ?? [];

  const moduleIndex = MODULES.findIndex((m) => m.id === Number(id));
  const module = MODULES[moduleIndex];

  if (!module) return <Navigate to="/curso" replace />;
  if (!isModuleUnlocked(moduleIndex, completed)) return <Navigate to="/curso" replace />;

  const pct = moduleProgress(module, completed);
  const nonQuizDone = module.lessons.filter((l) => !l.quiz && completed.includes(l.id)).length;
  const nonQuizTotal = module.lessons.filter((l) => !l.quiz).length;

  return (
    <div className="space-y-8" data-testid="module-page">
      <Link
        to="/curso/modulos"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Todos os módulos
      </Link>

      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Módulo {String(module.id).padStart(2, "0")}
        </p>
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl" data-testid="module-title">
          {module.title}
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">{module.description}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-volt transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-sm font-bold text-foreground">{pct}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {module.lessons.map((lesson, li) => {
          const done = completed.includes(lesson.id);
          const isQuiz = Boolean(lesson.quiz);
          const quizLocked = isQuiz && lesson.requiresPrevious && nonQuizDone < nonQuizTotal && !done;

          const row = (
            <div
              className={`flex w-full items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 text-left transition-all duration-200 ${
                quizLocked ? "cursor-not-allowed opacity-55" : "hover:-translate-y-0.5 hover:border-foreground/40"
              }`}
              data-testid={`lesson-${lesson.id}`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${
                  done ? "bg-volt text-ink" : isQuiz ? "bg-ink text-volt" : "bg-secondary text-foreground"
                }`}
              >
                {String(li + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-sm font-bold text-foreground sm:text-base">
                  {lesson.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground sm:text-sm">
                  {quizLocked
                    ? "Conclua as aulas para liberar o quiz"
                    : isQuiz
                      ? `${lesson.quiz.length} questões com explicação`
                      : lesson.goal ?? "Aula"}
                </span>
              </span>
              {done ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#65a30d]" />
              ) : quizLocked ? (
                <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </div>
          );

          return quizLocked ? (
            <div key={lesson.id}>{row}</div>
          ) : (
            <Link key={lesson.id} to={`/curso/modulo/${module.id}/aula/${lesson.id}`} className="block">
              {row}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 p-5">
        <GraduationCap className="h-5 w-5 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Ficou com dúvida em alguma aula? O Professor IA está no botão flutuante no canto inferior
          direito — pergunte sem sair do módulo.
        </p>
      </div>
    </div>
  );
}

