import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AccessGate from "@/auth/AccessGate";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking"); // checking | ok | locked | denied
  const [user, setUser] = useState(location.state?.user ?? null);

  const evaluate = useCallback((u) => {
    if (!u) {
      setStatus("denied");
      return null;
    }
    setUser(u);
    setStatus(u.has_access ? "ok" : "locked");
    return u;
  }, []);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch(`${API}/auth/me`, { credentials: "include" });
      if (!r.ok) throw new Error("not authenticated");
      const u = await r.json();
      return evaluate(u);
    } catch {
      setStatus("denied");
      return null;
    }
  }, [evaluate]);

  useEffect(() => {
    if (location.state?.user) {
      evaluate(location.state.user);
      return;
    }
    refresh();
  }, [location.state, evaluate, refresh]);

  useEffect(() => {
    if (status === "denied") navigate("/", { replace: true });
  }, [status, navigate]);

  if (status === "checking" || status === "denied") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background" data-testid="auth-loading">
        <Loader2 className="h-9 w-9 animate-spin text-foreground" />
      </div>
    );
  }

  if (status === "locked") {
    return <AccessGate user={user} onRefresh={refresh} />;
  }

  return children;
}
