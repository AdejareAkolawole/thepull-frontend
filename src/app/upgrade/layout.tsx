export default function UpgradeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      margin: "-20px -24px -80px",
      minWidth: "calc(100% + 48px)",
    }}>
      {children}
    </div>
  );
}
