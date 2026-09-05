import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, LogOut } from "lucide-react";

export default function Configuracoes() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="space-y-8" data-testid="configuracoes-page">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Configurações
        </h1>
        <p className="mt-1 text-muted-foreground">Sua conta e preferências.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6" data-testid="account-card">
        <p className="font-display text-base font-bold text-foreground">Conta</p>
        <div className="mt-4 flex items-center gap-4">
          {user?.picture ? (
            <img src={user.picture} alt="" className="h-14 w-14 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-volt font-display text-xl font-extrabold text-ink">
              {user?.name?.[0] ?? "?"}
            </span>
          )}
          <div>
            <p className="font-display text-base font-bold text-foreground">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="mt-1 text-xs text-muted-foreground">Conta Google verificada</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="font-display text-base font-bold text-foreground">Aparência</p>
        <button
          onClick={toggle}
          className="mt-4 flex w-full items-center justify-between rounded-xl border border-border px-5 py-4 transition-colors hover:border-foreground/40"
          data-testid="settings-theme-toggle"
        >
          <span className="flex items-center gap-3 text-sm font-medium text-foreground">
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            {theme === "dark" ? "Modo escuro ativado" : "Modo claro ativado"}
          </span>
          <span
            className={`relative h-6 w-11 rounded-full transition-colors ${theme === "dark" ? "bg-volt" : "bg-secondary"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                theme === "dark" ? "left-[1.375rem]" : "left-0.5"
              }`}
            />
          </span>
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2.5 rounded-full border border-red-400/60 px-6 py-3 text-sm font-bold text-red-500 transition-colors hover:bg-red-500/10"
        data-testid="settings-logout"
      >
        <LogOut className="h-4 w-4" /> Sair da conta
      </button>
    </div>
  );
}
