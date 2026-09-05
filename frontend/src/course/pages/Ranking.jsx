import { useOutletContext } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Trophy } from "lucide-react";

const DEMO = [
  { name: "Aluna Demo 1", xp: 340 },
  { name: "Aluno Demo 2", xp: 260 },
  { name: "Aluna Demo 3", xp: 180 },
  { name: "Aluno Demo 4", xp: 90 },
];

export default function Ranking() {
  const { user } = useAuth();
  const { progress } = useOutletContext();
  const xp = progress?.xp ?? 0;

  const rows = [...DEMO, { name: user?.name ?? "Você", xp, me: true }].sort((a, b) => b.xp - a.xp);

  return (
    <div className="space-y-8" data-testid="ranking-page">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Ranking
        </h1>
        <p className="mt-1 text-muted-foreground">
          Sua posição pelo XP acumulado. Ranking com dados de demonstração.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-5 py-4 ${
              i > 0 ? "border-t border-border" : ""
            } ${row.me ? "bg-volt/15" : ""}`}
            data-testid={row.me ? "ranking-me" : `ranking-row-${i}`}
          >
            <span className="w-8 font-mono text-sm font-bold text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i === 0 && <Trophy className="h-4 w-4 text-[#b8960c]" />}
            <span className={`flex-1 font-display text-sm font-bold sm:text-base ${row.me ? "text-foreground" : "text-muted-foreground"}`}>
              {row.name} {row.me && "(você)"}
            </span>
            <span className="font-mono text-sm font-bold text-foreground">{row.xp} XP</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Quando mais alunos entrarem na turma, o ranking passa a mostrar posições reais.
      </p>
    </div>
  );
}
