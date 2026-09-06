import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Check, RefreshCw, Loader2, Zap, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CHECKOUT_ESSENCIAL, CHECKOUT_COMPLETO } from "@/config/checkout";

const PLANS = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 19,90",
    url: CHECKOUT_ESSENCIAL,
    highlight: false,
    perks: [
      "Todos os 7 módulos do curso",
      "Flashcards e simulados",
      "Gamificação, ranking e certificado",
    ],
  },
  {
    id: "completo",
    name: "Completo",
    price: "R$ 27,93",
    url: CHECKOUT_COMPLETO,
    highlight: true,
    perks: [
      "Tudo do plano Essencial",
      "Professor IA — tutor ilimitado",
      "Ajuda em cada questão que você errar",
    ],
  },
];

export default function AccessGate({ user, onRefresh }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleRefresh = async () => {
    setChecking(true);
    setNotFound(false);
    const u = await onRefresh();
    setChecking(false);
    if (!u || !u.has_access) setNotFound(true);
  };

  const handleSwitchAccount = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-ink px-5 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-volt/15">
            <Lock className="h-7 w-7 text-volt" />
          </span>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Falta pouco para liberar seu acesso
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
            Olá, {user?.name?.split(" ")[0] || "aluno"}! Sua conta{" "}
            <span className="font-semibold text-white">{user?.email}</span> ainda não tem uma
            compra vinculada. Garanta seu acesso abaixo ou, se já comprou, atualize.
          </p>
        </motion.div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              data-testid={`gate-plan-${plan.id}`}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.highlight
                  ? "border-volt bg-volt/10"
                  : "border-white/15 bg-white/[0.03]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-volt px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                  Recomendado
                </span>
              )}
              <p className="font-display text-lg font-bold">{plan.name}</p>
              <p className="mt-1 font-display text-3xl font-extrabold text-volt">{plan.price}</p>
              <ul className="mt-4 flex-1 space-y-2.5">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-slate-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-volt" strokeWidth={3} />
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href={plan.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`gate-buy-${plan.id}`}
                className={`mt-6 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-display text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95 ${
                  plan.highlight
                    ? "bg-volt text-ink"
                    : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Comprar {plan.name} <Zap className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
          <p className="text-sm text-slate-300">
            Já concluiu o pagamento?{" "}
            <span className="font-semibold text-white">
              Use o mesmo e-mail da compra ao entrar
            </span>{" "}
            e clique abaixo.
          </p>
          {notFound && (
            <p className="mt-2 text-sm font-semibold text-amber-400" data-testid="gate-not-found">
              Ainda não encontramos sua compra. Se acabou de pagar, aguarde alguns instantes e
              tente de novo — ou confirme se usou este mesmo e-mail.
            </p>
          )}
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={handleRefresh}
              disabled={checking}
              data-testid="gate-refresh"
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-display text-sm font-bold text-ink transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {checking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Já paguei — atualizar acesso
            </button>
            <button
              onClick={handleSwitchAccount}
              data-testid="gate-switch-account"
              className="flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Trocar de conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
