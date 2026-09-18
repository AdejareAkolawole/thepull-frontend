"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Crown,
  Database,
  Download,
  Filter,
  Keyboard,
  Command as CommandIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  getAdminFounding,
  getAdminIntelligence,
  getAdminOverview,
  getAdminUser,
  getAdminUsers,
  logout,
  updateAdminUser,
  type AdminFounding,
  type AdminIntelligence,
  type AdminOverview,
  type AdminUser,
} from "@/lib/api";

type View = "overview" | "users" | "intelligence" | "founding";
type IconType = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

const navItems: Array<{ id: View; label: string; hint: string; icon: IconType }> = [
  { id: "overview", label: "Command centre", hint: "Platform pulse", icon: LayoutDashboard },
  { id: "users", label: "People", hint: "Users & access", icon: Users },
  { id: "intelligence", label: "Intelligence", hint: "Pipeline health", icon: BrainCircuit },
  { id: "founding", label: "Founding 500", hint: "Claims & seats", icon: Crown },
];

export default function AdminPage() {
  const router = useRouter();
  const [view, setView] = useState<View>("overview");
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [userOffset, setUserOffset] = useState(0);
  const [intelligence, setIntelligence] = useState<AdminIntelligence | null>(null);
  const [founding, setFounding] = useState<AdminFounding | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const loadCore = useCallback(async (soft = false, offset = 0) => {
    if (soft) setRefreshing(true); else setLoading(true);
    setError("");
    try {
      const [nextOverview, nextUsers] = await Promise.all([
        getAdminOverview(),
        getAdminUsers({ limit: 50, offset }),
      ]);
      setOverview(nextOverview);
      setUsers(nextUsers.users);
      setUsersTotal(nextUsers.total);
      setUserOffset(nextUsers.offset);
    } catch (caught: unknown) {
      const status = (caught as { status?: number })?.status;
      if (status === 401) {
        logout();
        router.push("/login");
      } else if (status === 403) {
        setError("This account does not have administrator access.");
      } else {
        setError(caught instanceof Error ? caught.message : "Admin data could not be loaded.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadCore(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadCore]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") setCommandOpen(false);
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const loadView = useCallback(async (nextView: View) => {
    try {
      if (nextView === "intelligence" && !intelligence) setIntelligence(await getAdminIntelligence());
      if (nextView === "founding" && !founding) setFounding(await getAdminFounding());
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : "This admin section could not be loaded.");
    }
  }, [founding, intelligence]);

  function selectView(nextView: View) {
    setView(nextView);
    setMobileNavOpen(false);
    void loadView(nextView);
  }

  async function refreshAll() {
    await loadCore(true, userOffset);
    if (view === "intelligence") setIntelligence(await getAdminIntelligence());
    if (view === "founding") setFounding(await getAdminFounding());
  }

  function changeUserPage(nextOffset: number) {
    void loadCore(true, Math.max(0, nextOffset));
  }

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter(user => {
      const matchesQuery = !query || `${user.name} ${user.email}`.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || user.account_status === statusFilter;
      const matchesTier = tierFilter === "all" || user.tier === tierFilter;
      return matchesQuery && matchesStatus && matchesTier;
    });
  }, [search, statusFilter, tierFilter, users]);

  if (loading) return <AdminLoading />;
  if (error && !overview) return <AdminDenied message={error} onBack={() => router.push("/dashboard")} />;

  const platformStats = overview?.stats || {};
  const livePeople = platformStats.active_users ?? platformStats.total_users ?? 0;
  const foundingMembers = platformStats.founding_members ?? 0;
  const seatsLeft = Math.max(0, 500 - foundingMembers);

  return (
    <div className={`admin-shell ${sidebarCollapsed ? "sidebar-is-collapsed" : ""}`}>
      <aside className={`admin-sidebar view-${view} ${mobileNavOpen ? "is-open" : ""} ${sidebarCollapsed ? "is-collapsed" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark"><Image src="/favicon-32.png" alt="MyPullScore" width={28} height={28} priority /></div>
          <div className="admin-brand-copy">
            <div className="admin-brand-name">MyPullScore</div>
            <div className="admin-brand-sub">Operator workspace</div>
          </div>
          <button className="admin-collapse-btn" onClick={() => setSidebarCollapsed(value => !value)} aria-label={sidebarCollapsed ? "Expand navigation" : "Collapse navigation"} title={sidebarCollapsed ? "Expand navigation" : "Collapse navigation"}>
            {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
          <button className="admin-icon-btn admin-mobile-close" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>

        <div className="admin-sidebar-label">Workspace</div>
        <nav className="admin-nav">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const badge = item.id === "users" ? String(usersTotal) : item.id === "founding" ? `${foundingMembers}/500` : item.id === "intelligence" ? String(platformStats.intelligence_runs_30d ?? 0) : "LIVE";
            return (
              <button key={item.id} className={`admin-nav-item ${view === item.id ? "active" : ""}`} onClick={() => selectView(item.id)} title={sidebarCollapsed ? item.label : undefined}>
                <span className="admin-nav-index">0{index + 1}</span>
                <span className="admin-nav-icon"><Icon size={17} /></span>
                <span className="admin-nav-copy"><strong>{item.label}</strong><small>{item.hint}</small></span>
                <span className="admin-nav-badge">{badge}</span>
                {view === item.id && <ChevronRight size={15} className="admin-nav-chevron" />}
              </button>
            );
          })}
        </nav>

        <div className="admin-live-card">
          <div className="admin-live-card-heading"><span><i className="admin-live-orb" /> Live signal</span><small>just now</small></div>
          <div className="admin-live-card-main"><strong>{livePeople}</strong><span>people in your system</span></div>
          <div className="admin-live-card-metrics"><span>{seatsLeft}<small>founding seats left</small></span><span>{platformStats.completed_onboarding ?? 0}<small>onboarded</small></span></div>
        </div>

        <div className="admin-side-spacer" />
        <div className="admin-side-status">
          <span className="admin-live-dot" />
          <div><strong>All systems live</strong><small>Production environment</small></div>
        </div>
        <button className="admin-back-link" onClick={() => router.push("/dashboard")}><ArrowUpRight size={15} /> Back to product</button>
        <button className="admin-logout" onClick={() => { logout(); router.push("/login"); }}><LogOut size={15} /> Sign out</button>
      </aside>

      {mobileNavOpen && <button className="admin-nav-scrim" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation" />}

      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-icon-btn admin-menu-trigger" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="admin-breadcrumb"><span>Admin</span><ChevronRight size={14} /><strong>{navItems.find(item => item.id === view)?.label}</strong></div>
          <div className="admin-top-actions">
            <button className="admin-command-trigger" onClick={() => setCommandOpen(true)}><CommandIcon size={14} /><span>Command</span><kbd>⌘K</kbd></button>
            <span className="admin-env-pill"><span className="admin-live-dot" /> Production</span>
            <button className="admin-icon-btn" onClick={() => void refreshAll()} aria-label="Refresh data"><RefreshCw size={16} className={refreshing ? "spin" : ""} /></button>
            <div className="admin-avatar">AD</div>
          </div>
        </header>

        <section className="admin-content">
          <div className="admin-heading-row">
            <div>
              <p className="admin-eyebrow">Operator view · {formatDate(new Date().toISOString())}</p>
              <h1>{view === "overview" ? "Good to see the signal." : navItems.find(item => item.id === view)?.label}</h1>
              <p className="admin-heading-copy">{view === "overview" ? "One clear view of what is happening across MyPullScore." : sectionDescription(view)}</p>
            </div>
            <div className="admin-heading-actions">
              {view === "users" && <button className="admin-button secondary" onClick={() => void refreshAll()}><RefreshCw size={15} /> Sync users</button>}
              <button className="admin-button primary" onClick={() => void refreshAll()}><Zap size={15} /> Refresh pulse</button>
            </div>
          </div>

          {error && <div className="admin-alert"><AlertTriangle size={16} /><span>{error}</span><button onClick={() => setError("")}><X size={14} /></button></div>}

          {view === "overview" && overview && <OverviewView overview={overview} onUsers={() => selectView("users")} onIntelligence={() => selectView("intelligence")} onFounding={() => selectView("founding")} onSelectUser={setSelectedUserId} />}
          {view === "users" && <UsersView users={filteredUsers} total={usersTotal} offset={userOffset} search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} tierFilter={tierFilter} setTierFilter={setTierFilter} onPageChange={changeUserPage} onSelectUser={setSelectedUserId} />}
          {view === "intelligence" && <IntelligenceView data={intelligence} />}
          {view === "founding" && <FoundingView data={founding} />}
        </section>
      </main>

      {commandOpen && <AdminCommandPalette view={view} onClose={() => setCommandOpen(false)} onNavigate={nextView => { setCommandOpen(false); selectView(nextView); }} onRefresh={() => { setCommandOpen(false); void refreshAll(); }} />}
      {selectedUserId && <UserDrawer userId={selectedUserId} onClose={() => setSelectedUserId(null)} onUpdated={() => { setSelectedUserId(null); void refreshAll(); }} />}
    </div>
  );
}

function OverviewView({ overview, onUsers, onIntelligence, onFounding, onSelectUser }: { overview: AdminOverview; onUsers: () => void; onIntelligence: () => void; onFounding: () => void; onSelectUser: (id: string) => void }) {
  const stats = overview.stats;
  return (
    <>
      <div className="admin-stat-grid">
        <StatCard label="Total people" value={stats.total_users} caption={`+${stats.new_users_7d} this week`} icon={Users} tone="plum" />
        <StatCard label="Active accounts" value={stats.active_users} caption={`${percent(stats.active_users, stats.total_users)}% of total`} icon={Activity} tone="blue" />
        <StatCard label="Paid members" value={stats.paid_users} caption={`${percent(stats.paid_users, stats.total_users)}% conversion`} icon={CircleDollarSign} tone="gold" />
        <StatCard label="Founding 500" value={stats.founding_members} caption={`${500 - stats.founding_members} seats open`} icon={Crown} tone="green" />
      </div>

      <div className="admin-grid admin-grid-main">
        <Panel className="admin-pulse-panel">
          <div className="panel-heading"><div><p className="panel-kicker">Growth pulse</p><h2>New people joining</h2></div><span className="panel-period">Last 14 days</span></div>
          <div className="admin-chart-wrap">
            <div className="admin-chart-y"><span>{Math.max(...overview.signup_trend.map(point => point.count), 1)}</span><span>0</span></div>
            <div className="admin-bars">
              {overview.signup_trend.map(point => {
                const max = Math.max(...overview.signup_trend.map(item => item.count), 1);
                return <div className="admin-bar-col" key={point.date}><div className="admin-bar" style={{ height: `${Math.max(8, (point.count / max) * 100)}%` }} title={`${point.count} signups`} /><span>{point.date.slice(8)}</span></div>;
              })}
            </div>
          </div>
          <div className="panel-footer-row"><span><span className="admin-dot plum" /> {stats.new_users_7d} new this week</span><span className="trend-positive"><ArrowUpRight size={14} /> Healthy momentum</span></div>
        </Panel>

        <Panel>
          <div className="panel-heading"><div><p className="panel-kicker">Commercial health</p><h2>Tier mix</h2></div><CircleDollarSign size={18} className="panel-muted-icon" /></div>
          <div className="tier-list">
            <TierBar label="Learn Me" value={overview.tier_breakdown.free || 0} total={stats.total_users} color="#a8a0bb" />
            <TierBar label="Understand Me" value={(overview.tier_breakdown.understand_me || 0) + (overview.tier_breakdown.premium || 0)} total={stats.total_users} color="#c0404f" />
            <TierBar label="Know Me" value={(overview.tier_breakdown.know_me || 0) + (overview.tier_breakdown.elite || 0)} total={stats.total_users} color="#c9a84c" />
          </div>
          <div className="tier-callout"><Sparkles size={15} /><span><strong>{stats.completed_onboarding}</strong> people have completed onboarding</span></div>
        </Panel>
      </div>

      <div className="admin-grid admin-grid-lower">
        <Panel className="admin-table-panel">
          <div className="panel-heading"><div><p className="panel-kicker">Latest arrivals</p><h2>People to know</h2></div><button className="panel-link" onClick={onUsers}>View all <ArrowUpRight size={14} /></button></div>
          <UserTable users={overview.recent_users} onSelectUser={onSelectUser} compact />
        </Panel>
        <Panel>
          <div className="panel-heading"><div><p className="panel-kicker">Live feed</p><h2>Platform activity</h2></div><Activity size={18} className="panel-muted-icon" /></div>
          <ActivityFeed activity={overview.activity} />
        </Panel>
      </div>

      <div className="admin-system-strip">
        <div className="system-strip-title"><ShieldCheck size={18} /><div><strong>System health</strong><span>Everything the operator needs to trust the signal</span></div></div>
        <SystemCheck label="API" value={overview.system.api} ok />
        <SystemCheck label="Database" value={overview.system.database} ok />
        <SystemCheck label="Intelligence" value={overview.system.ai_configured ? "Connected" : "Needs key"} ok={overview.system.ai_configured} />
        <SystemCheck label="Billing" value={overview.system.stripe_configured ? "Connected" : "Needs key"} ok={overview.system.stripe_configured} />
      </div>

      <div className="admin-command-deck">
        <div><p className="panel-kicker">Operator shortcuts</p><h2>Move with intent.</h2><span>Jump straight into the work that needs attention.</span></div>
        <div className="admin-command-actions">
          <button onClick={onUsers}><Users size={15} /><span><strong>Review people</strong><small>{stats.active_users} active accounts</small></span><ArrowRight size={14} /></button>
          <button onClick={onIntelligence}><BrainCircuit size={15} /><span><strong>Inspect intelligence</strong><small>{stats.intelligence_runs_30d} runs in 30 days</small></span><ArrowRight size={14} /></button>
          <button onClick={onFounding}><Crown size={15} /><span><strong>Watch founding seats</strong><small>{Math.max(0, 500 - stats.founding_members)} remaining</small></span><ArrowRight size={14} /></button>
        </div>
      </div>
    </>
  );
}

function UsersView({ users, total, offset, search, setSearch, statusFilter, setStatusFilter, tierFilter, setTierFilter, onPageChange, onSelectUser }: { users: AdminUser[]; total: number; offset: number; search: string; setSearch: (value: string) => void; statusFilter: string; setStatusFilter: (value: string) => void; tierFilter: string; setTierFilter: (value: string) => void; onPageChange: (offset: number) => void; onSelectUser: (id: string) => void }) {
  return (
    <Panel className="admin-table-panel users-panel">
      <div className="panel-heading users-panel-heading"><div><p className="panel-kicker">Directory · {total} total</p><h2>Every person, one clear view</h2></div><span className="admin-mini-label"><Database size={13} /> Live records</span></div>
      <div className="admin-toolbar">
        <div className="admin-search"><Search size={16} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search name or email" /><kbd>⌘K</kbd></div>
        <label className="admin-select"><Filter size={14} /><select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}><option value="all">All statuses</option><option value="active">Active</option><option value="suspended">Suspended</option></select></label>
        <label className="admin-select"><Crown size={14} /><select value={tierFilter} onChange={event => setTierFilter(event.target.value)}><option value="all">All tiers</option><option value="free">Learn Me</option><option value="understand_me">Understand Me</option><option value="know_me">Know Me</option></select></label>
        <button className="admin-export-button" onClick={() => exportUsersCsv(users)}><Download size={14} /> Export</button>
      </div>
      <UserTable users={users} onSelectUser={onSelectUser} />
      {!users.length && <EmptyState icon={Users} title="No people match that filter" copy="Try a different name, email, tier, or status." />}
      <div className="admin-pagination"><span>Showing {users.length ? offset + 1 : 0}–{Math.min(offset + users.length, total)} of {total}</span><div><button onClick={() => onPageChange(offset - 50)} disabled={offset === 0}><ArrowLeft size={14} /> Previous</button><button onClick={() => onPageChange(offset + 50)} disabled={offset + 50 >= total}>Next <ArrowRight size={14} /></button></div></div>
    </Panel>
  );
}

function IntelligenceView({ data }: { data: AdminIntelligence | null }) {
  if (!data) return <LoadingCard label="Loading the intelligence pipeline…" />;
  const maxRuns = Math.max(...data.engines.map(engine => engine.runs), 1);
  return (
    <>
      <div className="admin-stat-grid three">
        <StatCard label="Engine runs" value={data.engines.reduce((sum, engine) => sum + engine.runs, 0)} caption="All time, across the registry" icon={BrainCircuit} tone="plum" />
        <StatCard label="Average confidence" value={`${Math.round(data.average_confidence * 100)}%`} caption="Across generated results" icon={Sparkles} tone="gold" />
        <StatCard label="Profiles building" value={data.profile_status.building || 0} caption={`${data.profile_status.ready || 0} ready to explore`} icon={Zap} tone="blue" />
      </div>
      <div className="admin-grid admin-grid-main">
        <Panel><div className="panel-heading"><div><p className="panel-kicker">Registry coverage</p><h2>Which engines are working</h2></div><BrainCircuit size={18} className="panel-muted-icon" /></div><div className="engine-list">{data.engines.map(engine => <div className="engine-row" key={engine.engine_id}><div className="engine-name"><span className="engine-mark"><Sparkles size={13} /></span><div><strong>{engine.engine_name}</strong><small>{engine.engine_id.toUpperCase()}</small></div></div><div className="engine-meter"><div style={{ width: `${(engine.runs / maxRuns) * 100}%` }} /><span>{engine.runs}</span></div></div>)}</div></Panel>
        <Panel><div className="panel-heading"><div><p className="panel-kicker">Quality signal</p><h2>Profile states</h2></div><ShieldCheck size={18} className="panel-muted-icon" /></div><div className="state-cards">{Object.entries(data.profile_status).map(([state, count]) => <div className="state-card" key={state}><span className={`state-icon ${state === "ready" ? "good" : "warm"}`}>{state === "ready" ? <CheckCircle2 size={16} /> : <Clock3 size={16} />}</span><strong>{count}</strong><span>{state.replaceAll("_", " ")}</span></div>)}</div><div className="confidence-callout"><Sparkles size={15} /><span>Average confidence is <strong>{Math.round(data.average_confidence * 100)}%</strong></span></div></Panel>
      </div>
      <Panel className="admin-table-panel"><div className="panel-heading"><div><p className="panel-kicker">Recent output</p><h2>Latest intelligence activity</h2></div><span className="admin-mini-label"><Activity size={13} /> Live registry</span></div><div className="intelligence-table">{data.latest.map(item => <div className="intelligence-row" key={item.id}><div className="engine-mark"><Sparkles size={13} /></div><div className="intel-main"><strong>{item.engine_name}</strong><span>{item.user_name} · {formatDate(item.generated_at)}</span></div><span className="intel-source">{item.source}</span><span className="intel-confidence">{Math.round((item.confidence || 0) * 100)}%</span><StatusPill status={item.status} /></div>)}</div></Panel>
    </>
  );
}

function FoundingView({ data }: { data: AdminFounding | null }) {
  if (!data) return <LoadingCard label="Loading Founding 500 claims…" />;
  const { availability } = data;
  const claimedPercent = Math.min(100, ((availability.spots_claimed + availability.spots_reserved) / availability.limit) * 100);
  return (
    <>
      <div className="founding-hero"><div><p className="admin-eyebrow">Founding 500 · $19.99 locked pricing</p><h2>Build the first circle of members.</h2><p>Keep an eye on reservations, active founders, and the promise attached to every founding seat.</p></div><div className="founding-ring" style={{ "--progress": `${claimedPercent * 3.6}deg` } as CSSProperties}><div><strong>{availability.spots_claimed + availability.spots_reserved}</strong><span>of {availability.limit}</span></div></div></div>
      <div className="admin-stat-grid three"><StatCard label="Active founders" value={availability.spots_claimed} caption="Paid and claimed" icon={Crown} tone="gold" /><StatCard label="Held reservations" value={availability.spots_reserved} caption="Awaiting checkout" icon={Clock3} tone="blue" /><StatCard label="Seats remaining" value={availability.spots_remaining} caption={availability.available ? "Still open" : "Pool is full"} icon={Sparkles} tone="green" /></div>
      <Panel className="admin-table-panel"><div className="panel-heading"><div><p className="panel-kicker">Member ledger</p><h2>Founding claims</h2></div><span className="admin-mini-label"><Crown size={13} /> {data.claims.length} shown</span></div>{data.claims.length ? <div className="founding-table">{data.claims.map(claim => <div className="founder-row" key={claim.id}><div className="founder-number">#{String(claim.founder_number).padStart(3, "0")}</div><div className="intel-main"><strong>{claim.name}</strong><span>{claim.email}</span></div><StatusPill status={claim.status} /><span className="founder-date">{formatDate(claim.claimed_at || claim.reserved_at)}</span></div>)}</div> : <EmptyState icon={Crown} title="No founding claims yet" copy="The first member will appear here as soon as they reserve a seat." />}</Panel>
    </>
  );
}

function UserDrawer({ userId, onClose, onUpdated }: { userId: string; onClose: () => void; onUpdated: () => void }) {
  const [detail, setDetail] = useState<Awaited<ReturnType<typeof getAdminUser>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => { void getAdminUser(userId).then(setDetail).catch(error => setMessage(error instanceof Error ? error.message : "Unable to load this person")).finally(() => setLoading(false)); }, [userId]);
  async function save(data: { account_status?: string; subscription_tier?: string; role?: string }) {
    setSaving(true); setMessage("");
    try { await updateAdminUser(userId, data); setMessage("Saved"); setTimeout(onUpdated, 500); } catch (error) { setMessage(error instanceof Error ? error.message : "Could not save changes"); } finally { setSaving(false); }
  }
  return <div className="drawer-layer"><button className="drawer-scrim" onClick={onClose} aria-label="Close profile" /><aside className="admin-drawer"><div className="drawer-header"><div><p className="panel-kicker">Person record</p><h2>{detail?.user.name || "Loading…"}</h2></div><button className="admin-icon-btn" onClick={onClose} aria-label="Close"><X size={18} /></button></div>{loading ? <LoadingCard label="Loading person record…" /> : detail && <div className="drawer-body"><div className="drawer-identity"><div className="drawer-avatar">{initials(detail.user.name)}</div><div><strong>{detail.user.email}</strong><span>Joined {formatDate(detail.user.created_at)}</span></div></div><div className="drawer-badges"><StatusPill status={detail.user.account_status} /><TierPill tier={detail.user.tier} />{detail.user.founding_member && <span className="founder-badge"><Crown size={12} /> Founder #{String(detail.user.founder_number || 0).padStart(3, "0")}</span>}</div><div className="drawer-section"><p className="panel-kicker">Signal snapshot</p><div className="drawer-metrics"><Metric label="Pull Score" value={detail.user.pull_score == null ? "—" : String(Math.round(detail.user.pull_score))} /><Metric label="Confidence" value={detail.user.confidence == null ? "—" : `${Math.round(detail.user.confidence * 100)}%`} /><Metric label="Sessions" value={String(detail.counts.assessment_responses || 0)} /></div></div><div className="drawer-section"><p className="panel-kicker">Access controls</p><div className="drawer-controls"><label>Account status<select value={detail.user.account_status} onChange={event => void save({ account_status: event.target.value })} disabled={saving}><option value="active">Active</option><option value="suspended">Suspended</option></select></label><label>Subscription tier<select value={detail.user.tier} onChange={event => void save({ subscription_tier: event.target.value })} disabled={saving}><option value="free">Learn Me</option><option value="understand_me">Understand Me</option><option value="know_me">Know Me</option><option value="premium">Premium (legacy)</option><option value="elite">Elite (legacy)</option></select></label><label>Role<select value={detail.user.role} onChange={event => void save({ role: event.target.value })} disabled={saving}><option value="user">User</option><option value="admin">Admin</option><option value="superadmin">Superadmin</option></select></label></div>{message && <p className="drawer-message">{message}</p>}</div><div className="drawer-section"><p className="panel-kicker">Profile basics</p><div className="drawer-facts"><Fact label="Birthplace" value={String(detail.profile.birthplace_canonical || detail.profile.birthplace || "Not provided")} /><Fact label="Journey" value={String(detail.profile.journey_state || "New user")} /><Fact label="Intelligence" value={String(detail.intelligence.profile_status || "Not started")} /><Fact label="Narrative" value={String(detail.intelligence.narrative_state || "Not started")} /></div></div></div>}</aside></div>;
}

function UserTable({ users, onSelectUser, compact = false }: { users: AdminUser[]; onSelectUser: (id: string) => void; compact?: boolean }) {
  return <div className={`admin-user-table ${compact ? "compact" : ""}`}><div className="user-table-head"><span>Person</span><span>Tier</span><span>Status</span><span>Pull Score</span><span>Joined</span><span /></div>{users.map(user => <div className="user-table-row" key={user.id}><button className="person-cell" onClick={() => onSelectUser(user.id)}><span className="table-avatar">{initials(user.name)}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></button><TierPill tier={user.tier} /><StatusPill status={user.account_status} /><span className="score-cell">{user.pull_score == null ? <span className="muted-dash">—</span> : Math.round(user.pull_score)}</span><span className="date-cell">{formatDate(user.created_at)}</span><button className="row-more" onClick={() => onSelectUser(user.id)} aria-label={`Open ${user.name}`}><ChevronRight size={16} /></button></div>)}</div>;
}

function ActivityFeed({ activity }: { activity: AdminOverview["activity"] }) {
  return <div className="activity-feed">{activity.length ? activity.map(item => <div className="activity-item" key={item.id}><span className={`activity-icon ${item.kind}`}><Activity size={14} /></span><div><strong>{item.title}</strong><span>{item.detail}</span></div><time>{formatDate(item.created_at)}</time></div>) : <EmptyState icon={Activity} title="No activity yet" copy="New platform events will appear here." />}</div>;
}

function StatCard({ label, value, caption, icon: Icon, tone }: { label: string; value: number | string; caption: string; icon: IconType; tone: string }) { return <div className="admin-stat-card"><div className={`stat-icon ${tone}`}><Icon size={17} /></div><div className="stat-label">{label}</div><strong className="stat-value">{value}</strong><span className="stat-caption">{caption}</span></div>; }
function TierBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) { return <div className="tier-row"><div><span>{label}</span><strong>{value}</strong></div><div className="tier-track"><span style={{ width: `${total ? Math.max(value ? 3 : 0, (value / total) * 100) : 0}%`, background: color }} /></div></div>; }
function SystemCheck({ label, value, ok }: { label: string; value: string; ok: boolean }) { return <div className="system-check"><span className={ok ? "check-ok" : "check-warn"}>{ok ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}</span><div><small>{label}</small><strong>{value}</strong></div></div>; }
function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <section className={`admin-panel ${className}`}>{children}</section>; }
function StatusPill({ status }: { status: string }) { return <span className={`status-pill ${status === "active" || status === "complete" || status === "completed" || status === "ready" ? "positive" : status === "suspended" || status === "failed" ? "negative" : "neutral"}`}><span />{status.replaceAll("_", " ")}</span>; }
function TierPill({ tier }: { tier: string }) { const label = tier === "free" ? "Learn Me" : tier === "understand_me" || tier === "premium" ? "Understand Me" : "Know Me"; return <span className={`tier-pill ${tier}`}><span />{label}</span>; }
function Metric({ label, value }: { label: string; value: string }) { return <div><strong>{value}</strong><span>{label}</span></div>; }
function Fact({ label, value }: { label: string; value: string }) { return <div><span>{label}</span><strong>{value}</strong></div>; }
function LoadingCard({ label }: { label: string }) { return <div className="admin-loading-card"><RefreshCw size={18} className="spin" /><span>{label}</span></div>; }
function EmptyState({ icon: Icon, title, copy }: { icon: IconType; title: string; copy: string }) { return <div className="admin-empty"><Icon size={20} /><strong>{title}</strong><span>{copy}</span></div>; }
function AdminCommandPalette({ view, onClose, onNavigate, onRefresh }: { view: View; onClose: () => void; onNavigate: (view: View) => void; onRefresh: () => void }) {
  const [query, setQuery] = useState("");
  const actions = [
    { id: "overview" as View, label: "Open command centre", hint: "Platform pulse", icon: LayoutDashboard },
    { id: "users" as View, label: "Review people", hint: "Users and access", icon: Users },
    { id: "intelligence" as View, label: "Inspect intelligence", hint: "Pipeline health", icon: BrainCircuit },
    { id: "founding" as View, label: "Watch founding 500", hint: "Claims and seats", icon: Crown },
  ].filter(action => `${action.label} ${action.hint}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="command-layer"><button className="command-scrim" onClick={onClose} aria-label="Close command palette" /><section className="command-palette" role="dialog" aria-modal="true" aria-label="Admin command palette"><div className="command-heading"><div><p className="panel-kicker">Operator command</p><h2>What are you looking for?</h2></div><button className="admin-icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button></div><div className="command-search"><Search size={16} /><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a view or action" /><kbd>esc</kbd></div><div className="command-list">{actions.map(action => { const Icon = action.icon; return <button key={action.id} className={`command-item ${view === action.id ? "current" : ""}`} onClick={() => onNavigate(action.id)}><span className="command-item-icon"><Icon size={16} /></span><span><strong>{action.label}</strong><small>{action.hint}</small></span><ArrowRight size={14} /></button>; })}{!actions.length && <EmptyState icon={Search} title="No command found" copy="Try a different search." />}</div><div className="command-footer"><button onClick={onRefresh}><RefreshCw size={13} /> Refresh live data</button><span><Keyboard size={13} /> Use ⌘K anytime</span></div></section></div>;
}
function exportUsersCsv(users: AdminUser[]) {
  const headers = ["Name", "Email", "Role", "Status", "Tier", "Onboarding", "Founding member", "Founder number", "Pull score", "Joined"];
  const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const rows = users.map(user => [user.name, user.email, user.role, user.account_status, user.tier, user.onboarding_complete ? "Complete" : "Incomplete", user.founding_member ? "Yes" : "No", user.founder_number ?? "", user.pull_score ?? "", user.created_at ?? ""].map(escape).join(","));
  const blob = new Blob([[headers.map(escape).join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mypullscore-users-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
function AdminLogo() { return <Image src="/favicon-32.png" alt="MyPullScore" width={58} height={58} priority />; }
function AdminLoading() { return <div className="admin-loading-screen"><div className="admin-loader-mark"><AdminLogo /></div><strong>Opening command centre…</strong><span>Checking your operator access</span></div>; }
function AdminDenied({ message, onBack }: { message: string; onBack: () => void }) { return <div className="admin-loading-screen"><div className="admin-loader-mark warning"><AdminLogo /></div><strong>Admin access required</strong><span>{message}</span><button className="admin-button primary" onClick={onBack}>Return to MyPullScore</button></div>; }
function sectionDescription(view: View) { return { overview: "", users: "Search people, check access, and keep the membership experience healthy.", intelligence: "Watch the intelligence pipeline from question evidence to living profile.", founding: "A single source of truth for the first 500 members." }[view]; }
function percent(value: number, total: number) { return total ? Math.round((value / total) * 100) : 0; }
function initials(value: string) { return value.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase() || "—"; }
function formatDate(value?: string | null) { if (!value) return "—"; const date = new Date(value); if (Number.isNaN(date.getTime())) return "—"; return date.toISOString().slice(0, 10); }
