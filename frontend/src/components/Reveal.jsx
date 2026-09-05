import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.75, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Chapter = ({ index, label, dark = false }) => (
  <div className="flex items-center gap-3" data-testid={`chapter-${index}`}>
    <span
      className={`font-mono text-xs font-bold tracking-[0.25em] uppercase ${
        dark ? "text-volt" : "text-ink"
      }`}
    >
      {index}
    </span>
    <span className={`h-px w-10 ${dark ? "bg-volt/50" : "bg-ink/30"}`} />
    <span
      className={`font-mono text-xs font-bold tracking-[0.25em] uppercase ${
        dark ? "text-white/60" : "text-slate-500"
      }`}
    >
      {label}
    </span>
  </div>
);
