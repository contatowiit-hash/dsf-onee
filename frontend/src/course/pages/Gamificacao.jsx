import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { TOTAL_LESSONS } from "@/course/data/modules";
import { LEVELS, levelFor, XP_RULES } from "@/course/data/gamification";
import CountUp from "@/components/CountUp";
import { Gamepad2, Zap, BookOpen, Timer, Star, Award, Check } from "lucide-react";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 24 } },
};

export default function Gamificacao() {
  const { progress } = useOutletContext();
  const xp = progress?.xp ?? 0;
  const completed = progress?.completed_lessons?.length ?? 0;
  const simulados = progress?.simulados?.length ?? 0;
  const { current, next, pct, index } = levelFor(xp);

  const achievements = [
    { icon: BookOpen, label: "Primeira aula", desc: "Conclua sua primeira aula", unlocked: completed >= 1 },
    { icon: Zap, label: "Aquecimento", desc: "Conclua 5 atividades", unlocked: completed >= 5 },
    { icon: Star, label: "Dedicação total", desc: "Conclua 15 atividades", unlocked: completed >= 15 },
    { icon: Timer, label: "Primeiro simulado", desc: "Finalize um simulado", unlocked: simulados >= 1 },
    { icon: Gamepad2, label: "Nível Gerador", desc: "Acumule 300 XP", unlocked: xp >= 300 },
    { icon: Award, label: "Preparação completa", desc: "Conclua todos os módulos", unlocked: completed >= TOTAL_LESSONS },
  ];

  return (
    <div className="space-y-10" data-testid="gamificacao-page">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Gamificação
        </h1>
        <p className="mt-1 text-muted-foreground">Seu XP, nível e conquistas de estudo.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="rounded-2xl bg-ink p-6 text-white sm:p-8"
        data-testid="level-card"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-volt">Seu nível</p>
            <p className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {current.name}
            </p>
          </div>
          <p className="font-display text-2xl font-extrabold text-volt sm:text-3xl" data-testid="xp-total">
            <CountUp value={xp} suffix=" XP" />
          </p>
        </div>
        <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 45, damping: 16, delay: 0.35 }}
            className="h-full rounded-full bg-volt"
          />
        </div>
        <p className="mt-2 text-sm text-slate-400">
          {next ? `Faltam ${next.xp - xp} XP para ${next.name}` : "Nível máximo alcançado!"}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {LEVELS.map((l, i) => (
            <div
              key={l.name}
              className={`rounded-xl border px-3 py-2.5 text-center ${
                i <= index ? "border-volt bg-volt/10" : "border-white/10"
              }`}
            >
              <p className={`flex items-center justify-center gap-1 text-xs font-bold ${i <= index ? "text-volt" : "text-slate-500"}`}>
                {i <= index && <Check className="h-3 w-3" strokeWidth={3} />}
                Nv. {i + 1}
              </p>
              <p className={`mt-0.5 truncate text-xs ${i <= index ? "text-white" : "text-slate-500"}`}>{l.name}</p>
              <p className="font-mono text-[10px] text-slate-500">{l.xp} XP</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div>
        <h2 className="font-display text-lg font-bold text-foreground">Como ganhar XP</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {XP_RULES.map((rule) => (
            <div key={rule.desc} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-display text-lg font-extrabold text-foreground">{rule.xp}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{rule.desc}</p>
            </div>
          ))}
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
