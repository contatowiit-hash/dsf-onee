import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { EASE } from "@/components/Reveal";

const LINKS = [
  { label: "Problema", href: "#problema", testid: "nav-link-problema" },
  { label: "Como Funciona", href: "#como-funciona", testid: "nav-link-como-funciona" },
  { label: "Conteúdo", href: "#conteudo", testid: "nav-link-conteudo" },
  { label: "Oferta", href: "#oferta", testid: "nav-link-oferta" },
  { label: "FAQ", href: "#faq", testid: "nav-link-faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, login } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#topo" data-testid="nav-logo" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink">
            <Zap className="h-5 w-5 text-volt" fill="currentColor" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            DESAFIO <span className="text-slate-400">ONEE</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={link.testid}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          {user ? (
            <Link
              to="/curso"
              data-testid="nav-area-button"
              className="group flex items-center gap-2 rounded-full bg-volt px-5 py-2.5 font-display text-sm font-bold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-bolt active:translate-y-0 active:scale-[0.97]"
            >
              <LayoutDashboard className="h-4 w-4" />
              ÁREA DO ALUNO
            </Link>
          ) : (
            <>
              <button
                onClick={login}
                data-testid="nav-login-button"
                className="flex items-center gap-2 rounded-full px-4 py-2.5 font-display text-sm font-bold text-ink transition-colors hover:bg-slate-100"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </button>
              <a
                href="#oferta"
                data-testid="nav-cta-button"
                className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-volt hover:text-ink active:translate-y-0 active:scale-[0.97]"
              >
                QUERO COMEÇAR
                <Zap className="h-4 w-4 text-volt transition-colors duration-200 group-hover:text-ink" fill="currentColor" />
              </a>
            </>
          )}
        </div>

        <button
          data-testid="nav-mobile-menu-button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-testid={`nav-mobile-${link.testid}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 font-display text-base font-bold text-ink transition-colors hover:bg-slate-100"
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <Link
                  to="/curso"
                  data-testid="nav-mobile-area-button"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-volt px-5 py-3.5 font-display text-sm font-bold text-ink"
                >
                  <LayoutDashboard className="h-4 w-4" /> ÁREA DO ALUNO
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setOpen(false);
                      login();
                    }}
                    data-testid="nav-mobile-login-button"
                    className="mt-2 flex items-center justify-center gap-2 rounded-full border-2 border-ink px-5 py-3.5 font-display text-sm font-bold text-ink"
                  >
                    <LogIn className="h-4 w-4" /> ENTRAR COM GOOGLE
                  </button>
                  <a
                    href="#oferta"
                    data-testid="nav-mobile-cta-button"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 font-display text-sm font-bold text-volt"
                  >
                    QUERO COMEÇAR <Zap className="h-4 w-4" fill="currentColor" />
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
