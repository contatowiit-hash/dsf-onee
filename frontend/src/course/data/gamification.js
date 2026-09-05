export const LEVELS = [
  { name: "Tomada", xp: 0 },
  { name: "Lâmpada", xp: 100 },
  { name: "Gerador", xp: 300 },
  { name: "Usina", xp: 600 },
  { name: "Mestre da Energia", xp: 1000 },
];

export const levelFor = (xp) => {
  let current = LEVELS[0];
  let next = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? null;
    }
  }
  const base = current.xp;
  const span = next ? next.xp - base : 1;
  const pct = next ? Math.round(((xp - base) / span) * 100) : 100;
  return { current, next, pct, index: LEVELS.indexOf(current) };
};

export const XP_RULES = [
  { xp: "+5 XP", desc: "Login diário" },
  { xp: "+10 XP", desc: "Questão correta" },
  { xp: "+25 XP", desc: "Aula concluída" },
  { xp: "+100 XP", desc: "Simulado concluído" },
];

const dateKey = (d) => d.toISOString().slice(0, 10);

export const streakFrom = (dates) => {
  if (!dates?.length) return 0;
  const set = new Set(dates);
  const today = new Date();
  let cursor = new Date(today);
  if (!set.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!set.has(dateKey(cursor))) return 0;
  }
  let streak = 0;
  while (set.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};
