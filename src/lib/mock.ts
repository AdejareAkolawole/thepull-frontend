export const mockUser = {
  name: "Adejare",
  initials: "AA",
  archetype: "The Analytical Connector",
  archetype_key: "analytical_connector",
  pull_score: 74,
  pull_trend: "rising" as const,
  plan: "premium" as const,
  joined: "2024-09-01",
};

export const mockDimensions = [
  { label: "Emotional Intelligence", score: 81, color: "#c6ad83" },
  { label: "Communication", score: 76, color: "#a07850" },
  { label: "Self-Awareness", score: 69, color: "#8a6a40" },
  { label: "Relationship Patterns", score: 72, color: "#c6ad83" },
  { label: "Behavioural Consistency", score: 65, color: "#a07850" },
];

export const mockPeople = [
  { id: "1", name: "Jordan", initials: "J", relation: "Partner", score: 88, compatibility: "high" as const },
  { id: "2", name: "Mara", initials: "M", relation: "Friend", score: 71, compatibility: "medium" as const },
  { id: "3", name: "Theo", initials: "T", relation: "Colleague", score: 56, compatibility: "low" as const },
];

export const mockInsights = [
  {
    id: "1",
    type: "observation" as const,
    title: "Your communication style is evolving",
    body: "Over the past 30 days, your directness index has increased by 12 points — a signal of growing confidence in how you express your needs.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "pattern" as const,
    title: "Emotional recovery speed",
    body: "You tend to recover from interpersonal conflict 2.4× faster than average — a strength that supports resilient relationships.",
    timestamp: "Yesterday",
  },
  {
    id: "3",
    type: "opportunity" as const,
    title: "Deepen your self-awareness score",
    body: "Complete the Emotional Landscape assessment to unlock your full self-awareness profile and the next tier of insights.",
    timestamp: "3 days ago",
  },
];

export const mockAchievements = [
  { label: "First Assessment", done: true },
  { label: "Added 3 People", done: true },
  { label: "First Report", done: true },
  { label: "30-Day Streak", done: false },
  { label: "Premium Upgrade", done: true },
  { label: "Reality Check", done: false },
];

export const mockJourneySteps = [
  { label: "Discover", description: "Understand your Pull", done: true },
  { label: "Assess", description: "Complete your profile", done: true },
  { label: "Understand", description: "Read your intelligence", done: true },
  { label: "Deepen", description: "Track relationships", done: false },
  { label: "Grow", description: "Living intelligence", done: false },
];
