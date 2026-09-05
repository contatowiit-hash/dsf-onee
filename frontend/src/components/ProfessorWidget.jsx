import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X, Send, Loader2 } from "lucide-react";
import { EASE } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUGGESTIONS = [
  "O que é kWh?",
  "Como economizar energia em casa?",
  "O que é eficiência energética?",
];

export default function ProfessorWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Olá! Eu sou o Professor IA do Desafio ONEE. Me pergunte qualquer coisa sobre energia e eficiência energética!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    const openFromSidebar = () => setOpen(true);
    window.addEventListener("open-professor", openFromSidebar);
    return () => window.removeEventListener("open-professor", openFromSidebar);
  }, []);

  const send = async (preset) => {
    const msg = (preset ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/professor`, { message: msg, session_id: sessionId });
      setSessionId(data.session_id);
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Ops! Tive um problema para responder agora. Tente de novo em alguns segundos." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.5, ease: EASE }}
        onClick={() => setOpen(!open)}
        data-testid="professor-widget-button"
        aria-label="Falar com o Professor IA"
        className="pulse-glow fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-ink text-volt transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <GraduationCap className="h-7 w-7" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-[5.5rem] right-4 z-[70] flex h-[30rem] max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-[10px_10px_0_0_#0B0F17] sm:right-6"
            data-testid="professor-panel"
          >
            <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-volt">
                <GraduationCap className="h-5 w-5 text-ink" />
              </span>
              <div>
                <p className="font-display text-sm font-extrabold leading-tight">Professor IA</p>
                <p className="text-[11px] text-slate-400">Demonstração • incluso no plano Completo</p>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4" data-testid="professor-messages">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-ink text-white"
                        : "rounded-bl-md border border-slate-200 bg-white text-ink"
                    }`}
                  >
                    {m.content}
                  </p>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <p className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" /> pensando...
                  </p>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-paper px-4 py-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-ink hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t-2 border-ink bg-white p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua dúvida..."
                data-testid="professor-input"
                className="min-w-0 flex-1 rounded-full border border-slate-200 bg-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-ink"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                data-testid="professor-send-button"
                aria-label="Enviar pergunta"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-volt transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
