export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body { background: #0c0810 !important; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1) !important; }
      `}</style>
      {children}
    </>
  );
}
