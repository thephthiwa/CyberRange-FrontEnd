import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Sword,
  Radar,
  SatelliteDish,
  Activity,
  Terminal,
  AlarmClock,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Bell,
  Users,
  Trophy,
  Cpu,
  Flame,
  Map,
  Moon,
  Sun,
  BadgeCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

/**
 * RTAF Cyber Range – Attack/Defend Prototype (v2)
 * - Fix attack path alignment (single overlay SVG, proper coords, rounded caps, unique gradients)
 * - Role-based UI: Commander / Operator / Observer (read-only)
 * - RTAF Space Command theme with Day/Night toggle
 * - Audio alerts via WebAudio (no assets required)
 */

// ------- Mock Data -------
const trafficData = Array.from({ length: 24 }).map((_, i) => ({
  t: `${i}:00`,
  in: Math.round(120 + Math.sin(i / 2) * 60 + Math.random() * 30),
  out: Math.round(100 + Math.cos(i / 2.2) * 50 + Math.random() * 40),
}));

const teams = [
  { id: "blue", name: "Blue Team", color: "#38bdf8" },
  { id: "red", name: "Red Team", color: "#ef4444" },
  { id: "green", name: "Referee", color: "#22c55e" },
];

const initialNodes = [
  { id: "blue-gw", team: "blue", type: "gateway", x: 15, y: 60, hp: 92 },
  { id: "blue-s1", team: "blue", type: "server", x: 35, y: 30, hp: 80 },
  { id: "blue-s2", team: "blue", type: "server", x: 35, y: 70, hp: 64 },
  { id: "red-gw", team: "red", type: "gateway", x: 85, y: 40, hp: 90 },
  { id: "red-s1", team: "red", type: "server", x: 65, y: 20, hp: 76 },
  { id: "red-s2", team: "red", type: "server", x: 65, y: 60, hp: 58 },
];

const initialAttacks = [
  { id: "a1", from: "red-gw", to: "blue-s1", severity: 0.7 },
  { id: "a2", from: "red-s2", to: "blue-gw", severity: 0.5 },
  { id: "a3", from: "blue-s2", to: "red-s1", severity: 0.35 },
];

// ------- Small UI helpers -------
const Badge = ({ children, color = "sky" }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-${color}-500/10 text-${color}-300 border border-${color}-400/20`}>{children}</span>
);

const GlowCard = ({ children, className = "" }) => (
  <div className={`relative rounded-2xl p-4 bg-slate-900/60 border border-cyan-400/20 shadow-[0_0_40px_#06b6d4_/_10%] backdrop-blur ${className}`}>
    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />
    <div className="relative">{children}</div>
  </div>
);

// ------- Login Screen -------
function LoginScreen({ onLogin }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.09),transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(217,70,239,0.07),transparent_60%)]"/>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <GlowCard className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <motion.div className="h-12 w-12 rounded-xl bg-cyan-500/20 grid place-items-center border border-cyan-400/30" animate={{ boxShadow: ["0 0 0px #06b6d4", "0 0 24px #06b6d4"] }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}>
                <Radar className="h-6 w-6 text-cyan-300" />
              </motion.div>
              <div className="absolute -inset-1 -z-10 blur-xl bg-cyan-500/20 rounded-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-wide">RTAF Cyber Command</h1>
              <p className="text-sm text-slate-400">Cyber Range – Combat Access Gate</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400">Callsign / Username</label>
              <input className="mt-1 w-full rounded-xl bg-slate-950/60 border border-slate-700/60 px-3 py-2 outline-none focus:border-cyan-400/60" placeholder="Lt.Thanagrit"/>
            </div>
            <div>
              <label className="text-xs text-slate-400">Access Key</label>
              <input type="password" className="mt-1 w-full rounded-xl bg-slate-950/60 border border-slate-700/60 px-3 py-2 outline-none focus:border-cyan-400/60" placeholder="••••••••"/>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="accent-cyan-400"/> Remember me
              </label>
              <button className="text-cyan-300/90 hover:text-cyan-200">Request Access</button>
            </div>
          </div>

          <motion.button onClick={() => { setLoading(true); setTimeout(() => onLogin(), 700); }} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="mt-6 w-full rounded-xl bg-cyan-500/20 border border-cyan-400/40 py-2.5 font-medium tracking-wide hover:bg-cyan-500/25">
            {loading ? "Initializing…" : "ENTER COMBAT ZONE"}
          </motion.button>

          <div className="mt-4 text-[11px] text-slate-400 flex items-center gap-2">
            <SatelliteDish className="h-3.5 w-3.5"/> Secure uplink established · Build ADF-68
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}

// ------- Top Bar -------
function TopBar({ onLogout, role, setRole, theme, setTheme }) {
  return (
    <div className="h-14 w-full border-b border-cyan-400/20 bg-slate-950/70 backdrop-blur flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="h-9 w-9 rounded-lg grid place-items-center bg-cyan-500/15 border border-cyan-400/30">
          <Shield className="h-5 w-5 text-cyan-300"/>
        </motion.div>
        <div>
          <div className="text-sm font-medium tracking-wide">RTAF Cyber Range</div>
          <div className="text-[11px] text-slate-400 -mt-0.5">Attack–Defend Control Deck</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 mr-2">
          <Badge color="cyan">Wing 7 · 23rd Sq.</Badge>
          <Badge color="emerald"><BadgeCheck className="h-3 w-3"/> Clearance A2</Badge>
        </div>
        <select value={role} onChange={(e)=>setRole(e.target.value)} className="text-xs rounded-lg bg-slate-950/70 border border-slate-700/60 px-2 py-1">
          <option value="commander">Commander</option>
          <option value="operator">Operator</option>
          <option value="observer">Observer</option>
        </select>
        <button onClick={()=>setTheme(theme==="night"?"day":"night")} className="p-2 rounded-lg border border-slate-700/60 hover:bg-slate-900" title="Toggle Day/Night">
          {theme === "night" ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
        </button>
        <button className="p-2 rounded-lg border border-slate-700/60 hover:bg-slate-900"><Bell className="h-4 w-4"/></button>
        <button className="p-2 rounded-lg border border-slate-700/60 hover:bg-slate-900"><Settings className="h-4 w-4"/></button>
        <button onClick={onLogout} className="p-2 rounded-lg border border-rose-500/40 text-rose-300 hover:bg-rose-500/10"><LogOut className="h-4 w-4"/></button>
      </div>
    </div>
  );
}

// ------- Battlefield (Topology) -------
function Battlefield({ nodes, links, onPing, theme }) {
  const containerRef = useRef(null);

  return (
    <GlowCard className="col-span-8 h-[460px] overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm"><Map className="h-4 w-4"/> Real‑time Battlefield</div>
        <div className="text-xs text-slate-400">Drag-select disabled in prototype</div>
      </div>

      <div ref={containerRef} className={`relative h-[400px] rounded-xl overflow-hidden ${theme === "night" ? "bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(217,70,239,.08),transparent_50%)]" : "bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,.10),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(250,204,21,.08),transparent_55%)]"}`}>
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.07)_1px,transparent_1px)] bg-[size:36px_36px]" />

        {/* Single SVG overlay for perfect alignment */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            {links.map((ln) => (
              <linearGradient key={`grad-${ln.id}`} id={`grad-${ln.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444"/>
                <stop offset="60%" stopColor="#06b6d4"/>
              </linearGradient>
            ))}
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" />
            </marker>
          </defs>
          {links.map((ln) => {
            const from = nodes.find(n => n.id === ln.from);
            const to = nodes.find(n => n.id === ln.to);
            if (!from || !to) return null;
            const x1 = `${from.x}%`, y1 = `${from.y}%`, x2 = `${to.x}%`, y2 = `${to.y}%`;
            const width = 2 + ln.severity * 3;
            return (
              <motion.line
                key={ln.id}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={`url(#grad-${ln.id})`} strokeWidth={width}
                strokeOpacity={0.9} strokeLinecap="round"
                initial={{ strokeDasharray: 6, strokeDashoffset: 120 }}
                animate={{ strokeDashoffset: [120, 0, 120] }}
                transition={{ duration: 3 + Math.random() * 1.2, repeat: Infinity }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((n) => (
          <motion.div
            key={n.id}
            className="absolute"
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)" }}
            whileHover={{ scale: 1.04 }}
          >
            <button onClick={() => onPing(n)} className="relative rounded-2xl px-3 py-2 bg-slate-950/70 backdrop-blur border border-slate-700/60 shadow hover:shadow-cyan-500/20">
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${n.team === "blue" ? "bg-cyan-400" : n.team === "red" ? "bg-rose-400" : "bg-emerald-400"}`} />
                <div className="text-xs font-mono">{n.id}</div>
                <div className="text-[10px] text-slate-400">{n.type}</div>
              </div>
              <div className="mt-1 h-1.5 w-28 rounded bg-slate-800 overflow-hidden">
                <motion.div className={`h-full ${n.hp > 60 ? "bg-emerald-400" : n.hp > 35 ? "bg-amber-400" : "bg-rose-500"}`} style={{ width: `${n.hp}%` }} initial={{ width: 0 }} animate={{ width: `${n.hp}%` }} transition={{ duration: 0.8 }} />
              </div>
              <motion.div className="absolute -inset-1 rounded-2xl" animate={{ boxShadow: ["0 0 0px #06b6d4", n.team === "blue" ? "0 0 24px #06b6d4" : n.team === "red" ? "0 0 24px #ef4444" : "0 0 24px #22c55e"] }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }} />
            </button>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}

// ------- Panels -------
function AttackPanel({ readOnly }) {
  return (
    <GlowCard className="col-span-4 h-[460px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm"><Sword className="h-4 w-4"/> Attack Operations</div>
        <Badge color="sky">ROE-2</Badge>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <input className="flex-1 rounded-lg bg-slate-950/70 border border-slate-700/60 px-3 py-2 outline-none focus:border-cyan-400/60" placeholder="Target IP / CIDR e.g. 10.0.1.23" disabled={readOnly} />
          <button disabled={readOnly} className={`rounded-lg border border-cyan-400/40 px-3 py-2 ${readOnly?"opacity-40 pointer-events-none":"bg-cyan-500/10 hover:bg-cyan-500/20"}`}>Scan</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Recon", icon: Radar },
            { label: "Exploit", icon: Flame },
            { label: "Privilege", icon: Cpu },
          ].map(({ label, icon: Icon }) => (
            <button key={label} disabled={readOnly} className={`rounded-xl px-3 py-2 border border-slate-700/60 flex items-center gap-2 ${readOnly?"opacity-40 pointer-events-none":"hover:bg-slate-900"}`}>
              <Icon className="h-4 w-4"/> {label}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400">Console</div>
        <div className="h-44 rounded-xl bg-slate-950/70 border border-slate-700/60 p-2 font-mono text-[11px] overflow-auto">
          $ nmap -sV 10.0.1.23
Open: 22/ssh, 80/http, 6379/redis
$ exploit CVE-20xx-xxxx --target 10.0.1.23
[+] RCE achieved · dropping webshell…
        </div>
      </div>
    </GlowCard>
  );
}

function DefensePanel({ readOnly }) {
  return (
    <GlowCard className="col-span-4 h-[460px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4"/> Defense Operations</div>
        <Badge color="emerald">SOC Online</Badge>
      </div>
      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Deploy Patch" },
            { label: "Restart Service" },
            { label: "Traceback" },
          ].map(({ label }) => (
            <button key={label} disabled={readOnly} className={`rounded-xl px-3 py-2 border border-slate-700/60 ${readOnly?"opacity-40 pointer-events-none":"hover:bg-slate-900"}`}>{label}</button>
          ))}
        </div>
        <div className="text-xs text-slate-400">Intrusion Timeline</div>
        <div className="h-44 rounded-xl bg-slate-950/70 border border-slate-700/60 p-2 overflow-auto text-[11px] font-mono">
          [02:11:03] Suricata: ET EXPLOIT Redis protocol anomaly from 10.2.4.9
[02:11:36] WAF: SQLi pattern blocked /login
[02:12:00] SSH: 5 failed logins from 10.3.9.3
[02:12:21] IDS: Beaconing to 8.8.8.8 classified as benign
        </div>
        <div className="text-xs text-slate-400">Defense Health</div>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="t" hide/>
              <YAxis hide/>
              <Tooltip cursor={{ stroke: "#22c55e", strokeWidth: 1 }}/>
              <Area type="monotone" dataKey="in" stroke="#22c55e" fillOpacity={1} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlowCard>
  );
}

function IntelPanel() {
  return (
    <GlowCard className="col-span-4 h-[460px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm"><Terminal className="h-4 w-4"/> Intel & Logs</div>
        <Badge color="violet">AI Assist</Badge>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <input className="flex-1 rounded-lg bg-slate-950/70 border border-slate-700/60 px-3 py-2 outline-none focus:border-fuchsia-400/60" placeholder="Filter: src:10.0.0.0/8 AND event:exploit" />
          <button className="rounded-lg border border-fuchsia-400/40 px-3 py-2 bg-fuchsia-500/10 hover:bg-fuchsia-500/20">Search</button>
        </div>
        <div className="h-72 rounded-xl bg-slate-950/70 border border-slate-700/60 p-2 overflow-auto text-[11px] font-mono">
{`AI Suggestion: Prioritize patch on blue-s2 (Redis).
Top Talkers: 10.2.4.9, 10.3.9.3, 10.0.1.23
Flag Opportunity: red-s1 web upload endpoint vulnerable (CVE‑20xx‑xxxx).`}
        </div>
      </div>
    </GlowCard>
  );
}

function ScorePanel() {
  const scores = [
    { team: "Blue", atk: 5, def: 92, flags: 3, total: 695 },
    { team: "Red", atk: 8, def: 76, flags: 4, total: 710 },
  ];
  return (
    <GlowCard className="col-span-4 h-[460px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm"><Trophy className="h-4 w-4"/> Scoreboard</div>
        <Badge color="amber">Live</Badge>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {scores.map((s) => (
            <div key={s.team} className="rounded-xl border border-slate-700/60 p-3 bg-slate-950/70">
              <div className="flex items-center justify-between">
                <div className="font-medium">{s.team} Team</div>
                <div className="text-xs text-slate-400">Total {s.total}</div>
              </div>
              <div className="mt-2 grid grid-cols-3 text-xs gap-2">
                <div className="rounded-lg bg-slate-900 p-2">ATK <div className="text-cyan-300 text-base">{s.atk}</div></div>
                <div className="rounded-lg bg-slate-900 p-2">DEF <div className="text-emerald-300 text-base">{s.def}%</div></div>
                <div className="rounded-lg bg-slate-900 p-2">FLAGS <div className="text-amber-300 text-base">{s.flags}</div></div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <XAxis dataKey="t" hide/>
              <YAxis hide/>
              <Tooltip/>
              <Line type="monotone" dataKey="in" stroke="#38bdf8" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="out" stroke="#ef4444" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlowCard>
  );
}

// ------- WebAudio utility -------
function useAlertTone() {
  const ctxRef = useRef(null);
  function beep(freq = 880, ms = 160, gain = 0.03) {
    try {
      const ctx = (ctxRef.current ||= new (window.AudioContext || window.webkitAudioContext)());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.value = freq;
      g.gain.value = gain;
      o.connect(g).connect(ctx.destination);
      o.start();
      setTimeout(() => o.stop(), ms);
    } catch {}
  }
  return { beep };
}

// ------- Main Deck -------
function ControlDeck({ onLogout }) {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [nodes, setNodes] = useState(initialNodes);
  const [links, setLinks] = useState(initialAttacks);
  const [role, setRole] = useState("commander"); // commander | operator | observer
  const [theme, setTheme] = useState("night"); // night | day
  const readOnly = role === "observer";
  const { beep } = useAlertTone();

  // Fake pulse that changes HP a bit and triggers tone when severity high
  useEffect(() => {
    const t = setInterval(() => {
      setNodes((prev) => prev.map(n => ({ ...n, hp: Math.max(10, Math.min(100, n.hp + (Math.random() * 6 - 3))) })));
      // opportunistically change one link severity
      setLinks(prev => prev.map((l, i) => i !== Math.floor(Math.random()*prev.length) ? l : ({...l, severity: Math.max(.2, Math.min(1, l.severity + (Math.random()*0.4 - 0.2)))})));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  // Audio alert for high-severity paths
  useEffect(() => {
    const high = links.some(l => l.severity > 0.8);
    if (high) beep(980, 140, 0.05);
  }, [links]);

  const onPing = (node) => {
    // eslint-disable-next-line no-alert
    alert(`Ping ${node.id} (team: ${node.team})`);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === "night" ? "bg-[radial-gradient(circle_at_30%_10%,rgba(56,189,248,.06),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(217,70,239,.06),transparent_45%)]" : "bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(250,204,21,.12),transparent_50%)]"} text-slate-100`}>
      <TopBar onLogout={onLogout} role={role} setRole={setRole} theme={theme} setTheme={setTheme} />
      <div className="flex">
        <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="flex-1 p-4 grid grid-cols-12 gap-4">
          {/* Commander sees battlefield + both ops; Operator sees their ops first; Observer read-only */}
          <AnimatePresence mode="wait">
            {active === "dashboard" && (
              <motion.div key="dash" className="contents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Battlefield nodes={nodes} links={links} onPing={onPing} theme={theme} />
                {role !== "observer" ? <AttackPanel readOnly={readOnly} /> : <IntelPanel/>}
                <DefensePanel readOnly={readOnly} />
              </motion.div>
            )}
            {active === "attack" && (
              <motion.div key="attack" className="col-span-12" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-12 gap-4">
                  <GlowCard className="col-span-8 h-[540px]"><div className="text-sm flex items-center gap-2 mb-2"><Sword className="h-4 w-4"/> Target Visualization</div><div className="h-[480px] bg-slate-950/60 border border-slate-700/60 rounded-xl grid place-items-center">(Interactive map placeholder)</div></GlowCard>
                  <AttackPanel readOnly={readOnly} />
                </div>
              </motion.div>
            )}
            {active === "defense" && (
              <motion.div key="defense" className="col-span-12" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-12 gap-4">
                  <GlowCard className="col-span-8 h-[540px]"><div className="text-sm flex items-center gap-2 mb-2"><Shield className="h-4 w-4"/> SOC Overview</div><div className="h-[480px] bg-slate-950/60 border border-slate-700/60 rounded-xl grid place-items-center">(SOC widgets placeholder)</div></GlowCard>
                  <DefensePanel readOnly={readOnly} />
                </div>
              </motion.div>
            )}
            {active === "intel" && (
              <motion.div key="intel" className="col-span-12 grid grid-cols-12 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <IntelPanel/>
                <GlowCard className="col-span-8 h-[460px]">
                  <div className="flex items-center gap-2 text-sm mb-2"><Users className="h-4 w-4"/> Team Activity</div>
                  <div className="h-[400px] bg-slate-950/60 border border-slate-700/60 rounded-xl grid place-items-center">(Team comms / task board)</div>
                </GlowCard>
              </motion.div>
            )}
            {active === "score" && (
              <motion.div key="score" className="col-span-12 grid grid-cols-12 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ScorePanel/>
                <GlowCard className="col-span-8 h-[460px]">
                  <div className="flex items-center gap-2 text-sm mb-2"><AlarmClock className="h-4 w-4"/> Event Clock / Replay</div>
                  <div className="h-[400px] bg-slate-950/60 border border-slate-700/60 rounded-xl grid place-items-center">(Replay/Timeline placeholder)</div>
                </GlowCard>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  const items = [
    { id: "dashboard", label: "Mission Dashboard", icon: Activity },
    { id: "attack", label: "Attack Operations", icon: Sword },
    { id: "defense", label: "Defense Operations", icon: Shield },
    { id: "intel", label: "Intel & Logs", icon: Terminal },
    { id: "score", label: "Scoreboard", icon: Trophy },
  ];

  return (
    <div className={`h-[calc(100vh-56px)] border-r border-cyan-400/20 bg-slate-950/60 backdrop-blur ${collapsed ? "w-16" : "w-64"} transition-all`}>
      <div className="p-2 flex items-center justify-between">
        {!collapsed && <Badge color="cyan">Live Exercise</Badge>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg border border-slate-700/60 hover:bg-slate-900">
          {collapsed ? <ChevronRight className="h-4 w-4"/> : <ChevronLeft className="h-4 w-4"/>}
        </button>
      </div>
      <nav className="px-2 space-y-1 mt-1">
        {items.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActive(id)} className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 border text-left ${active === id ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-100" : "border-slate-700/60 text-slate-300 hover:bg-slate-900"} ${collapsed ? "justify-center" : ""}`}>
            <Icon className="h-4 w-4"/>
            {!collapsed && <span className="text-sm">{label}</span>}
          </button>
        ))}
      </nav>
      <div className="mt-auto p-3 text-[11px] text-slate-500">
        {!collapsed && (
          <div className="space-y-1">
            <div>Range ID: ADF-68</div>
            <div>Uptime: 03:24:19</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RTAFCyberRangeAttackDefend() {
  const [auth, setAuth] = useState(false);
  return auth ? <ControlDeck onLogout={() => setAuth(false)} /> : <LoginScreen onLogin={() => setAuth(true)} />;
}
