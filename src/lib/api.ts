const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("pull_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    const error: any = new Error(typeof err.detail === "string" ? err.detail : `HTTP ${res.status}`);
    error.status = res.status;
    error.detail = err.detail;
    throw error;
  }
  return res.json();
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

export async function getBillingPortal() {
  return request<{ portal_url: string }>("/upgrade/portal", { method: "POST" });
}
