import { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Zap, Lightbulb, Flame, Sun, Wind, Droplets, Sprout, Fuel, Mountain, Atom,
  Car, Smartphone, ShowerHead, BatteryCharging, PersonStanding, Volume2,
  Thermometer, Plug, Factory, Apple, ArrowRight, ArrowDown, Check, X,
  CheckCircle2, AlertTriangle, RotateCcw, GraduationCap, Power,
} from "lucide-react";

const ICONS = {
  zap: Zap, bulb: Lightbulb, flame: Flame, sun: Sun, wind: Wind, water: Droplets,
  plant: Sprout, oil: Fuel, coal: Mountain, atom: Atom, car: Car, phone: Smartphone,
  shower: ShowerHead, battery: BatteryCharging, run: PersonStanding, sound: Volume2,
  heat: Thermometer, plug: Plug, factory: Factory, food: Apple,
};

export const BlockIcon = ({ name, className = "h-5 w-5" }) => {
  const C = ICONS[name] ?? Zap;
  return <C className={className} />;
};

const SectionTitle = ({ children }) => (
  <h3 className="font-display text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
    {children}
  </h3>
);

/* ---------- Blocos de conteúdo ---------- */

export const IntroBlock = ({ text }) => (
  <p className="border-l-4 border-volt pl-5 font-display text-lg font-medium leading-relaxed text-foreground sm:text-xl">
    {text}
  </p>
);

export const TextBlock = ({ text }) => (
  <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">{text}</p>
);

export const ConceptBlock = ({ term, paragraphs }) => (
  <div className="rounded-2xl bg-ink p-6 text-white sm:p-8">
    <p className="font-display text-xl font-extrabold leading-snug text-volt sm:text-2xl">{term}</p>
    <div className="mt-4 space-y-3">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-sm leading-relaxed text-slate-300 sm:text-base">{p}</p>
      ))}
    </div>
  </div>
);

export const LawBlock = ({ title, statement, explanation }) => (
  <div className="rounded-2xl border-2 border-ink bg-volt/15 p-6 sm:p-8">
    <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
    <p className="mt-3 font-display text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
      {statement}
    </p>
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{explanation}</p>
  </div>
);

export const ExamplesBlock = ({ title, items, footnote }) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    <ul className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt text-ink">
            <BlockIcon name={item.icon} />
          </span>
          <span className="text-base text-foreground/90 sm:text-lg">{item.text}</span>
        </li>
      ))}
    </ul>
    {footnote && <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{footnote}</p>}
  </div>
);

export const UnitsBlock = ({ items, note }) => (
  <div>
    <SectionTitle>Em que medimos a energia?</SectionTitle>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {items.map((u) => (
        <div key={u.name} className="rounded-2xl border border-border bg-card p-5">
          <p className="font-display text-lg font-extrabold text-foreground">{u.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90 sm:text-base">{u.what}</p>
          <p className="mt-3 rounded-xl bg-secondary p-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {u.example}
          </p>
        </div>
      ))}
    </div>
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{note}</p>
  </div>
);

export const CompareBlock = ({ left, right, note }) => (
  <div>
    <div className="grid gap-4 sm:grid-cols-2">
      {[left, right].map((side, i) => (
        <div
          key={i}
          className={`rounded-2xl p-6 ${i === 0 ? "border border-border bg-card" : "bg-ink text-white"}`}
        >
          <p className={`font-mono text-xs font-bold uppercase tracking-widest ${i === 0 ? "text-muted-foreground" : "text-volt"}`}>
            {side.title}
          </p>
          <p className={`mt-3 text-base leading-relaxed ${i === 0 ? "text-foreground/90" : "text-slate-300"}`}>
            {side.text}
          </p>
          <p className={`mt-3 rounded-xl p-3 text-sm font-medium ${i === 0 ? "bg-secondary text-foreground" : "bg-white/10 text-volt"}`}>
            {side.example}
          </p>
        </div>
      ))}
    </div>
    <p className="mt-4 rounded-xl bg-volt/20 p-4 text-sm font-semibold text-foreground sm:text-base">{note}</p>
  </div>
);

export const FormGridBlock = ({ title, forms }) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {forms.map((f) => (
        <div key={f.name} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt text-ink">
            <BlockIcon name={f.icon} />
          </span>
          <div>
            <p className="font-display text-base font-extrabold text-foreground">{f.name}</p>
            <p className="text-sm text-foreground/90">{f.def}</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{f.example}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Animações educativas ---------- */

export const FlowBlock = ({ title, steps, note }) => (
  <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
    <SectionTitle>{title}</SectionTitle>
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
      {steps.map((step, i) => (
        <Fragment key={i}>
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 0 0 rgba(204,255,0,0)",
                "0 0 0 8px rgba(204,255,0,0.35)",
                "0 0 0 0 rgba(204,255,0,0)",
              ],
            }}
            transition={{ duration: steps.length * 0.7, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            className="flex min-w-[6.5rem] flex-col items-center gap-2 rounded-2xl border border-border bg-background px-4 py-4 text-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt text-ink">
              <BlockIcon name={step.icon} />
            </span>
            <span className="text-xs font-semibold leading-tight text-foreground sm:text-sm">{step.label}</span>
          </motion.div>
          {i < steps.length - 1 && <ArrowRight className="h-5 w-5 shrink-0 rotate-90 text-volt sm:rotate-0" strokeWidth={3} />}
        </Fragment>
      ))}
    </div>
    {note && <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">{note}</p>}
  </div>
);

export const LampDemo = () => {
  const [on, setOn] = useState(false);
  return (
    <div className="rounded-2xl bg-ink p-6 text-center text-white sm:p-8">
      <SectionTitle>
        <span className="text-white">Experimente: ligue a lâmpada</span>
      </SectionTitle>
      <div className="mt-8 flex items-center justify-center gap-5 sm:gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${on ? "bg-volt text-ink" : "bg-white/10 text-slate-400"}`}>
            <Zap className="h-6 w-6" fill={on ? "currentColor" : "none"} />
          </span>
          <span className="text-[11px] text-slate-400">tomada</span>
        </div>
        <div className="relative h-0.5 w-14 overflow-hidden rounded bg-white/15 sm:w-24">
          {on && (
            <motion.span
              className="absolute top-0 h-full w-5 rounded bg-volt"
              animate={{ x: [-20, 96] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <motion.span
            animate={on ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={on ? { duration: 1.4, repeat: Infinity } : {}}
            className={`flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500 ${
              on ? "bg-volt text-ink shadow-[0_0_70px_18px_rgba(204,255,0,0.45)]" : "bg-white/10 text-slate-500"
            }`}
          >
            <Lightbulb className="h-10 w-10" fill={on ? "currentColor" : "none"} />
          </motion.span>
          <span className="text-[11px] text-slate-400">lâmpada</span>
        </div>
        <div className="flex flex-col gap-3">
          <motion.span
            animate={on ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.15 }}
            transition={on ? { duration: 1.2, repeat: Infinity } : {}}
            className="flex flex-col items-center gap-1 text-volt"
          >
            <Sun className="h-6 w-6" />
            <span className="text-[11px] text-slate-400">luz</span>
          </motion.span>
          <motion.span
            animate={on ? { opacity: [0.4, 1, 0.4], y: [0, -3, 0] } : { opacity: 0.15 }}
            transition={on ? { duration: 1.5, repeat: Infinity, delay: 0.4 } : {}}
            className="flex flex-col items-center gap-1 text-orange-400"
          >
            <Flame className="h-6 w-6" />
            <span className="text-[11px] text-slate-400">calor</span>
          </motion.span>
        </div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`mt-8 inline-flex items-center gap-2.5 rounded-full px-7 py-3 font-display text-sm font-extrabold transition-all duration-200 active:scale-95 ${
          on ? "bg-volt text-ink" : "bg-white/10 text-white hover:bg-white/20"
        }`}
        data-testid="lamp-demo-toggle"
      >
        <Power className="h-4 w-4" />
        {on ? "Desligar" : "Ligar"}
      </button>
      <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-slate-400 sm:text-sm">
        {on
          ? "A energia elétrica está se transformando em luz (luminosa) e calor (térmica) — agora mesmo, na sua frente."
          : "Aperte o botão e observe o que acontece com a energia."}
      </p>
    </div>
  );
};

/* ---------- Blocos interativos (exigem ação para avançar) ---------- */

const OptionButton = ({ label, state, onClick, disabled, testid }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    data-testid={testid}
    className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all sm:text-base ${
      state === "correct"
        ? "border-volt bg-volt/25 text-foreground"
        : state === "wrong"
          ? "border-red-400 bg-red-500/10 text-foreground"
          : state === "chosen"
            ? "border-foreground bg-secondary text-foreground"
            : "border-border bg-card text-foreground/90 hover:border-foreground/50"
    } ${disabled ? "cursor-default" : ""}`}
  >
    <span className="flex items-center justify-between gap-3">
      {label}
      {state === "correct" && <Check className="h-4 w-4 shrink-0 text-[#65a30d]" strokeWidth={3} />}
      {state === "wrong" && <X className="h-4 w-4 shrink-0 text-red-500" strokeWidth={3} />}
    </span>
  </button>
);

const Feedback = ({ ok, why, onRetry, context }) => (
  <div
    className={`mt-4 rounded-xl p-4 ${ok ? "bg-volt/20" : "border border-red-400/40 bg-red-500/5"}`}
    data-testid={ok ? "feedback-correct" : "feedback-wrong"}
  >
    <p className="flex items-center gap-2 text-sm font-bold text-foreground">
      {ok ? <CheckCircle2 className="h-4 w-4 text-[#65a30d]" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
      {ok ? "Isso mesmo!" : "Ainda não — olha o porquê:"}
    </p>
    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{why}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {!ok && onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-full border border-foreground/30 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-secondary"
          data-testid="feedback-retry"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Tentar novamente
        </button>
      )}
      {!ok && context && (
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-professor", { detail: { context } }))}
          className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold text-volt transition-transform hover:scale-105"
          data-testid="feedback-ask-professor"
        >
          <GraduationCap className="h-3.5 w-3.5" /> Perguntar ao Professor
        </button>
      )}
    </div>
  </div>
);

export const MiniChallengeBlock = ({ q, options, answer, why, onDone }) => {
  const [chosen, setChosen] = useState(null);
  const correct = chosen === answer;

  return (
    <div className="rounded-2xl border-2 border-dashed border-foreground/25 p-6 sm:p-7">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">Mini desafio</p>
      <p className="mt-3 font-display text-base font-bold leading-snug text-foreground sm:text-lg">{q}</p>
      <div className="mt-4 grid gap-2.5">
        {options.map((opt, i) => (
          <OptionButton
            key={i}
            label={opt}
            testid={`minichallenge-opt-${i}`}
            disabled={correct}
            state={chosen === null ? "idle" : i === answer && chosen !== null && correct ? "correct" : chosen === i ? "wrong" : "idle"}
            onClick={() => {
              setChosen(i);
              if (i === answer) onDone();
            }}
          />
        ))}
      </div>
      {chosen !== null && (
        <Feedback
          ok={correct}
          why={why}
          context={`Mini desafio: ${q} | Alternativas: ${options.join(" / ")}`}
          onRetry={() => setChosen(null)}
        />
      )}
    </div>
  );
};

export const IdentifyBlock = ({ title, rounds, onDone }) => {
  const [round, setRound] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const current = rounds[round];
  const correct = chosen === current.answer;
  const isLast = round === rounds.length - 1;

  const next = () => {
    if (isLast) {
      onDone();
      setRound(rounds.length);
      return;
    }
    setChosen(null);
    setRound(round + 1);
  };

  if (round >= rounds.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8" data-testid="identify-done">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#65a30d]" />
        <p className="mt-3 font-display text-lg font-extrabold text-foreground">
          Você acertou {score} de {rounds.length} situações
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Identificar formas de energia é questão certa na prova.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <SectionTitle>{title}</SectionTitle>
        <span className="shrink-0 font-mono text-xs font-bold text-muted-foreground">
          {round + 1}/{rounds.length}
        </span>
      </div>
      <p className="mt-4 rounded-xl bg-secondary p-4 font-display text-base font-bold leading-snug text-foreground sm:text-lg" data-testid="identify-situation">
        {current.situation}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {current.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={opt}
            testid={`identify-r${round}-opt-${i}`}
            disabled={correct}
            state={chosen === null ? "idle" : correct && i === current.answer ? "correct" : chosen === i ? "wrong" : "idle"}
            onClick={() => {
              if (chosen !== null && chosen !== current.answer) return;
              setChosen(i);
              if (i === current.answer) setScore((s) => s + 1);
            }}
          />
        ))}
      </div>
      {chosen !== null && (
        <>
          <Feedback
            ok={correct}
            why={current.why}
            context={`Identifique a forma de energia: ${current.situation} | Opções: ${current.options.join(" / ")}`}
            onRetry={() => setChosen(null)}
          />
          {correct && (
            <button
              onClick={next}
              className="mt-4 rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-white transition-all hover:bg-volt hover:text-ink"
              data-testid="identify-next"
            >
              {isLast ? "Concluir atividade" : "Próxima situação"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export const PickerBlock = ({ title, sources }) => {
  const [selected, setSelected] = useState(null);
  const current = sources.find((s) => s.name === selected);

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {sources.map((s) => (
          <button
            key={s.name}
            onClick={() => setSelected(s.name)}
            data-testid={`picker-${s.name.toLowerCase()}`}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 transition-all duration-200 ${
              selected === s.name
                ? "border-foreground bg-ink text-white"
                : "border-border bg-card text-foreground hover:border-foreground/40"
            }`}
          >
            <BlockIcon name={s.icon} className="h-6 w-6" />
            <span className="font-display text-sm font-bold">{s.name}</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                s.tag === "Renovável" ? "bg-volt text-ink" : "bg-red-500/15 text-red-500"
              }`}
            >
              {s.tag}
            </span>
          </button>
        ))}
      </div>
      {current && (
        <motion.div
          key={current.name}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-4 rounded-2xl border border-border bg-card p-6"
          data-testid="picker-detail"
        >
          <p className="font-display text-lg font-extrabold text-foreground">{current.name}</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
            <p className="text-foreground/90"><strong className="text-foreground">O que é:</strong> {current.what}</p>
            <p className="text-foreground/90"><strong className="text-foreground">Como funciona:</strong> {current.how}</p>
            <p className="text-foreground/90"><strong className="text-foreground">Onde é usada:</strong> {current.where}</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#65a30d]">Vantagens</p>
              <ul className="mt-2 space-y-1.5">
                {current.pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#65a30d]" strokeWidth={3} /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-red-500">Limitações e impactos</p>
              <ul className="mt-2 space-y-1.5">
                {current.cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-foreground/90">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ---------- Blocos de revisão ---------- */

export const KeyPointsBlock = ({ title, items }) => (
  <div className="rounded-2xl border-2 border-ink bg-card p-6 sm:p-8">
    <SectionTitle>{title}</SectionTitle>
    <ul className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-volt font-mono text-xs font-bold text-ink">
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed text-foreground/90 sm:text-base">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const MapBlock = ({ nodes }) => (
  <div className="mx-auto max-w-md">
    {nodes.map((node, i) => (
      <Fragment key={i}>
        <div
          className={`rounded-2xl p-5 text-center ${
            i === 0 ? "bg-ink text-white" : "border border-border bg-card"
          }`}
        >
          <p className={`font-display text-base font-extrabold sm:text-lg ${i === 0 ? "text-volt" : "text-foreground"}`}>
            {node.title}
          </p>
          <p className={`mt-1 text-xs sm:text-sm ${i === 0 ? "text-slate-400" : "text-muted-foreground"}`}>
            {node.desc}
          </p>
        </div>
        {i < nodes.length - 1 && (
          <div className="flex justify-center py-1">
            <ArrowDown className="h-5 w-5 text-volt" strokeWidth={3} />
          </div>
        )}
      </Fragment>
    ))}
  </div>
);

export const MistakesBlock = ({ title, items }) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    <div className="mt-4 space-y-4">
      {items.map((item, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-border">
          <p className="flex items-start gap-2.5 bg-red-500/10 p-4 text-sm text-foreground/90 sm:text-base">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" strokeWidth={3} />
            <span>{item.wrong}</span>
          </p>
          <p className="flex items-start gap-2.5 bg-volt/15 p-4 text-sm font-medium text-foreground sm:text-base">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#65a30d]" strokeWidth={3} />
            <span>{item.right}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const QuickCheckBlock = ({ title, questions, onDone }) => {
  const [answers, setAnswers] = useState({});
  const doneRef = useRef(false);
  const allCorrect = questions.every((q, i) => answers[i] === q.answer);

  useEffect(() => {
    if (allCorrect && !doneRef.current) {
      doneRef.current = true;
      onDone();
    }
  }, [allCorrect, onDone]);

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-4 space-y-4">
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          const correct = chosen === q.answer;
          return (
            <div key={qi} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-bold text-foreground sm:text-base">{q.q}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => (
                  <OptionButton
                    key={oi}
                    label={opt}
                    testid={`quickcheck-q${qi}-opt${oi}`}
                    disabled={correct}
                    state={chosen === undefined ? "idle" : correct && oi === q.answer ? "correct" : chosen === oi ? "wrong" : "idle"}
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                  />
                ))}
              </div>
              {chosen !== undefined && !correct && (
                <p className="mt-3 text-sm text-foreground/80">
                  <strong>Não é bem assim:</strong> {q.why}{" "}
                  <button
                    className="font-bold underline"
                    onClick={() => setAnswers((a) => { const c = { ...a }; delete c[qi]; return c; })}
                  >
                    tentar de novo
                  </button>
                </p>
              )}
              {correct && (
                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#4d7c0f]">
                  <CheckCircle2 className="h-4 w-4" /> {q.why}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ChecklistBlock = ({ title, items, onDone }) => {
  const [checked, setChecked] = useState({});
  const allChecked = items.every((_, i) => checked[i]);

  return (
    <div className="rounded-2xl border-2 border-dashed border-foreground/25 p-6 sm:p-7">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-4 space-y-2.5">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              const next = { ...checked, [i]: !checked[i] };
              setChecked(next);
              if (items.every((_, j) => next[j])) onDone();
            }}
            className="flex w-full items-center gap-3.5 rounded-xl border border-border bg-card px-4 py-3.5 text-left transition-colors hover:border-foreground/40"
            data-testid={`checklist-item-${i}`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                checked[i] ? "border-volt bg-volt" : "border-foreground/30"
              }`}
            >
              {checked[i] && <Check className="h-4 w-4 text-ink" strokeWidth={3.5} />}
            </span>
            <span className={`text-sm font-medium sm:text-base ${checked[i] ? "text-foreground" : "text-muted-foreground"}`}>
              {item}
            </span>
          </button>
        ))}
      </div>
      {!allChecked && (
        <p className="mt-4 text-xs text-muted-foreground sm:text-sm">
          Marque tudo o que você realmente domina para concluir a revisão.
        </p>
      )}
    </div>
  );
};

/* ---------- Dispatcher ---------- */

export const INTERACTIVE_TYPES = new Set(["minichallenge", "identify", "quickcheck", "checklist"]);

export function LessonBlock({ block, onDone }) {
  switch (block.type) {
    case "intro": return <IntroBlock {...block} />;
    case "text": return <TextBlock {...block} />;
    case "concept": return <ConceptBlock {...block} />;
    case "law": return <LawBlock {...block} />;
    case "examples": return <ExamplesBlock {...block} />;
    case "units": return <UnitsBlock {...block} />;
    case "compare": return <CompareBlock {...block} />;
    case "formgrid": return <FormGridBlock {...block} />;
    case "flow": return <FlowBlock {...block} />;
    case "lampdemo": return <LampDemo />;
    case "picker": return <PickerBlock {...block} />;
    case "keypoints": return <KeyPointsBlock {...block} />;
    case "map": return <MapBlock {...block} />;
    case "mistakes": return <MistakesBlock {...block} />;
    case "minichallenge": return <MiniChallengeBlock {...block} onDone={onDone} />;
    case "identify": return <IdentifyBlock {...block} onDone={onDone} />;
    case "quickcheck": return <QuickCheckBlock {...block} onDone={onDone} />;
    case "checklist": return <ChecklistBlock {...block} onDone={onDone} />;
    default: return null;
  }
}
