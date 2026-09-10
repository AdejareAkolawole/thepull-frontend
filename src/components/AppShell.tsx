"use client";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import IntelligenceBar from "./IntelligenceBar";

const AUTH_PATHS = ["/login", "/register", "/onboarding", "/pull-reveal", "/landing", "/", "/auth"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_PATHS.some(p => pathname === p || pathname.startsWith(p + "/"));

  if (isAuth) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <TopNav />
      <IntelligenceBar />
      <main className="with-sidebar" style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 24px 80px" }}>
        {children}
      </main>
    </>
  );
}
