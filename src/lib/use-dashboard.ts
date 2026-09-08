"use client";
import { useEffect, useState } from "react";
import { getDashboard, isLoggedIn } from "./api";
import { mockUser, mockDimensions } from "./mock";

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
  };
  dimensions: Array<{ label: string; score: number; color: string }>;
  loading: boolean;
  error: string | null;
  unauthenticated: boolean;
}

export function useDashboard(): DashboardData {
  const [data, setData] = useState<DashboardData>({
    user: mockUser as DashboardData["user"],
    dimensions: mockDimensions,
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

        setData({
          user: {
            name: displayName,
            initials,
            archetype: ((res.archetype as Record<string, unknown> | null)?.name as string) || mockUser.archetype,
            archetype_key: mockUser.archetype_key,
            archetype_confidence: mockUser.archetype_confidence,
            archetype_stage: mockUser.archetype_stage,
            archetype_tagline: mockUser.archetype_tagline,
            pull_score: res.pull_score ?? mockUser.pull_score,
            pull_trend: mockUser.pull_trend,
            plan: ((profile.subscription_tier as string) || "free") as "free" | "premium" | "elite",
            identity_summary: ((res.living_narrative as Record<string, unknown> | null)?.narrative as string) || mockUser.identity_summary,
            domains_covered: mockUser.domains_covered,
            domains_total: mockUser.domains_total,
            dimensions_complete: mockUser.dimensions_complete,
          },
          dimensions: mockDimensions,
          loading: false,
          error: null,
          unauthenticated: false,
        });
      })
      .catch(() => {
        // Fall back to mock data gracefully
        setData({
          user: mockUser as DashboardData["user"],
          dimensions: mockDimensions,
          loading: false,
          error: null,
          unauthenticated: false,
        });
      });
  }, []);

  return data;
}
