import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "ThePull — Personal Intelligence",
  description: "Intelligence for understanding yourself and your relationships. Pull Score, AI Coach, Reality Check — a living profile that grows with you.",
  metadataBase: new URL("https://mypullscore.com"),
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.jpg", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/logo.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://mypullscore.com",
    siteName: "ThePull",
    title: "ThePull — Personal Intelligence",
    description: "Intelligence for understanding yourself and your relationships. Pull Score, AI Coach, Reality Check — a living profile that grows with you.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ThePull — Personal Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mypullscore",
    creator: "@mypullscore",
    title: "ThePull — Personal Intelligence",
    description: "Intelligence for understanding yourself and your relationships. Pull Score, AI Coach, Reality Check — a living profile that grows with you.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <AuthProvider>
          <AppShell>
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
