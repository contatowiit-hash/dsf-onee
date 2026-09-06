import { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { api } from "@/course/api";
import { MODULES, moduleProgress, isModuleUnlocked } from "@/course/data/modules";
import {
  Home, BookOpen, Layers, Timer, Gamepad2, Trophy, GraduationCap,
  Award, Settings, LogOut, Menu, X, Zap, Sun, Moon, Lock, CheckCircle2,
} from "lucide-react";

const SECTIONS = [
  {
    title: null,
    items: [{ to: "/curso", label: "Início", icon: Home, end: true, testid: "side-inicio" }],
  },
  {
    title: "Estudar",
    items: [
      { to: "/curso/modulos", label: "Conteúdo para estudar", icon: BookOpen, testid: "side-conteudo" },
      { to: "/curso/flashcards", label: "Flashcards", icon: Layers, testid: "side-flashcards" },
      { to: "/curso/simulado", label: "Fazer simulado", icon: Timer, testid: "side-simulado" },
    ],
  },
  {
    title: "Desafio",
    items: [
      { to: "/curso/gamificacao", label: "Gamificação", icon: Gamepad2, testid: "side-gamificacao" },
      { to: "/curso/ranking", label: "Ranking", icon: Trophy, testid: "side-ranking" },
    ],
  },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ${
    isActive ? "bg-volt text-ink" : "text-slate-400 hover:bg-white/5 hover:text-white"
  }`;

function SidebarBody({ progress, onNavigate }) {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const completed = progress?.completed_lessons ?? [];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex h-full flex-col">
      <Link to="/curso" onClick={onNavigate} className="flex items-center gap-2.5 px-2 pb-7 pt-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-volt">
          <Zap className="h-5 w-5 text-ink" fill="currentColor" />
        </span>
        <span className="font-display text-lg font-extrabold tracking-tight text-white">
          DESAFIO <span className="text-slate-500">ONEE</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
        {SECTIONS.map((section, i) => (
          <div key={i}>
            {section.title && (
              <p className="mb-2 px-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onNavigate}
                  className={linkClass}
                  data-testid={item.testid}
                >
                  <item.icon className="h-4.5 w-4.5 h-[18px] w-[18px] shrink-0" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        <div>
          <p className="mb-2 px-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Módulos
          </p>
          <div className="space-y-1">
            {MODULES.map((m, i) => {
              const pct = moduleProgress(m, completed);
              const unlocked = isModuleUnlocked(i, completed);
              return (
                <NavLink
                  key={m.id}
                  to={`/curso/modulo/${m.id}`}
                  onClick={unlocked ? onNavigate : (e) => e.preventDefault()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm transition-colors duration-150 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : unlocked
                          ? "text-slate-400 hover:bg-white/5 hover:text-white"
                          : "cursor-not-allowed text-slate-600"
                    }`
                  }
                  data-testid={`side-modulo-${m.id}`}
                >
                  <span className="font-mono text-xs text-slate-500">
                    {String(m.id).padStart(2, "0")}
                  </span>
                  <span className="flex-1 truncate">{m.title}</span>
                  {pct === 100 ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-volt" />
                  ) : !unlocked ? (
                    <Lock className="h-3.5 w-3.5 shrink-0" />
                  ) : null}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="space-y-1 border-t border-white/10 pt-4">
          <button
            onClick={() => {
              window.dispatchEvent(new Event("open-professor"));
              onNavigate?.();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-volt transition-colors hover:bg-white/5"
            data-testid="side-professor"
          >
            <GraduationCap className="h-[18px] w-[18px] shrink-0" />
            Professor IA
            {!user?.professor_access && (
              <span className="ml-auto flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                <Lock className="h-2.5 w-2.5" /> Completo
              </span>
            )}
          </button>
          <NavLink to="/curso/certificado" onClick={onNavigate} className={linkClass} data-testid="side-certificado">
            <Award className="h-[18px] w-[18px] shrink-0" />
            Meu certificado
          </NavLink>
          <NavLink to="/curso/configuracoes" onClick={onNavigate} className={linkClass} data-testid="side-configuracoes">
            <Settings className="h-[18px] w-[18px] shrink-0" />
            Configurações
          </NavLink>
        </div>
      </nav>

      <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
        <button
          onClick={toggle}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          data-testid="theme-toggle"
        >
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          {theme === "dark" ? "Modo claro" : "Modo escuro"}
        </button>
        <div className="flex items-center gap-3 px-2">
          {user?.picture ? (
            <img src={user.picture} alt="" className="h-9 w-9 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-volt font-display text-sm font-extrabold text-ink">
              {user?.name?.[0] ?? "?"}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            aria-label="Sair"
            className="text-slate-500 transition-colors hover:text-white"
            data-testid="logout-button"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CourseLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(null);

  const refreshProgress = async () => {
    try {
      const { data } = await api.get("/progress");
      setProgress(data);
    } catch {
      /* mantém o estado anterior */
    }
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="course-layout">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-ink px-4 py-6 lg:block">
        <SidebarBody progress={progress} />
      </aside>

      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
        <span className="flex items-center gap-2 font-display text-base font-extrabold text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-volt">
            <Zap className="h-4 w-4 text-ink" fill="currentColor" />
          </span>
          DESAFIO ONEE
        </span>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground"
          data-testid="course-menu-button"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-ink px-4 py-6 lg:hidden"
            >
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="absolute right-4 top-5 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarBody progress={progress} onNavigate={() => setMenuOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="px-4 py-8 sm:px-8 lg:pl-80 lg:pr-10">
        <div className="mx-auto max-w-4xl">
          <Outlet context={{ progress, refreshProgress }} />
        </div>
      </main>
    </div>
  );
}
