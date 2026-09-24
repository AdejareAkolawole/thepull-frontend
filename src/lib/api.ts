const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://thepull-backend-production.up.railway.app").replace(/\/+$/, "");

export interface ApiError extends Error {
  status?: number;
  detail?: unknown;
}

export function getGoogleAuthUrl(): string {
  return `${BASE_URL}/auth/google`;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("pull_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers, signal: controller.signal });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      const error = new Error(typeof err.detail === "string" ? err.detail : `HTTP ${res.status}`) as ApiError;
      error.status = res.status;
      error.detail = err.detail;
      throw error;
    }
    return res.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("The server took too long to respond. Please try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

// Auth
export async function register(email: string, password: string, displayName?: string) {
  const data = await request<{ access_token: string; token_type: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, display_name: displayName }),
  });
  if (data.access_token) localStorage.setItem("pull_token", data.access_token);
  return data;
}

export async function login(email: string, password: string) {
  const data = await request<{ access_token: string; token_type: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.access_token) localStorage.setItem("pull_token", data.access_token);
  return data;
}

export function logout() {
  localStorage.removeItem("pull_token");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export async function getMe() {
  return request<{ id: string; email: string; role: string }>("/auth/me");
}

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  account_status: string;
  tier: string;
  onboarding_complete: boolean;
  founding_member: boolean;
  founder_number?: number | null;
  pull_score?: number | null;
  confidence?: number | null;
  last_login?: string | null;
  created_at?: string | null;
};

export type AdminOverview = {
  stats: Record<string, number>;
  tier_breakdown: Record<string, number>;
  signup_trend: Array<{ date: string; count: number }>;
  recent_users: AdminUser[];
  activity: Array<{
    id: string;
    kind: string;
    title: string;
    detail: string;
    status?: string;
    confidence?: number;
    created_at?: string | null;
  }>;
  system: {
    api: string;
    database: string;
    ai_configured: boolean;
    stripe_configured: boolean;
    environment: string;
  };
};

export async function getAdminOverview() {
  return request<AdminOverview>("/admin/overview");
}

export async function getAdminUsers(params: { q?: string; status?: string; tier?: string; offset?: number; limit?: number } = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  return request<{ users: AdminUser[]; total: number; offset: number; limit: number }>(`/admin/users?${query.toString()}`);
}

export async function getAdminUser(id: string) {
  return request<{
    user: AdminUser;
    profile: Record<string, unknown>;
    intelligence: {
      archetype: { name?: string | null; title?: string | null; confidence?: number | null } | null;
      profile_status?: string | null;
      narrative_state?: string | null;
    };
    founding_claim: { founder_number: number; status: string; reserved_at?: string | null; claimed_at?: string | null } | null;
    assessment_sessions: Array<Record<string, unknown>>;
    counts: Record<string, number>;
  }>(`/admin/users/${id}`);
}

export async function updateAdminUser(id: string, data: { account_status?: string; subscription_tier?: string; role?: string }) {
  return request<{ ok: boolean; user_id: string }>(`/admin/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export type AdminIntelligence = {
  engines: Array<{ engine_id: string; engine_name: string; runs: number }>;
  average_confidence: number;
  profile_status: Record<string, number>;
  latest: Array<{
    id: string;
    engine_id: string;
    engine_name: string;
    status: string;
    confidence: number;
    source: string;
    user_name: string;
    generated_at?: string | null;
  }>;
};

export async function getAdminIntelligence() {
  return request<AdminIntelligence>("/admin/intelligence");
}

export type AdminFounding = {
  availability: {
    limit: number;
    spots_claimed: number;
    spots_reserved: number;
    spots_remaining: number;
    available: boolean;
    price: number;
    currency: string;
  };
  claims: Array<{
    id: string;
    founder_number: number;
    name: string;
    email: string;
    status: string;
    reserved_at?: string | null;
    claimed_at?: string | null;
    expires_at?: string | null;
  }>;
};

export async function getAdminFounding() {
  return request<AdminFounding>("/admin/founding");
}

// Dashboard
export async function getDashboard() {
  return request<{
    user: { id: string; email: string; name?: string; initials?: string };
    profile: Record<string, unknown> | null;
    pull_score: number | null;
    archetype: Record<string, unknown> | null;
    living_narrative: Record<string, unknown> | null;
    behavioural_confidence: number | null;
    dimension_scores: Record<string, number> | null;
    pull_score_breakdown: Record<string, unknown> | null;
  }>("/dashboard");
}

// Profile
export async function getProfile() {
  return request<Record<string, unknown>>("/profile");
}

export async function updateProfile(data: Record<string, unknown>) {
  return request("/profile", { method: "PATCH", body: JSON.stringify(data) });
}

export type LocationSuggestion = {
  place_id: string;
  label: string;
  canonical_name: string;
  city: string;
  region?: string | null;
  country: string;
  country_code?: string | null;
  latitude: number;
  longitude: number;
};

export async function searchLocations(query: string) {
  return request<LocationSuggestion[]>(`/profile/locations/search?q=${encodeURIComponent(query)}`);
}

// Pull Profile
export async function getPullProfile() {
  return request<Record<string, unknown>>("/pull-profile");
}

// Reality Check
export async function runRealityCheck(payload: { situation: string; thinking: string; considering: string }) {
  return request<{ analysis: string; tier: string }>("/reality-check", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Journal
export async function getJournalEntries() {
  return request<{ entries: unknown[] }>("/journal");
}

export async function createJournalEntry(payload: { title?: string; entry_type?: string; content: string }) {
  return request("/journal", { method: "POST", body: JSON.stringify(payload) });
}

export async function updateJournalEntry(id: string, payload: { title?: string; content?: string }) {
  return request(`/journal/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export async function deleteJournalEntry(id: string) {
  return request(`/journal/${id}`, { method: "DELETE" });
}

// Coach
export async function sendCoachMessage(prompt: string) {
  return request<{ response: string; usage?: { used: number; limit: number; remaining: number } }>("/coach/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}

export async function getCoachMemories() {
  return request<{ memories: unknown[] }>("/coach/memories");
}

export async function forgetMemory(id: string) {
  return request(`/coach/memories/${id}/forget`, { method: "PATCH" });
}

export async function forgetAllMemories() {
  return request("/coach/memories/forget-all", { method: "POST" });
}

// Assessment
export async function getAssessmentStatus() {
  return request<{ has_session: boolean; status: string | null; progress: number; session_id?: string; answered?: number; total?: number }>("/assessment/status");
}

export async function startAssessment() {
  return request<{ session_id: string; next_question: unknown; progress: number; total_questions: number; complete: boolean }>("/assessment/start", {
    method: "POST",
    body: JSON.stringify({ assessment_type: "onboarding" }),
  });
}

export async function submitAnswer(sessionId: string, questionKey: string, responseValue: Record<string, unknown>) {
  return request<{ session_id: string; progress: number; next_question: unknown; complete: boolean }>("/assessment/answer", {
    method: "POST",
    body: JSON.stringify({ session_id: sessionId, question_key: questionKey, response_value: responseValue }),
  });
}

export async function completeAssessment(sessionId: string) {
  return request<{ status: string; pull_score: number; archetype: string; behavioural_confidence: number }>("/assessment/complete", {
    method: "POST",
    body: JSON.stringify({ session_id: sessionId }),
  });
}

// Upgrade
export async function createCheckout(planKey: string) {
  return request<{ checkout_url: string }>("/upgrade/checkout", {
    method: "POST",
    body: JSON.stringify({ plan_key: planKey }),
  });
}

export async function getFoundingAvailability() {
  return request<{
    limit: number;
    spots_claimed: number;
    spots_reserved: number;
    spots_remaining: number;
    available: boolean;
    price: number;
    currency: string;
  }>("/upgrade/founding-availability");
}

export async function getFoundingMember() {
  return request<{
    is_founding_member: boolean;
    founder_number?: number;
    identity_label?: string;
    badge_label?: string;
    status?: string;
    founding_price?: number;
    price_locked?: boolean;
    member_since?: string | null;
    early_access?: { enabled: boolean; features: string[] };
    certificate?: {
      title: string;
      recipient: string;
      identity_label: string;
      issued_at: string | null;
    };
    availability?: {
      limit: number;
      spots_claimed: number;
      spots_reserved: number;
      spots_remaining: number;
      available: boolean;
      price: number;
      currency: string;
    };
  }>("/profile/founding-member");
}

export async function getBillingPortal() {
  return request<{ portal_url: string }>("/upgrade/portal", { method: "POST" });
}

export async function getNotifications() {
  return request<Array<{
    id: string;
    category: "insight" | "streak" | "achievement" | "system";
    title: string;
    body: string;
    time: string;
    timeLabel: string;
    read: boolean;
    actionHref?: string;
  }>>("/notifications");
}

export async function markNotificationRead(id: string) {
  return request<{ ok: boolean }>(`/notifications/${id}/read`, { method: "POST" });
}

export type AdaptiveProbe = {
  id: string;
  trait_key: string;
  title: string;
  text: string;
  reason: string;
  response_type: "multiple_choice" | "likert" | string;
  scale: { min?: number; max?: number; labels?: Record<string, string> };
  options: string[];
  priority: number;
  created_at: string;
};

export async function getAdaptiveProbes() {
  return request<{ miqb_version: string; master_question_count: number; pending_count: number; probes: AdaptiveProbe[] }>("/assessment/probes");
}

export async function answerAdaptiveProbe(id: string, responseValue: Record<string, unknown>) {
  return request<{ status: string; pending_count: number }>(`/assessment/probes/${id}/answer`, {
    method: "POST",
    body: JSON.stringify({ response_value: responseValue }),
  });
}

export async function deleteAccount() {
  return request<{ status: string }>("/auth/account", { method: "DELETE" });
}

export async function getRealityCheckUsage() {
  return request<{
    tier: string;
    used: number;
    limit: number | null;
    remaining: number | null;
    limit_reached: boolean;
    month: string;
  }>("/reality-check/usage");
}
