import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle2, Loader2, FileCheck2 } from "lucide-react";
import { Reveal, EASE } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setError("");
    try {
      await axios.post(`${API}/leads`, { email: email.trim(), source: "checklist" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err.response?.status === 422
          ? "Digite um e-mail válido para receber o checklist."
          : "Algo deu errado. Tente novamente em alguns instantes."
      );
    }
  };

  return (
    <section id="checklist" className="scroll-mt-20 bg-volt py-16 sm:py-24 lg:py-28" data-testid="lead-magnet-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
              <FileCheck2 className="h-4 w-4" />
              Material gratuito
            </span>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Quer começar de graça?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
              Baixe o <strong className="text-ink">Checklist de Estudos ONEE</strong> e descubra os
              principais assuntos que você deve revisar.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-3xl border-2 border-ink bg-white p-7 shadow-[10px_10px_0_0_#0B0F17] sm:p-9">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex flex-col items-center py-6 text-center"
                    data-testid="lead-success-message"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-volt">
                      <CheckCircle2 className="h-9 w-9 text-ink" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-extrabold text-ink sm:text-2xl">
                      Pronto! Confira seu e-mail para acessar o material.
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 sm:text-base">
                      Se não encontrar, verifique a caixa de spam.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={submit}
                    className="flex flex-col gap-4"
                    data-testid="lead-form"
                  >
                    <label htmlFor="lead-email" className="font-display text-base font-bold text-ink">
                      Receba o checklist no seu e-mail
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu melhor e-mail"
                      data-testid="lead-email-input"
                      className="w-full rounded-xl border-2 border-slate-200 bg-paper px-5 py-4 text-base text-ink outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-ink"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      data-testid="lead-submit-button"
                      className="group flex items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 font-display text-base font-extrabold text-volt transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_rgba(11,15,23,0.25)] active:translate-y-0 active:scale-[0.98] disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          QUERO O CHECKLIST
                          <Zap className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" fill="currentColor" />
                        </>
                      )}
                    </button>
                    {status === "error" && (
                      <p className="text-sm font-medium text-red-600" data-testid="lead-error-message">
                        {error}
                      </p>
                    )}
                    <p className="text-xs leading-relaxed text-slate-500">
                      Sem spam. Seu e-mail fica guardado com segurança e você pode sair da lista
                      quando quiser.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
