import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "@/course/api";
import { SIMULADO_QUESTIONS } from "@/course/data/content";
import { Timer, Play, Trophy, RotateCcw } from "lucide-react";

const DURATION = 10 * 60;

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function Simulado() {
  const { refreshProgress } = useOutletContext();
  const [phase, setPhase] = useState("idle");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(DURATION);
  const [score, setScore] = useState(null);
  const saved = useRef(false);

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(t);
          finish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const finish = async () => {
    const correct = SIMULADO_QUESTIONS.filter((q, i) => answers[i] === q.answer).length;
    setScore(correct);
    setPhase("done");
    if (!saved.current) {
      saved.current = true;
      try {
        await api.post("/progress/simulado", { score: correct, total: SIMULADO_QUESTIONS.length });
        await refreshProgress();
      } catch {
        /* resultado fica na tela mesmo assim */
      }
    }
  };

  const start = () => {
    saved.current = false;
    setAnswers({});
    setCurrent(0);
    setSeconds(DURATION);
    setScore(null);
    setPhase("running");
  };

  if (phase === "idle") {
    return (
      <div className="mx-auto max-w-lg space-y-6 text-center" data-testid="simulado-start">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-volt">
          <Timer className="h-8 w-8 text-ink" />
        </span>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Simulado ONEE
        </h1>
        <p className="text-muted-foreground">
          {SIMULADO_QUESTIONS.length} questões • {DURATION / 60} minutos • cada acerto vale 10 XP.
          Treine como se fosse o dia da prova.
        </p>
        <button
          onClick={start}
          className="inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 font-display text-base font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-volt hover:text-ink"
          data-testid="simulado-start-button"
        >
          <Play className="h-5 w-5" /> Começar simulado
        </button>
      </div>
    );
  }

  if (phase === "done") {
    const pctScore = Math.round((score / SIMULADO_QUESTIONS.length) * 100);
    return (
      <div className="mx-auto max-w-lg space-y-6 text-center" data-testid="simulado-result">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-volt">
          <Trophy className="h-8 w-8 text-ink" />
        </span>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Você acertou {score} de {SIMULADO_QUESTIONS.length}
        </h1>
        <p className="text-muted-foreground">
          {pctScore >= 70
            ? "Excelente ritmo! Continue assim."
            : pctScore >= 40
              ? "Bom começo. Revise os módulos e tente de novo."
              : "Hora de revisar o conteúdo — os flashcards podem ajudar."}
        </p>
        <p className="font-display text-lg font-bold text-foreground">+{score * 10} XP</p>
        <div className="space-y-3 pt-2 text-left">
          {SIMULADO_QUESTIONS.map((q, i) => (
            <div
              key={i}
              className={`rounded-xl border p-4 text-sm ${
                answers[i] === q.answer ? "border-volt bg-volt/10" : "border-red-400/50 bg-red-500/5"
              }`}
            >
              <p className="font-semibold text-foreground">
                {i + 1}. {q.q}
              </p>
              <p className="mt-1 text-muted-foreground">
                Resposta certa: <span className="font-medium text-foreground">{q.options[q.answer]}</span>
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={start}
          className="inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 font-display text-base font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-volt hover:text-ink"
          data-testid="simulado-restart-button"
        >
          <RotateCcw className="h-5 w-5" /> Refazer simulado
        </button>
      </div>
    );
  }

  const q = SIMULADO_QUESTIONS[current];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-2xl space-y-6" data-testid="simulado-running">
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-3.5">
        <p className="font-mono text-sm font-bold text-muted-foreground">
          Questão {current + 1}/{SIMULADO_QUESTIONS.length}
        </p>
        <p
          className={`flex items-center gap-2 font-mono text-sm font-bold ${seconds < 60 ? "text-red-500" : "text-foreground"}`}
          data-testid="simulado-timer"
        >
          <Timer className="h-4 w-4" /> {fmt(seconds)}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-display text-lg font-bold leading-snug text-foreground sm:text-xl">{q.q}</p>
        <div className="mt-6 grid gap-2.5">
          {q.options.map((opt, oi) => (
            <button
              key={oi}
              onClick={() => setAnswers((a) => ({ ...a, [current]: oi }))}
              className={`rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-colors sm:text-base ${
                answers[current] === oi
                  ? "border-foreground bg-secondary text-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
              data-testid={`simulado-q${current}-opt${oi}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-foreground disabled:opacity-40"
          data-testid="simulado-prev"
        >
          Anterior
        </button>
        {current < SIMULADO_QUESTIONS.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-white transition-all hover:bg-volt hover:text-ink"
            data-testid="simulado-next"
          >
            Próxima
          </button>
        ) : (
          <button
            onClick={finish}
            disabled={answeredCount < SIMULADO_QUESTIONS.length}
            className="rounded-full bg-volt px-6 py-3 font-display text-sm font-extrabold text-ink transition-all hover:-translate-y-0.5 disabled:opacity-40"
            data-testid="simulado-finish"
          >
            Finalizar ({answeredCount}/{SIMULADO_QUESTIONS.length})
          </button>
        )}
      </div>
    </div>
  );
}
