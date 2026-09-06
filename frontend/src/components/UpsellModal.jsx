import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Check, GraduationCap, LogIn } from "lucide-react";
import { EASE } from "@/components/Reveal";
import { useAuth } from "@/context/AuthContext";

const CHECKOUT_ESSENCIAL = "https://pay.hotmart.com/placeholder-desafio-onee-essencial";
const CHECKOUT_COMPLETO = "https://pay.hotmart.com/placeholder-desafio-onee-completo";

const ESSENCIAL_ITEMS = [
  "Aulas objetivas",
  "Material de revisão",
  "Banco de questões",
  "Simulados",
  "Gabaritos comentados",
];

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};
const listItem = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function UpsellModal({ open, onClose }) {
  const { user, login } = useAuth();

  const goCheckout = (url) => {
    if (!user) {
      onClose();
      login();
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          data-testid="upsell-modal"
        >
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 27 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-paper p-6 text-ink sm:rounded-3xl sm:p-9"
          >
            <button
              onClick={onClose}
              data-testid="upsell-close-button"
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-ink transition-colors hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500"
            >
              Antes de finalizar
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, type: "spring", stiffness: 220, damping: 22 }}
              className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              Como você quer se preparar?
            </motion.h3>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, type: "spring", stiffness: 240, damping: 24 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
              >
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Essencial
                </p>
                <motion.p
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-3 font-display text-4xl font-extrabold tracking-tight"
                >
                  R$ 19<span className="text-2xl">,90</span>
                </motion.p>
                <motion.ul variants={listContainer} initial="hidden" animate="show" className="mt-5 flex flex-col gap-2.5">
                  {ESSENCIAL_ITEMS.map((item) => (
                    <motion.li key={item} variants={listItem} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Check className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={3} />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => goCheckout(CHECKOUT_ESSENCIAL)}
                  data-testid="upsell-essential-button"
                  className="mt-7 flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3.5 font-display text-sm font-extrabold text-ink transition-colors duration-200 hover:bg-ink hover:text-volt"
                >
                  CONTINUAR COM ESSENCIAL
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, type: "spring", stiffness: 240, damping: 24 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "8px 8px 0 0 #CCFF00",
                      "8px 8px 0 0 #CCFF00, 0 0 34px 2px rgba(204,255,0,0.35)",
                      "8px 8px 0 0 #CCFF00",
                    ],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-full flex-col rounded-2xl border-2 border-ink bg-ink p-6 text-white"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.55, type: "spring", stiffness: 380, damping: 15 }}
                    className="absolute -top-3.5 left-6 rounded-full bg-volt px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink"
                  >
                    Recomendado
                  </motion.span>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-volt">
                    Completo
                  </p>
                  <motion.p
                    initial={{ opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-3 font-display text-4xl font-extrabold tracking-tight text-volt"
                  >
                    R$ 27<span className="text-2xl">,93</span>
                  </motion.p>
                  <motion.ul variants={listContainer} initial="hidden" animate="show" className="mt-5 flex flex-col gap-2.5">
                    <motion.li variants={listItem} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <Check className="h-4 w-4 shrink-0 text-volt" strokeWidth={3} />
                      Tudo do plano Essencial
                    </motion.li>
                    <motion.li variants={listItem} className="flex items-start gap-2.5 rounded-xl bg-volt/10 p-3 text-sm font-semibold text-volt">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" />
                      Professor IA 24h para tirar todas as suas dúvidas de energia e eficiência
                      energética
                    </motion.li>
                  </motion.ul>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => goCheckout(CHECKOUT_COMPLETO)}
                    data-testid="upsell-complete-button"
                    className="group mt-7 flex items-center justify-center gap-2 rounded-full bg-volt px-6 py-3.5 font-display text-sm font-extrabold text-ink transition-colors duration-200 hover:bg-bolt"
                  >
                    QUERO O COMPLETO
                    <Zap className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" fill="currentColor" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="mt-6 text-center text-xs text-slate-500">
                Pagamento único • 7 dias de garantia incondicional nos dois planos
              </p>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                <LogIn className="h-3.5 w-3.5" />
                Antes de pagar, você se identifica com sua conta Google.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
