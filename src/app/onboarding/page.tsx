"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  getProfile, updateProfile,
  startAssessment, submitAnswer, completeAssessment,
  isLoggedIn, searchLocations, type LocationSuggestion,
} from "@/lib/api";

const INTRO_STEPS = [
  {
    id: "name",
    field: "display_name",
    type: "text",
    message: () => "Hi. I'm really glad you're here.\n\nWhat should I call you?",
    placeholder: "Your name or nickname",
  },
  {
    id: "welcome",
    type: "message",
    message: (v: Record<string, string>) =>
      `Hi ${v.display_name || ""}. This isn't a personality test.\n\nThink of this as the beginning of an ongoing conversation. I'll gradually get to know you over time, and the more I learn, the more personal your experience becomes.`,
  },
  {
    id: "birth_date",
    field: "birth_date",
    type: "date",
    message: () => "When were you born?\n\nThis unlocks deeper layers of your intelligence.",
  },
  {
    id: "birth_time",
    field: "birth_time",
    type: "time",
    optional: true,
    message: () => "Do you know what time you were born?\n\nIt helps add context to your symbolic profile, but you can skip this if you’re not sure.",
  },
  {
    id: "birthplace",
    field: "birthplace",
    type: "text",
    message: () => "And where were you born?",
    placeholder: "City, Country",
  },
  {
    id: "main_concern",
    field: "main_concern",
    type: "textarea",
    message: () => "What brought you here today?\n\nWhat's on your mind?",
    placeholder: "Tell me what brought you here...",
  },
  {
    id: "main_goal",
    field: "main_goal",
    type: "textarea",
    message: () => "What are you hoping to discover?",
    placeholder: "Your hopes and goals...",
  },
  {
    id: "core_values",
    field: "core_values",
    type: "card_select",
    message: () => "What matters most to you right now?",
    options: [
      { value: "growth", label: "Growing as a person" },
      { value: "achievement", label: "Achieving my goals" },
      { value: "connection", label: "Close connections" },
      { value: "freedom", label: "Freedom & independence" },
      { value: "stability", label: "Stability & security" },
      { value: "purpose", label: "Purpose & meaning" },
    ],
  },
  {
    id: "transition",
    type: "message",
    message: (v: Record<string, string>) =>
      `Thank you, ${v.display_name || ""}.\n\nI'd love to begin our conversation now. I'll ask you about different dimensions of who you are — not to assess you, but to understand you.`,
  },
];

type Phase = "loading" | "intro" | "questions" | "ending" | "generating" | "done";

export default function OnboardingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("loading");
  const [introStep, setIntroStep] = useState(0);
  const [introValues, setIntroValues] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationActiveIndex, setLocationActiveIndex] = useState(0);
  const locationRequestRef = useRef(0);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Record<string, unknown> | null>(null);
  const [totalQuestions, setTotalQuestions] = useState(12);
  const [answeredCount, setAnsweredCount] = useState(0);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { window.location.href = "/login"; return; }
    getProfile().then((p: Record<string, unknown>) => {
      if (p.onboarding_complete) { window.location.href = "/dashboard"; return; }
      if (p.display_name) setIntroValues(prev => ({ ...prev, display_name: p.display_name as string }));
      if (p.birthplace) setIntroValues(prev => ({ ...prev, birthplace: p.birthplace as string }));
      if (p.birthplace_canonical && typeof p.birthplace_latitude === "number" && typeof p.birthplace_longitude === "number") {
        setSelectedLocation({
          place_id: String(p.birthplace_place_id || p.birthplace_canonical),
          label: String(p.birthplace || p.birthplace_canonical),
          canonical_name: String(p.birthplace_canonical),
          city: String(p.birthplace_city || p.birthplace || ""),
          region: p.birthplace_region as string | null | undefined,
          country: String(p.birthplace_country || ""),
          country_code: p.birthplace_country_code as string | null | undefined,
          latitude: p.birthplace_latitude,
          longitude: p.birthplace_longitude,
        });
      }
      setPhase("intro");
    }).catch(() => setPhase("intro"));
  }, [router]);

  useEffect(() => {
    if (INTRO_STEPS[introStep]?.id !== "birthplace") return;
    const requestId = ++locationRequestRef.current;
    const query = inputValue.trim();
    if (query.length < 2 || selectedLocation?.label === query) {
      return;
    }

    const timer = window.setTimeout(() => {
      setLocationLoading(true);
      searchLocations(query)
        .then(results => {
          if (requestId !== locationRequestRef.current) return;
          setLocationSuggestions(results);
          setLocationActiveIndex(0);
        })
        .catch(() => {
          if (requestId === locationRequestRef.current) setLocationSuggestions([]);
        })
        .finally(() => {
          if (requestId === locationRequestRef.current) setLocationLoading(false);
        });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [introStep, inputValue, selectedLocation]);

  const selectLocation = useCallback((location: LocationSuggestion) => {
    setSelectedLocation(location);
    setInputValue(location.label);
    setLocationSuggestions([]);
    setLocationActiveIndex(0);
    setError("");
  }, []);

  const saveProfileFields = useCallback(async (values: Record<string, string>, location: LocationSuggestion | null) => {
    const allowed = ["display_name", "birth_date", "birth_time", "birthplace", "main_concern", "main_goal"];
    const patch: Record<string, unknown> = {};
    for (const k of allowed) if (values[k]) patch[k] = values[k];
    if (values.birth_time) patch.birth_time_known = true;
    if (location) {
      patch.birthplace = location.label;
      patch.birthplace_canonical = location.canonical_name;
      patch.birthplace_city = location.city;
      patch.birthplace_region = location.region;
      patch.birthplace_country = location.country;
      patch.birthplace_country_code = location.country_code;
      patch.birthplace_place_id = location.place_id;
      patch.birthplace_latitude = location.latitude;
      patch.birthplace_longitude = location.longitude;
    }
    if (Object.keys(patch).length) await updateProfile(patch);
  }, []);

  const handleIntroNext = useCallback(async () => {
    setError("");
    const step = INTRO_STEPS[introStep];
    if (step.id === "birthplace" && !selectedLocation) {
      setError("Choose a location from the suggestions so we can save its exact coordinates.");
      return;
    }
    const newValues = { ...introValues };
    if (step.field && inputValue.trim()) newValues[step.field] = inputValue.trim();
    if (step.id === "birthplace" && selectedLocation) newValues.birthplace = selectedLocation.label;
    if (step.field === "core_values" && selectedCard) newValues.core_values = selectedCard;
    setIntroValues(newValues);
    setInputValue("");
    setSelectedCard(null);
    setLocationSuggestions([]);

    const nextStep = introStep + 1;
    if (nextStep >= INTRO_STEPS.length) {
      setSubmitting(true);
      try {
        await saveProfileFields(newValues, selectedLocation);
        const res = await startAssessment();
        setSessionId(res.session_id);
        setCurrentQuestion(res.next_question as Record<string, unknown>);
        setTotalQuestions(res.total_questions);
        setPhase("questions");
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    } else {
      setIntroStep(nextStep);
    }
  }, [introStep, introValues, inputValue, selectedCard, selectedLocation, saveProfileFields]);

  const handleAnswer = useCallback(async (answer: string) => {
    if (!sessionId || !currentQuestion) return;
    setSubmitting(true);
    setError("");
    try {
      const questionKey = (currentQuestion.key || currentQuestion.id) as string;
      const res = await submitAnswer(sessionId, questionKey, { answer, value: answer });
      setAnsweredCount(prev => prev + 1);
      if (res.complete) {
        setPhase("ending");
      } else {
        setCurrentQuestion(res.next_question as Record<string, unknown>);
        setInputValue("");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }, [sessionId, currentQuestion]);

  const handleGenerateIntelligence = useCallback(async () => {
    if (!sessionId) return;
    setPhase("generating");
    try {
      await completeAssessment(sessionId);
    } catch (e) {
      console.error("Pipeline error:", e);
    }
    setTimeout(() => setPhase("done"), 3000);
  }, [sessionId]);

  useEffect(() => {
    if (phase === "done") window.location.href = "/pull-reveal";
  }, [phase, router]);

  if (phase === "loading") return <LoadingScreen />;
  if (phase === "generating" || phase === "done") return <GeneratingScreen />;

  if (phase === "ending") {
    return (
      <Screen>
        <MessageCard
          text={"Thank you. I don't think anyone can truly understand another person in only a few minutes. But I think we've made a meaningful beginning.\n\nFrom here I'll continue learning naturally over time."}
        />
        <PrimaryButton onClick={handleGenerateIntelligence} label="Reveal my Pull Score →" />
      </Screen>
    );
  }

  if (phase === "questions" && currentQuestion) {
    const q = currentQuestion;
    const options = (q.options as string[]) || [];
    const qType = q.type as string;
    const totalSteps = INTRO_STEPS.length + totalQuestions;
    const answered = INTRO_STEPS.length + answeredCount;

    return (
      <Screen>
        <TopBar pct={Math.round((answered / totalSteps) * 100)} label="Your assessment" />
        <AnimatePresence mode="wait">
          <motion.div key={String(q.id || q.key)}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: "100%" }}>
            <MessageCard text={q.text as string} />
            {error && <p style={{ color: "#c0404f", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{error}</p>}
            {(qType === "multiple_choice" || options.length > 0) && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {options.map((opt: string) => (
                  <OptionButton key={opt} label={opt} onClick={() => handleAnswer(opt)} disabled={submitting} />
                ))}
              </div>
            )}
            {qType === "likert" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {Array.from(
                  { length: (q.scale as { min: number; max: number }).max - (q.scale as { min: number; max: number }).min + 1 },
                  (_, i) => {
                    const val = (q.scale as { min: number }).min + i;
                    const labels = (q.scale as { labels: Record<string, string> }).labels;
                    return (
                      <OptionButton key={val} label={`${val}${labels?.[String(val)] ? ` — ${labels[String(val)]}` : ""}`}
                        onClick={() => handleAnswer(String(val))} disabled={submitting} />
                    );
                  }
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Screen>
    );
  }

  // Intro
  const step = INTRO_STEPS[introStep];
  const msg = step.message(introValues);
  const isMessageOnly = step.type === "message";
  const currentVal = step.field ? introValues[step.field] || "" : "";
  const totalSteps = INTRO_STEPS.length + totalQuestions;

  return (
    <Screen>
      <TopBar pct={Math.round((introStep / totalSteps) * 100)} label="Getting to know you" />
      <AnimatePresence mode="wait">
        <motion.div key={introStep}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: "100%" }}>
          <MessageCard text={msg} />
          {error && <p style={{ color: "#c0404f", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{error}</p>}

          {step.type === "text" && step.id === "birthplace" && (
            <div style={{ position: "relative", marginBottom: 16 }}>
              <input
                type="text"
                value={inputValue || currentVal}
                onChange={e => {
                  setInputValue(e.target.value);
                  setSelectedLocation(null);
                  setLocationSuggestions([]);
                  setLocationLoading(false);
                  setLocationActiveIndex(0);
                }}
                placeholder={step.placeholder}
                style={{ ...textInput, marginBottom: 0 }}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={locationSuggestions.length > 0}
                aria-controls="birthplace-suggestions"
                onKeyDown={e => {
                  if (e.key === "ArrowDown" && locationSuggestions.length) {
                    e.preventDefault();
                    setLocationActiveIndex(i => Math.min(i + 1, locationSuggestions.length - 1));
                  } else if (e.key === "ArrowUp" && locationSuggestions.length) {
                    e.preventDefault();
                    setLocationActiveIndex(i => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    if (locationSuggestions[locationActiveIndex]) selectLocation(locationSuggestions[locationActiveIndex]);
                    else if (selectedLocation) void handleIntroNext();
                  } else if (e.key === "Escape") {
                    setLocationSuggestions([]);
                  }
                }}
                autoFocus
                autoComplete="off"
                spellCheck={false}
              />
              {locationLoading && (
                <p style={{ color: "#9ca3af", fontSize: 12, margin: "8px 4px 0" }}>Searching places…</p>
              )}
              {locationSuggestions.length > 0 && (
                <div
                  id="birthplace-suggestions"
                  role="listbox"
                  style={{
                    position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 20,
                    maxHeight: 280, overflowY: "auto", padding: 6, borderRadius: 16,
                    background: "#fff", border: "1px solid #e5e7eb",
                    boxShadow: "0 14px 35px rgba(15,10,20,0.14)",
                  }}
                >
                  {locationSuggestions.map((location, index) => (
                    <button
                      key={location.place_id}
                      type="button"
                      role="option"
                      aria-selected={index === locationActiveIndex}
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => selectLocation(location)}
                      style={{
                        display: "block", width: "100%", minHeight: 52, textAlign: "left",
                        border: 0, borderRadius: 12, padding: "10px 12px",
                        background: index === locationActiveIndex ? "#f8f1ed" : "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ display: "block", fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{location.city}</span>
                      <span style={{ display: "block", fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                        {[location.region, location.country].filter(Boolean).join(", ")}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {step.type === "text" && step.id !== "birthplace" && (
            <input type="text" value={inputValue || currentVal} onChange={e => setInputValue(e.target.value)}
              placeholder={step.placeholder} style={textInput}
              onKeyDown={e => e.key === "Enter" && (inputValue.trim() || currentVal) && handleIntroNext()}
              autoFocus />
          )}
          {step.type === "date" && (
            <input type="date" value={inputValue || currentVal} onChange={e => setInputValue(e.target.value)}
              style={textInput} autoFocus />
          )}
          {step.type === "time" && (
            <input type="time" value={inputValue || currentVal} onChange={e => setInputValue(e.target.value)}
              style={textInput} autoFocus />
          )}
          {step.type === "textarea" && (
            <textarea value={inputValue || currentVal} onChange={e => setInputValue(e.target.value)}
              placeholder={step.placeholder} rows={4} style={{ ...textInput, resize: "none" }} autoFocus />
          )}
          {step.type === "card_select" && step.options && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {step.options.map(opt => (
                <button key={opt.value} onClick={() => setSelectedCard(opt.value)} style={{
                  padding: "14px 16px", borderRadius: 14, cursor: "pointer",
                  background: selectedCard === opt.value ? "#3d0e1a" : "#fff",
                  border: `1.5px solid ${selectedCard === opt.value ? "#3d0e1a" : "#e5e7eb"}`,
                  color: selectedCard === opt.value ? "#fff" : "#374151",
                  fontSize: 13, fontWeight: 600, fontFamily: "inherit", textAlign: "left",
                  transition: "all 0.18s ease", boxShadow: selectedCard === opt.value ? "0 4px 16px rgba(61,14,26,0.18)" : "none",
                }}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          <PrimaryButton
            onClick={handleIntroNext}
            disabled={submitting || (
              !isMessageOnly &&
              step.type !== "message" &&
              step.type !== "card_select" &&
              !step.optional &&
              !inputValue.trim() && !currentVal
            ) || (step.type === "card_select" && !selectedCard) || (step.id === "birthplace" && !selectedLocation)}
            label={isMessageOnly
              ? introStep === 0 ? "I'm ready →" : "Let's continue →"
              : submitting ? "Saving…" : step.optional && !inputValue.trim() && !currentVal ? "Skip for now →" : introStep === INTRO_STEPS.length - 1 ? "Begin the conversation →" : "Continue →"}
          />
        </motion.div>
      </AnimatePresence>
    </Screen>
  );
}

// ── Sub-components ──

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100dvh", background: "#fafafa",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "32px 24px", fontFamily: "Aeonik, system-ui, sans-serif",
      position: "relative", overflowX: "hidden", overflowY: "auto",
    }}>
      {/* Subtle background orbs */}
      <div style={{
        position: "fixed", top: "-120px", right: "-80px", width: 400, height: 400,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-100px", left: "-60px", width: 320, height: 320,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(61,14,26,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ width: "100%", maxWidth: 560, position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

function TopBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      {/* Logo row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 32, flexShrink: 0, position: "relative" }}>
            <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#0f0a14", letterSpacing: "0.05em" }}>THEPULL</span>
        </div>
        <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>{pct}%</span>
      </div>
      {/* Progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#9ca3af", textTransform: "uppercase", whiteSpace: "nowrap" }}>{label}</span>
        <div style={{ flex: 1, height: 3, background: "#f0ece4", borderRadius: 99 }}>
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ height: "100%", background: "linear-gradient(90deg, #3d0e1a, #c9a84c)", borderRadius: 99 }}
          />
        </div>
      </div>
    </div>
  );
}

function MessageCard({ text }: { text: string }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: "28px 32px", marginBottom: 20,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.04)",
      border: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div style={{ width: 20, height: 25, flexShrink: 0, position: "relative" }}>
          <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "contain" }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#9ca3af", textTransform: "uppercase" }}>ThePull</span>
      </div>
      {text.split("\n\n").map((para, i, arr) => (
        <p key={i} style={{
          fontSize: 16, color: "#1a1a2e", lineHeight: 1.75, margin: 0,
          marginBottom: i < arr.length - 1 ? 12 : 0, fontWeight: 400,
        }}>
          {para}
        </p>
      ))}
    </div>
  );
}

function PrimaryButton({ onClick, label, disabled = false }: { onClick: () => void; label: string; disabled?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.015, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.985 } : {}}
      style={{
        width: "100%", padding: "16px 0", borderRadius: 14, border: "none",
        background: disabled ? "#f3f4f6" : "#0f0a14",
        color: disabled ? "#9ca3af" : "#fff",
        fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit", marginTop: 10,
        boxShadow: disabled ? "none" : "0 4px 20px rgba(15,10,20,0.18)",
        transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
      }}>
      {label}
    </motion.button>
  );
}

function OptionButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", padding: "15px 20px", borderRadius: 14, cursor: disabled ? "not-allowed" : "pointer",
        background: hovered && !disabled ? "#0f0a14" : "#fff",
        border: `1.5px solid ${hovered && !disabled ? "#0f0a14" : "#e5e7eb"}`,
        color: hovered && !disabled ? "#fff" : "#374151",
        fontSize: 14, fontWeight: 600, fontFamily: "inherit", textAlign: "left",
        opacity: disabled ? 0.5 : 1, transition: "all 0.15s ease",
        boxShadow: hovered && !disabled ? "0 4px 16px rgba(15,10,20,0.14)" : "none",
      }}>
      {label}
    </button>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa" }}>
      <LogoLoader />
    </div>
  );
}

function GeneratingScreen() {
  const steps = ["Reading your signals…", "Building your archetype…", "Generating your Pull Score…", "Preparing your profile…"];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", background: "#fafafa", gap: 32,
      fontFamily: "Aeonik, system-ui, sans-serif",
    }}>
      <LogoLoader />
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#c0404f", textTransform: "uppercase", marginBottom: 12 }}>Building your intelligence</p>
        <AnimatePresence mode="wait">
          <motion.p key={step}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 18, color: "#0f0a14", fontWeight: 600, letterSpacing: "-0.01em" }}>
            {steps[step]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function LogoLoader() {
  return (
    <div style={{ position: "relative", width: 110, height: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer spinning maroon ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#c0404f",
          borderRightColor: "rgba(192,64,79,0.3)",
        }}
      />
      {/* Inner spinning burgundy ring (opposite direction) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", inset: 8, borderRadius: "50%",
          border: "1.5px solid transparent",
          borderBottomColor: "#7c2232",
          borderLeftColor: "rgba(124,34,50,0.25)",
        }}
      />
      {/* Pulsing glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: 14, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,64,79,0.2) 0%, transparent 70%)",
        }}
      />
      {/* Logo — full, no crop */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "relative", width: 52, height: 64, zIndex: 2 }}>
        <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "contain" }} priority />
      </motion.div>
    </div>
  );
}

const textInput: React.CSSProperties = {
  width: "100%", boxSizing: "border-box", padding: "15px 18px",
  background: "#fff", border: "1.5px solid #e5e7eb",
  borderRadius: 14, color: "#0f0a14", fontSize: 15, outline: "none",
  fontFamily: "inherit", marginBottom: 16, transition: "border-color 0.15s",
};
