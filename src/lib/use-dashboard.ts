"use client";
import { useEffect, useState } from "react";
import { getDashboard, isLoggedIn } from "./api";

export interface DashboardData {
  user: {
    name: string;
    initials: string;
    archetype: string;
    archetype_key: string;
    archetype_confidence: number;
    archetype_stage: string;
    archetype_tagline: string;
    pull_score: number;
    pull_trend: "rising" | "stable" | "falling";
    plan: "free" | "premium" | "elite";
    identity_summary: string;
    domains_covered: number;
    domains_total: number;
    dimensions_complete: number;
  } | null;
  dimensions: Array<{ label: string; score: number; color: string }>;
  loading: boolean;
  error: string | null;
  unauthenticated: boolean;
}

export function useDashboard(): DashboardData {
  const [data, setData] = useState<DashboardData>({
    user: null,
    dimensions: [],
    loading: true,
    error: null,
    unauthenticated: false,
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      setData(prev => ({ ...prev, loading: false, unauthenticated: true }));
      return;
    }

    getDashboard()
      .then(res => {
        const profile = (res.profile || {}) as Record<string, unknown>;
        const displayName = (profile.display_name as string) || res.user.email.split("@")[0];
        const initials = displayName.slice(0, 2).toUpperCase();
        const arch = res.archetype as Record<string, unknown> | null;
        const narrative = res.living_narrative as Record<string, unknown> | null;
        const dimColors = ["#c0404f", "#60a5fa", "#f59e0b", "#a78bfa", "#34d399", "#fb923c"];
        const dimensions = res.dimension_scores
          ? Object.entries(res.dimension_scores as Record<string, number>).slice(0, 6).map(([k, v], i) => ({
              label: k.replace(/_/g, " "),
              score: Math.round(v * 100),
              color: dimColors[i % dimColors.length],
            }))
          : [];

        setData({
          user: {
            name: displayName,
            initials,
            archetype: (arch?.name as string) || "Emerging Identity",
            archetype_key: "",
            archetype_confidence: arch?.confidence != null ? Math.round((arch.confidence as number) * 100) : (res.behavioural_confidence as number) ?? 0,
            archetype_stage: "emerging",
            archetype_tagline: (arch?.tagline as string) || "",
            pull_score: (res.pull_score as number) ?? 0,
            pull_trend: "stable",
            plan: ((profile.subscription_tier as string) || "free") as "free" | "premium" | "elite",
            identity_summary: (narrative?.narrative as string) || "",
            domains_covered: 0,
            domains_total: 12,
            dimensions_complete: dimensions.length,
          },
          dimensions,
          loading: false,
          error: null,
          unauthenticated: false,
        });
      })
      .catch(() => {
        setData(prev => ({ ...prev, loading: false, error: "Failed to load dashboard" }));
      });
  }, []);

  return data;
}
