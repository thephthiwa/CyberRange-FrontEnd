import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Target,
  FlaskConical,
  Satellite,
  Radar,
  FileSearch,
  Crosshair,
  Factory,
  Sun,
  Moon,
  Crown,
  Settings,
  Activity,
  Server,
  Users,
  Search,
  Gauge,
  Bell,
  Play,
  RotateCw,
  Camera,
  Copy,
  X,
  Bug
} from "lucide-react";

// -----------------------------
// Color / Theme helpers
// -----------------------------
const themeClasses = {
  dark:
    "bg-[#070B17] text-slate-100 selection:bg-sky-500/30 selection:text-sky-50",
  light:
    "bg-[#F7FAFF] text-slate-900 selection:bg-sky-300/60 selection:text-slate-900",
};

// -----------------------------
// Mock Data: Labs Catalog
// -----------------------------
const LABS = [
  {
    key: "pentest",
    name: "Pentest Range",
    desc: "Offensive operations playground for exploit practice.",
    icon: Target,
    accent: "from-rose-600/70 to-rose-400/30",
    ring: "ring-rose-500/40",
    tag: ["Offense", "Exploit", "Red Team"],
  },
  {
    key: "virtual",
    name: "Virtual Lab",
    desc: "Spin up VMs, clone, snapshot. Safe sandboxes.",
    icon: FlaskConical,
    accent: "from-blue-600/70 to-blue-400/30",
    ring: "ring-sky-400/50",
    tag: ["VM", "Snapshot", "Infra"],
  },
  {
    key: "realworld",
    name: "Real‑World Simulator",
    desc: "Mission scenarios mirroring live environments.",
    icon: Satellite,
    accent: "from-indigo-600/70 to-indigo-400/30",
    ring: "ring-indigo-400/50",
    tag: ["Mission", "Scenario"],
  },
  {
    key: "soc",
    name: "SOC Simulator",
    desc: "Detect, analyze & respond like a SOC analyst.",
    icon: Shield,
    accent: "from-emerald-600/70 to-emerald-400/30",
    ring: "ring-emerald-400/50",
    tag: ["Blue Team", "IR", "SIEM"],
  },
  {
    key: "logs",
    name: "Log Analysis Exercise",
    desc: "Investigate patterns & anomalies across datasets.",
    icon: FileSearch,
    accent: "from-sky-600/70 to-sky-400/30",
    ring: "ring-sky-400/50",
    tag: ["Detection", "Parsing", "Regex"],
  },
  {
    key: "hunt",
    name: "Threat Hunting Lab",
    desc: "Pursue adversaries across systems & telemetry.",
    icon: Crosshair,
    accent: "from-lime-600/70 to-lime-400/30",
    ring: "ring-lime-400/50",
    tag: ["Hunt", "Telemetry", "Hypothesis"],
  },
  {
    key: "ot",
    name: "OT Scenario Lab",
    desc: "Simulate ICS/SCADA and secure PLC networks.",
    icon: Factory,
    accent: "from-amber-600/70 to-amber-400/30",
    ring: "ring-amber-400/60",
    tag: ["OT", "ICS", "PLC"],
  },
];

// -----------------------------
// Role definitions
// -----------------------------
const ROLES = [
  { key: "commander", name: "Commander", icon: Crown, note: "Full spectrum ops & oversight" },
  { key: "operator", name: "Operator", icon: Activity, note: "Execute assigned missions" },
  { key: "observer", name: "Observer", icon: Users, note: "Read‑only overview & replay" },
];

// -----------------------------
// Diagnostics (lightweight runtime tests)
// -----------------------------
function DiagnosticsBar() {
  const checks = [
    { label: "framer-motion: motion", pass: !!motion && typeof motion.div === "function" },
    { label: "framer-motion: AnimatePresence", pass: typeof AnimatePresence !== "undefined" },
  ];
  return (
    <div className="mx-auto mt-2 max-w-7xl px-4">
      <div className="flex flex-wrap gap-2 text-xs">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${
              c.pass
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                : "border-rose-500/40 bg-rose-500/10 text-rose-200"
            }`}
            title={c.pass ? "OK" : "Missing/undefined"}
          >
            <Bug className="h-3.5 w-3.5" /> {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// -----------------------------
// Radar Animated Background
// -----------------------------
function RadarBackground({ mode }: { mode: "dark" | "light" }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Concentric pulse */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50">
        <div className="relative">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute inset-0 rounded-full border ${
                mode === "dark" ? "border-sky-500/10" : "border-sky-600/10"
              } animate-[ping_8s_linear_infinite]`}
              style={{
                width: `${300 + i * 220}px`,
                height: `${300 + i * 220}px`,
                margin: "auto",
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Sweeping arm */}
      <div
        className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(56,189,248,0.10) 30deg, transparent 60deg)",
          animation: "spin 20s linear infinite",
          maskImage: "radial-gradient(circle, black 60%, transparent 61%)",
          WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 61%)",
        }}
      />
    </div>
  );
}

// -----------------------------
// Top Bar
// -----------------------------
function TopBar({ mode, setMode }: { mode: "dark" | "light"; setMode: (m: "dark" | "light") => void }) {
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Radar className="h-6 w-6 text-sky-400" />
          <div className="text-lg font-semibold tracking-wide">RTAF CyberRange • Practice Lab</div>
          <span className="ml-2 rounded-full border border-sky-500/30 px-2 py-0.5 text-xs text-sky-300">ONLINE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-500/20 bg-slate-500/10 px-3 py-1.5 text-xs md:flex">
            <Server className="mr-1 h-4 w-4" /> System Load: <span className="ml-1 font-semibold">37%</span>
            <span className="mx-2 h-3 w-px bg-slate-500/30" />
            <Users className="mr-1 h-4 w-4" /> Active: <span className="ml-1 font-semibold">128</span>
          </div>
          <button
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-500/20 bg-slate-500/10 px-3 py-1.5 text-sm hover:bg-slate-500/20"
            aria-label="Toggle theme"
          >
            {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>{mode === "dark" ? "Day" : "Night"} Mode</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-500/20 bg-slate-500/10 px-3 py-1.5 text-sm hover:bg-slate-500/20">
            <Settings className="h-4 w-4" /> Settings
          </button>
        </div>
      </div>
      <div className="border-t border-b border-sky-500/10 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent px-4 py-1 text-center text-xs">
        <span className="inline-flex items-center gap-2"><Bell className="h-3.5 w-3.5" /> Mission Update: New OT Scenario released • PLC S7Comm fuzzing lab now live.</span>
      </div>
    </div>
  );
}

// -----------------------------
// Sidebar Navigation
// -----------------------------
function Sidebar() {
  const NavItem = ({ icon: Icon, label, active = false }: any) => (
    <div
      className={`group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
        active
          ? "bg-sky-500/15 text-sky-300 ring-1 ring-inset ring-sky-500/30"
          : "hover:bg-white/5 text-slate-300"
      }`}
    >
      <Icon className="h-4.5 w-4.5" />
      <span>{label}</span>
    </div>
  );

  return (
    <aside className="sticky top-[70px] hidden h-[calc(100vh-70px)] w-64 shrink-0 border-r border-slate-500/20 px-3 pt-6 md:block">
      <div className="space-y-2">
        <NavItem icon={Radar} label="Home (Radar Overview)" active />
        <NavItem icon={Shield} label="Labs" />
        <NavItem icon={Gauge} label="Scoreboard" />
        <NavItem icon={FileSearch} label="Mission Log" />
        <NavItem icon={Users} label="Debriefing Room" />
      </div>
      <div className="mt-6 rounded-xl border border-slate-500/20 bg-slate-500/10 p-3">
        <div className="mb-1 text-xs uppercase tracking-wider text-slate-400">System Health</div>
        <div className="flex items-center justify-between text-sm">
          <span>Cluster</span>
          <span className="font-semibold text-emerald-400">Nominal</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-600/30">
          <div className="h-full w-2/5 animate-pulse bg-sky-400/70" />
        </div>
      </div>
    </aside>
  );
}

// -----------------------------
// Role Switcher
// -----------------------------
function RoleSwitcher({ role, setRole }: { role: string; setRole: (r: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {ROLES.map((r) => (
        <button
          key={r.key}
          onClick={() => setRole(r.key)}
          className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-1.5 text-sm transition ${
            role === r.key
              ? "border-sky-400/50 bg-sky-400/10 text-sky-200"
              : "border-slate-500/20 bg-slate-500/10 text-slate-300 hover:bg-slate-500/20"
          }`}
          title={r.note}
        >
          <r.icon className="h-4 w-4" />
          {r.name}
        </button>
      ))}
    </div>
  );
}

// -----------------------------
// Lab Card
// -----------------------------
function LabCard({ lab, mode, onEnter }: { lab: any; mode: "dark" | "light"; onEnter: (lab:any)=>void }) {
  const Icon = lab.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className={`group relative overflow-hidden rounded-2xl border p-4 ${
        mode === "dark"
          ? "border-slate-500/20 bg-slate-900/50"
          : "border-slate-300/50 bg-white"
      }`}
    >
      {/* Accent gradient */}
      <div className={`pointer-events-none absolute -inset-1 -z-0 opacity-0 blur-xl transition duration-500 group-hover:opacity-60 bg-gradient-to-tr ${lab.accent}`} />

      <div className="relative z-10 flex items-start gap-3">
        <div className={`rounded-xl p-2 ring-1 ${lab.ring} bg-slate-900/20`}> 
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-base font-semibold tracking-wide">{lab.name}</h3>
            <span className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">Lab</span>
          </div>
          <p className="text-sm text-slate-300/90">{lab.desc}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {lab.tag.map((t: string) => (
              <span key={t} className="rounded-full border border-slate-500/20 bg-slate-500/10 px-2 py-0.5 text-[11px] text-slate-300">{t}</span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => onEnter(lab)} className="rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-400/20">
              Enter Lab
            </button>
            <button className="rounded-xl border border-slate-500/30 bg-slate-500/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-500/20">
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Decorative sweep */}
      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rotate-12 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-xl transition-all duration-500 group-hover:scale-125" />
    </motion.div>
  );
}

// -----------------------------
// Lab Modal (Enter Lab -> modal/route with topology & actions)
// -----------------------------
function LabModal({ lab, onClose }: { lab: any; onClose: () => void }) {
  const topo = {
    pentest: { nodes: ["Attacker VM", "Jump Host", "Target Web", "DB"], edges: [[0,1],[1,2],[2,3]] },
    virtual: { nodes: ["VM-1", "VM-2", "VM-3", "Gateway"], edges: [[0,3],[1,3],[2,3]] },
    realworld: { nodes: ["Branch", "HQ SOC", "DMZ", "ERP"], edges: [[0,2],[2,1],[2,3]] },
    soc: { nodes: ["Sensor", "Logstash", "SIEM", "SOAR"], edges: [[0,1],[1,2],[2,3]] },
    logs: { nodes: ["Firewall", "EDR", "Syslog", "Data Lake"], edges: [[0,2],[1,2],[2,3]] },
    hunt: { nodes: ["Telemetry", "Hive", "SandBox", "Case Mgmt"], edges: [[0,1],[1,2],[1,3]] },
    ot: { nodes: ["HMI", "SCADA", "PLC", "Sensor"], edges: [[0,1],[1,2],[2,3]] },
  }[lab.key] || { nodes: ["A","B"], edges: [[0,1]] };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-500/30 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-500/20 p-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Enter Lab</div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{lab.name}</h3>
              <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">{lab.key}</span>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl border border-slate-500/30 bg-slate-800 px-3 py-1.5 text-sm hover:bg-slate-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-2 text-xs uppercase tracking-wider text-slate-400">Topology</div>
            <div className="relative h-72 rounded-xl border border-slate-500/20 bg-slate-800/60 p-3">
              <div className="absolute inset-0">
                {topo.edges.map((e: number[], i: number) => (
                  <div key={i} className="absolute h-0.5 bg-sky-400/40"
                    style={{
                      left: `${15 + (topo.nodes[e[0]].length * 1) + (e[0]*22)}%`,
                      top: `${20 + e[0]*15}%`,
                      width: `${30 + (e[1]-e[0])*18}%`,
                    }}
                  />
                ))}
                {topo.nodes.map((n: string, i: number) => (
                  <div key={n} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-sky-400/40 bg-slate-900/70 px-3 py-1.5 text-xs"
                    style={{ left: `${20 + i*20}%`, top: `${25 + (i%3)*20}%` }}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="mb-2 text-xs uppercase tracking-wider text-slate-400">Actions</div>
            <div className="space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/50 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/20"
                onClick={() => alert(`Mission started in ${lab.name}`)}
              >
                <Play className="h-4 w-4" /> Start Mission
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/50 bg-sky-400/10 px-3 py-2 text-sm text-sky-200 hover:bg-sky-400/20"
                onClick={() => alert(`Clone triggered for ${lab.name}`)}
              >
                <Copy className="h-4 w-4" /> Clone
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-400/50 bg-indigo-400/10 px-3 py-2 text-sm text-indigo-200 hover:bg-indigo-400/20"
                onClick={() => alert(`Snapshot saved for ${lab.name}`)}
              >
                <Camera className="h-4 w-4" /> Snapshot
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/50 bg-rose-400/10 px-3 py-2 text-sm text-rose-200 hover:bg-rose-400/20"
                onClick={() => confirm('Reset lab environment?') && alert(`Reset executed for ${lab.name}`)}
              >
                <RotateCw className="h-4 w-4" /> Reset
              </button>
            </div>
            <div className="mt-4 rounded-xl border border-slate-500/20 bg-slate-800 p-3 text-xs text-slate-300">
              <div className="mb-1 font-semibold">Lab Brief</div>
              <p>{lab.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Bottom Status Bar
// -----------------------------
function StatusBar() {
  return (
    <div className="sticky bottom-0 z-30 mt-6 border-t border-slate-500/20 bg-black/20 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1"><Activity className="h-3.5 w-3.5" /> Netflow: <strong className="ml-1">2.3 Gbps</strong></span>
          <span className="inline-flex items-center gap-1"><Server className="h-3.5 w-3.5" /> Pods: <strong className="ml-1">84</strong></span>
          <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Participants: <strong className="ml-1">312</strong></span>
        </div>
        <div className="text-slate-400">© RTAF Cyber Command • Practice Range</div>
      </div>
    </div>
  );
}

// -----------------------------
// Search & Filters
// -----------------------------
function Filters({ q, setQ }: { q: string; setQ: (s: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search labs (e.g., OT, SIEM, exploit)"
          className="w-72 rounded-xl border border-slate-500/20 bg-slate-500/10 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-sky-400/40 focus:ring-1 focus:ring-sky-400/40"
        />
      </div>
    </div>
  );
}

// -----------------------------
// MAIN EXPORT: Practice Lab Dashboard
// -----------------------------
export default function PracticeLabDashboard() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [role, setRole] = useState("commander");
  const [q, setQ] = useState("");
  const [activeLab, setActiveLab] = useState<any | null>(null);

  const filtered = useMemo(() => {
    let base = LABS;
    if (role === "operator") base = LABS.filter((l) => ["pentest", "soc", "logs", "hunt"].includes(l.key));
    if (role === "observer") base = LABS.filter((l) => ["realworld", "soc", "ot"].includes(l.key));
    if (!q) return base;
    const s = q.toLowerCase();
    return base.filter((l) => [l.name, l.desc, ...(l.tag as string[])].join(" ").toLowerCase().includes(s));
  }, [role, q]);

  React.useEffect(() => {
    const handler = () => {
      const m = window.location.hash.match(/#\/[a-z]+\/(.+)$/) || window.location.hash.match(/#\/labs\/(.+)$/);
      if (m && m[1]) {
        const found = LABS.find((l) => l.key === m[1]);
        setActiveLab(found || null);
      } else {
        setActiveLab(null);
      }
    };
    window.addEventListener('hashchange', handler);
    handler();
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const openLab = (lab:any) => {
    setActiveLab(lab);
    window.location.hash = `#/labs/${lab.key}`;
  };
  const closeLab = () => {
    setActiveLab(null);
    window.location.hash = '#/';
  };

  return (
    <div className={`${themeClasses[mode]} min-h-screen w-full antialiased`}> 
      <RadarBackground mode={mode} />
      <TopBar mode={mode} setMode={setMode} />

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-6">
          <Sidebar />

          {/* Main content */}
          <main className="relative z-10 flex-1 py-8">
            {/* Page Header */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400">Mode</div>
                <h1 className="text-2xl font-semibold tracking-wide">Practice Lab Command Center</h1>
                <div className="mt-1 text-sm text-slate-400">Airbase Tactical • RTAF Cyber Command</div>
              </div>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <RoleSwitcher role={role} setRole={setRole} />
                <Filters q={q} setQ={setQ} />
              </div>
            </div>

            {/* Labs Grid */}
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((lab) => (
                  <LabCard key={lab.key} lab={lab} mode={mode} onEnter={openLab} />
                ))}
              </div>
            </AnimatePresence>

            {/* Mini analytics strip */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[{ label: "Avg. Completion", val: "74%" }, { label: "Live Missions", val: "12" }, { label: "Alerts (24h)", val: "58" }].map((m) => (
                <div key={m.label} className="rounded-2xl border border-slate-500/20 bg-slate-500/10 p-4">
                  <div className="text-xs uppercase tracking-wider text-slate-400">{m.label}</div>
                  <div className="mt-1 text-2xl font-semibold">{m.val}</div>
                </div>
              ))}
            </div>

            {/* Runtime diagnostics (acts like lightweight tests) */}
            <DiagnosticsBar />
          </main>
        </div>
      </div>

      {activeLab && <LabModal lab={activeLab} onClose={closeLab} />}

      <StatusBar />

      {/* Global styles for spin animation (radar) */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
