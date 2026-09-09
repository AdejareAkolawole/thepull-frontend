export type StreakType = "app" | "journal" | "coach" | "reality_check";

export type StreakData = {
  current: number;
  longest: number;
  lastDate: string | null;
  history: string[]; // ISO date strings of activity days, last 90
  totalDays: number;
};

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

const KEY = (t: StreakType) => `pull_streak_${t}`;

export function getStreak(type: StreakType): StreakData {
  try {
    const raw = localStorage.getItem(KEY(type));
    if (raw) return JSON.parse(raw);
  } catch {}
  return { current: 0, longest: 0, lastDate: null, history: [], totalDays: 0 };
}

export function trackActivity(type: StreakType): StreakData {
  try {
    const s = getStreak(type);
    const t = today();

    if (s.lastDate === t) return s; // already tracked today

    const newCurrent = s.lastDate === yesterday() ? s.current + 1 : 1;
    const newLongest = Math.max(s.longest, newCurrent);
    const newHistory = [...new Set([...s.history, t])].sort().slice(-90);

    const updated: StreakData = {
      current: newCurrent,
      longest: newLongest,
      lastDate: t,
      history: newHistory,
      totalDays: newHistory.length,
    };
    localStorage.setItem(KEY(type), JSON.stringify(updated));
    return updated;
  } catch {
    return getStreak(type);
  }
}

export function getAllStreaks(): Record<StreakType, StreakData> {
  return {
    app: getStreak("app"),
    journal: getStreak("journal"),
    coach: getStreak("coach"),
    reality_check: getStreak("reality_check"),
  };
}

// Call on every dashboard/app load
export function trackAppOpen(): void {
  try { trackActivity("app"); } catch {}
}
