import { useOutletContext } from "react-router-dom";
import { MODULES } from "@/course/data/modules";
import ModuleRow from "@/course/components/ModuleRow";

export default function ModulesPage() {
  const { progress } = useOutletContext();
  const completed = progress?.completed_lessons ?? [];

  return (
    <div className="space-y-8" data-testid="modules-page">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Conteúdo para estudar
        </h1>
        <p className="mt-1 text-muted-foreground">
          Sete módulos, do básico à segurança elétrica. Conclua um módulo para liberar o próximo.
        </p>
      </div>
      <div className="space-y-3">
        {MODULES.map((m, i) => (
          <ModuleRow key={m.id} module={m} index={i} completed={completed} />
        ))}
      </div>
    </div>
  );
}
