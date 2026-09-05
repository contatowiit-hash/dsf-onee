import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(location.state?.user ? "ok" : "checking");

  useEffect(() => {
    if (location.state?.user) return;
    const check = async () => {
      try {
        const r = await fetch(`${API}/auth/me`, { credentials: "include" });
        if (!r.ok) throw new Error("not authenticated");
        setStatus("ok");
      } catch {
        setStatus("denied");
      }
    };
    check();
  }, [location.state]);

  useEffect(() => {
    if (status === "denied") navigate("/", { replace: true });
  }, [status, navigate]);

  if (status !== "ok") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background" data-testid="auth-loading">
        <Loader2 className="h-9 w-9 animate-spin text-foreground" />
      </div>
    );
  }
  return children;
}
