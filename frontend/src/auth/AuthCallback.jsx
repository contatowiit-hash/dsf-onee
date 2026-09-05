import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;
    const sessionId = new URLSearchParams(location.hash.slice(1)).get("session_id");
    const exchange = async () => {
      try {
        const r = await fetch(`${API}/auth/session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ session_id: sessionId }),
        });
        if (!r.ok) throw new Error("auth failed");
        const user = await r.json();
        setUser(user);
        navigate("/curso", { replace: true, state: { user } });
      } catch {
        navigate("/", { replace: true });
      }
    };
    exchange();
  }, [location, navigate, setUser]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper" data-testid="auth-callback">
      <Loader2 className="h-9 w-9 animate-spin text-ink" />
      <p className="font-display text-sm font-bold text-ink">Entrando na sua área...</p>
    </div>
  );
}
