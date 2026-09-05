import { useState } from "react";
import { Link, Navigate, useOutletContext, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/course/api";
import { MODULES, moduleProgress, isModuleUnlocked } from "@/course/data/modules";
import { ArrowLeft, CheckCircle2, ChevronDown, Lock } from "lucide-react";

function QuizBlock({ lesson, done, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const answeredAll = Object.keys(answers).length === lesson.quiz.length;

  const submit = () => {
    const correct = lesson.quiz.filter((q, i) => answers[i] === q.answer).length;
    setResult(correct);
    onComplete();
  };

  return (
    <div className="space-y-5 pt-2" data-testid={`quiz-${lesson.id}`}>
      {lesson.quiz.map((q, qi) => (
        <div key={qi} className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm font-semibold text-foreground">
            {qi + 1}. {q.q}
          </p>
          <div className="mt-3 grid gap-2">
            {q.options.map((opt, oi) => {
              const chosen = answers[qi] === oi;
              const showCorrect = result !== null && q.answer === oi;
              const showWrong = result !== null && chosen && q.answer !== oi;
              return (
                <button
                  key={oi}
                  disabled={result !== null}
                  onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                  className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                    showCorrect
                      ? "border-volt bg-volt/20 text-foreground"
                      : showWrong
                        ? "border-red-400 bg-red-500/10 text-foreground"
                        : chosen
                          ? "border-foreground bg-secondary text-foreground"
                          : "border-border text-muted-foreground hover:border-foreground/40"
                  }`}
                  data-testid={`quiz-${lesson.id}-q${qi}-opt${oi}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {result === null ? (
        <button
          onClick={submit}
          disabled={!answeredAll}
          className="rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-volt hover:text-ink disabled:opacity-40"
          data-testid={`quiz-${lesson.id}-submit`}
        >
          Corrigir quiz
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-xl bg-volt/20 px-4 py-3" data-testid={`quiz-${lesson.id}-result`}>
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#65a30d]" />
          <p className="text-sm font-semibold text-foreground">
            Você acertou {result} de {lesson.quiz.length}. Aula concluída!
          </p>
        </div>
      )}
      {done && result === null && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-[#65a30d]" /> Quiz já concluído — refaça para treinar.
        </p>
      )}
    </div>
  );
}

export default function ModulePage() {
  const { id } = useParams();
  const { progress, refreshProgress } = useOutletContext();
  const [openId, setOpenId] = useState(null);
  const completed = progress?.completed_lessons ?? [];

  const moduleIndex = MODULES.findIndex((m) => m.id === Number(id));
  const module = MODULES[moduleIndex];

  if (!module) return <Navigate to="/curso" replace />;
  if (!isModuleUnlocked(moduleIndex, completed)) return <Navigate to="/curso" replace />;

  const pct = moduleProgress(module, completed);

  const completeLesson = async (lessonId) => {
    try {
      await api.post("/progress/lesson", { lesson_key: lessonId });
      await refreshProgress();
    } catch {
      /* tenta novamente no próximo clique */
    }
  };

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
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl" data-testid="module-title">
          {module.title}
        </h1>
        <p className="mt-1 text-muted-foreground">{module.description}</p>
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
          const open = openId === lesson.id;
          return (
            <div key={lesson.id} className="overflow-hidden rounded-2xl border border-border bg-card" data-testid={`lesson-${lesson.id}`}>
              <button
                onClick={() => setOpenId(open ? null : lesson.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  {String(li + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-sm font-bold text-foreground sm:text-base">
                  {lesson.title}
                </span>
                {done && <CheckCircle2 className="h-5 w-5 shrink-0 text-[#65a30d]" />}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border px-5 py-5">
                      {lesson.quiz ? (
                        <QuizBlock lesson={lesson} done={done} onComplete={() => completeLesson(lesson.id)} />
                      ) : (
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed text-foreground sm:text-base">{lesson.intro}</p>
                          <ul className="space-y-2">
                            {lesson.points.map((point, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground sm:text-base">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt ring-1 ring-ink/20" />
                                {point}
                              </li>
                            ))}
                          </ul>
                          {!done && (
                            <button
                              onClick={() => completeLesson(lesson.id)}
                              className="rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-volt hover:text-ink"
                              data-testid={`lesson-${lesson.id}-complete`}
                            >
                              Marcar como concluída
                            </button>
                          )}
                          {done && (
                            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                              <CheckCircle2 className="h-4 w-4 text-[#65a30d]" /> Aula concluída
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 p-5">
        <Lock className="h-5 w-5 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Ficou com dúvida em alguma aula? O Professor IA está no botão flutuante no canto inferior
          direito — pergunte sem sair do módulo.
        </p>
      </div>
    </div>
  );
}
