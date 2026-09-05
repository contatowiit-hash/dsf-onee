import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useOutletContext, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "@/course/api";
import { MODULES, moduleProgress, isModuleUnlocked } from "@/course/data/modules";
import { LessonBlock, INTERACTIVE_TYPES } from "@/course/components/blocks";
import { ArrowLeft, ArrowRight, CheckCircle2, GraduationCap, Lock, RotateCcw, Zap } from "lucide-react";

const legacyBlocks = (lesson) => [
  { type: "intro", text: lesson.intro },
  { type: "keypoints", title: "Pontos-chave desta aula", items: lesson.points },
];

function QuizPlayer({ lesson, done, onFinish }) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = lesson.quiz[idx];
  const isLast = idx === lesson.quiz.length - 1;

  const choose = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.answer) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (isLast) {
      setFinished(true);
      onFinish(correctCount);
    } else {
      setChosen(null);
      setIdx(idx + 1);
    }
  };

  if (finished) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8" data-testid="quiz-player">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Questão {idx + 1} de {lesson.quiz.length}
        </p>
        <p className="font-mono text-xs font-bold text-muted-foreground">{correctCount} corretas</p>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-volt transition-all duration-500"
          style={{ width: `${(idx / lesson.quiz.length) * 100}%` }}
        />
      </div>
      <p className="mt-6 font-display text-lg font-bold leading-snug text-foreground sm:text-xl">{q.q}</p>
      <div className="mt-5 grid gap-2.5">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          const isChosen = chosen === i;
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={chosen !== null}
              data-testid={`quiz-opt-${i}`}
              className={`rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-all sm:text-base ${
                chosen === null
                  ? "border-border text-foreground/90 hover:border-foreground/50"
                  : isAnswer
                    ? "border-volt bg-volt/25 text-foreground"
                    : isChosen
                      ? "border-red-400 bg-red-500/10 text-foreground"
                      : "border-border text-muted-foreground"
              }`}
            >
              <span className="font-mono text-xs font-bold text-muted-foreground">
                {String.fromCharCode(65 + i)})
              </span>{" "}
              {opt}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
          <div
            className={`rounded-xl p-4 ${chosen === q.answer ? "bg-volt/20" : "border border-red-400/40 bg-red-500/5"}`}
            data-testid={chosen === q.answer ? "quiz-feedback-correct" : "quiz-feedback-wrong"}
          >
            <p className="flex items-center gap-2 text-sm font-bold text-foreground">
              {chosen === q.answer ? (
                <><CheckCircle2 className="h-4 w-4 text-[#65a30d]" /> Correto! +10 XP</>
              ) : (
                <><RotateCcw className="h-4 w-4 text-red-500" /> Não foi dessa vez. Entenda o motivo:</>
              )}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {q.why ?? "Revise as aulas deste módulo para fixar esse conceito."}
            </p>
            {chosen !== q.answer && (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-professor", {
                        detail: {
                          context: `Questão do quiz: ${q.q} | Alternativas: ${q.options.join(" / ")} | O aluno marcou: ${q.options[chosen]}`,
                        },
                      })
                    )
                  }
                  className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold text-volt transition-transform hover:scale-105"
                  data-testid="quiz-ask-professor"
                >
                  <GraduationCap className="h-3.5 w-3.5" /> Por que errei?
                </button>
                <Link
                  to={`/curso/modulo/${lesson.moduleId ?? 1}`}
                  className="flex items-center gap-2 rounded-full border border-foreground/30 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-secondary"
                >
                  Revisar o módulo
                </Link>
              </div>
            )}
          </div>
          <button
            onClick={next}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-display text-sm font-bold text-white transition-all hover:bg-volt hover:text-ink"
            data-testid="quiz-next"
          >
            {isLast ? "Ver resultado" : "Próxima questão"} <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function LessonPage() {
  const { id, lessonId } = useParams();
  const { progress, refreshProgress } = useOutletContext();
  const [step, setStep] = useState(1);
  const [doneBlocks, setDoneBlocks] = useState({});
  const [justCompleted, setJustCompleted] = useState(null);
  const bottomRef = useRef(null);
  const completed = progress?.completed_lessons ?? [];

  const moduleIndex = MODULES.findIndex((m) => m.id === Number(id));
  const module = MODULES[moduleIndex];
  const lessonIndex = module?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const lesson = module?.lessons[lessonIndex];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [step]);

  if (!module || !lesson) return <Navigate to="/curso" replace />;
  if (!isModuleUnlocked(moduleIndex, completed)) return <Navigate to="/curso" replace />;

  const alreadyDone = completed.includes(lesson.id);
  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : null;

  if (lesson.requiresPrevious) {
    const pending = module.lessons.filter((l) => !l.quiz && !completed.includes(l.id));
    if (pending.length > 0 && !alreadyDone) {
      return (
        <div className="mx-auto max-w-lg py-16 text-center" data-testid="quiz-locked">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </span>
          <h1 className="mt-5 font-display text-xl font-extrabold text-foreground sm:text-2xl">
            Quiz bloqueado
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Conclua as aulas deste módulo antes de fazer o quiz. Faltam {pending.length} de{" "}
            {module.lessons.length - 1}.
          </p>
          <Link
            to={`/curso/modulo/${module.id}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-white hover:bg-volt hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao módulo
          </Link>
        </div>
      );
    }
  }

  const blocks = lesson.blocks ?? legacyBlocks(lesson);
  const lastRevealed = blocks[step - 1];
  const needsAction = lastRevealed && INTERACTIVE_TYPES.has(lastRevealed.type);
  const canContinue = !needsAction || doneBlocks[step - 1];
  const allRevealed = step >= blocks.length;
  const modulePct = moduleProgress(module, completed);

  const completeLesson = async (quizCorrect = null) => {
    if (alreadyDone || justCompleted) return;
    try {
      await api.post("/progress/lesson", {
        lesson_key: lesson.id,
        ...(quizCorrect !== null ? { quiz_correct: quizCorrect } : {}),
      });
      await refreshProgress();
      setJustCompleted(quizCorrect !== null ? 25 + quizCorrect * 10 : 25);
    } catch {
      /* aluno pode clicar de novo */
    }
  };

  const lessonPct = lesson.quiz ? (alreadyDone || justCompleted ? 100 : 0) : Math.round((step / blocks.length) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-8" data-testid="lesson-page">
      <Link
        to={`/curso/modulo/${module.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        data-testid="lesson-back"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar para o módulo
      </Link>

      <header>
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Módulo {String(module.id).padStart(2, "0")} — {module.title}
        </p>
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl" data-testid="lesson-title">
          Aula {String(lessonIndex + 1).padStart(2, "0")} — {lesson.title}
        </h1>
        {lesson.goal && (
          <p className="mt-3 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
            <strong>Ao terminar esta aula você vai:</strong> {lesson.goal}
          </p>
        )}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-volt transition-all duration-500" style={{ width: `${lessonPct}%` }} data-testid="lesson-progress" />
            </div>
            <span className="font-mono text-xs font-bold text-muted-foreground">aula {lessonPct}%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-foreground/30 transition-all duration-500" style={{ width: `${modulePct}%` }} />
            </div>
            <span className="font-mono text-xs font-bold text-muted-foreground">módulo {modulePct}%</span>
          </div>
        </div>
        {(alreadyDone || justCompleted) && (
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#4d7c0f]" data-testid="lesson-done-badge">
            <CheckCircle2 className="h-4 w-4" /> Aula concluída
            {justCompleted && <span className="rounded-full bg-volt px-2.5 py-0.5 font-mono text-xs font-bold text-ink">+{justCompleted} XP</span>}
          </p>
        )}
      </header>

      {lesson.quiz ? (
        <>
          <QuizPlayer
            lesson={lesson}
            done={alreadyDone}
            onFinish={(correct) => completeLesson(correct)}
          />
          {(justCompleted || alreadyDone) && <CompletionFooter module={module} prevLesson={prevLesson} nextLesson={nextLesson} justCompleted={justCompleted} />}
        </>
      ) : (
        <>
          <div className="space-y-8">
            {blocks.slice(0, step).map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                data-testid={`lesson-block-${i}`}
              >
                <LessonBlock
                  block={block}
                  onDone={() => setDoneBlocks((d) => ({ ...d, [i]: true }))}
                />
              </motion.div>
            ))}
          </div>

          <div ref={bottomRef} className="space-y-6">
            {!allRevealed && (
              <button
                onClick={() => canContinue && setStep(step + 1)}
                disabled={!canContinue}
                className="mx-auto flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-volt hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                data-testid="lesson-continue"
              >
                {canContinue ? (
                  <>Continuar <ArrowRight className="h-4 w-4" /></>
                ) : (
                  "Responda acima para continuar"
                )}
              </button>
            )}

            {allRevealed && !alreadyDone && !justCompleted && (
              <button
                onClick={() => completeLesson()}
                className="mx-auto flex items-center gap-2.5 rounded-full bg-volt px-8 py-4 font-display text-base font-extrabold text-ink transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                data-testid="lesson-complete"
              >
                <Zap className="h-5 w-5" fill="currentColor" /> Concluir aula (+25 XP)
              </button>
            )}

            {(alreadyDone || justCompleted) && (
              <CompletionFooter module={module} prevLesson={prevLesson} nextLesson={nextLesson} justCompleted={justCompleted} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

function CompletionFooter({ module, prevLesson, nextLesson }) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
      {prevLesson ? (
        <Link
          to={`/curso/modulo/${module.id}/aula/${prevLesson.id}`}
          className="flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {prevLesson.title}
        </Link>
      ) : (
        <Link
          to={`/curso/modulo/${module.id}`}
          className="flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Visão do módulo
        </Link>
      )}
      {nextLesson ? (
        <Link
          to={`/curso/modulo/${module.id}/aula/${nextLesson.id}`}
          className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-white transition-all hover:bg-volt hover:text-ink"
          data-testid="lesson-next"
        >
          Próxima: {nextLesson.title} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <Link
          to={`/curso/modulo/${module.id}`}
          className="flex items-center gap-2 rounded-full bg-volt px-6 py-3 font-display text-sm font-extrabold text-ink transition-all hover:-translate-y-0.5"
          data-testid="lesson-next"
        >
          <CheckCircle2 className="h-4 w-4" /> Voltar ao módulo
        </Link>
      )}
    </div>
  );
}
