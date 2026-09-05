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

export const Chapter = ({ label, dark = false }) => (
  <div className="flex items-center gap-2.5" data-testid={`chapter-${label.toLowerCase().replace(/\s+/g, "-")}`}>
    <span className="h-2.5 w-2.5 rounded-[3px] bg-volt ring-1 ring-ink/10" />
    <span className={`text-sm font-semibold ${dark ? "text-slate-400" : "text-slate-500"}`}>
      {label}
    </span>
  </div>
);
