import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Shield, Radar, Airplay, Swords, Trophy, Power, LogOut,
  Map, Clock, Siren, Terminal, Radio, Activity, Users, BarChart3,
} from "lucide-react";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area
} from "recharts";

/**
 * RTAF KoTH — Airbase Tactical Theme
 * Single-file React prototype with Tailwind + shadcn/ui + Framer Motion + Recharts
 * Screens: Login -> Mode Dashboard -> KoTH Lobby/In-Game
 * Roles: Commander / Operator / Observer
 */

const Neon = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.65)]">{children}</span>
);

const Section = ({ title, children, right }: any) => (
  <Card className="bg-[#151b2e]/90 border-indigo-900/50 backdrop-blur-md shadow-xl">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sky-200 font-semibold tracking-wide uppercase text-sm flex items-center gap-2">
        <Radar className="size-4" /> {title}
      </CardTitle>
      {right}
    </CardHeader>
    <CardContent className="pt-0">{children}</CardContent>
  </Card>
);

/** Tactical Radar Canvas */
const RadarCanvas: React.FC<{ teamHue?: number; rings?: number }>
= ({ teamHue = 245, rings = 4 }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;

    // Background grid
    ctx.strokeStyle = "rgba(148, 163, 184, 0.06)"; ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 24) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let j = 0; j < h; j += 24) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke(); }

    // Concentric rings
    for (let r = 1; r <= rings; r++) {
      ctx.beginPath();
      ctx.strokeStyle = `hsla(${teamHue}, 90%, 60%, ${0.12 + r * 0.05})`;
      ctx.arc(cx, cy, (Math.min(cx, cy) - 8) * (r / rings), 0, Math.PI * 2);
      ctx.stroke();
    }

    // Sweep
    const angle = (tick % 360) * (Math.PI / 180);
    const radius = Math.min(cx, cy) - 8;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `hsla(${teamHue}, 100%, 60%, 0.0)`);
    grad.addColorStop(1, `hsla(${teamHue}, 100%, 60%, 0.16)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle - 0.35, angle + 0.35);
    ctx.closePath();
    ctx.fill();

    // Air routes (tactical lines)
    const routes = [
      [cx - radius * 0.9, cy - radius * 0.2, cx + radius * 0.8, cy + radius * 0.1],
      [cx - radius * 0.6, cy + radius * 0.5, cx + radius * 0.7, cy - radius * 0.4],
      [cx, cy - radius, cx, cy + radius],
    ];
    routes.forEach(([x1, y1, x2, y2], i) => {
      ctx.setLineDash([6, 8]);
      ctx.lineDashOffset = (tick * (i % 2 ? 1 : -1)) % 14;
      ctx.strokeStyle = `hsla(${teamHue}, 98%, 64%, 0.35)`;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    });

    // Base nodes
    const bases = [
      { x: cx - radius * 0.85, y: cy, name: "A" },
      { x: cx + radius * 0.85, y: cy - radius * 0.1, name: "B" },
      { x: cx - radius * 0.1, y: cy - radius * 0.85, name: "C" },
      { x: cx + radius * 0.1, y: cy + radius * 0.85, name: "D" },
    ];
    bases.forEach((b) => {
      ctx.fillStyle = `hsla(${teamHue}, 100%, 70%, 0.9)`;
      ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
      ctx.font = "12px ui-sans-serif"; ctx.textAlign = "center";
      ctx.fillText(`Base ${b.name}`, b.x, b.y - 8);
    });
  }, [tick, teamHue, rings]);
  return <canvas ref={ref} className="w-full h-full rounded-xl" />;
};

// Fake streaming data generator for domination chart
const useDominationFeed = () => {
  const [data, setData] = useState<{ t: number; alpha: number; bravo: number }[]>([]);
  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      setData((d) => {
        const t = Math.round((Date.now() - start) / 1000);
        const alpha = Math.max(0, Math.min(100, (d.at(-1)?.alpha ?? 50) + (Math.random() * 10 - 5)));
        const bravo = 100 - alpha;
        return [...d.slice(-60), { t, alpha, bravo }];
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  return data;
};

// Terminal mock lines
const useTerminalFeed = (enabled: boolean) => {
  const [lines, setLines] = useState<string[]>([
    "$ initializing flight ops ...",
    "$ loading mission profile KoTH-HILL-01",
  ]);
  useEffect(() => {
    if (!enabled) return;
    const iv = setInterval(() => {
      const samples = [
        "[TX] beacon -> hill:31337 ACK",
        "[RX] telemetry OK (latency 22ms)",
        "[ATK] exploit-runway CVE-20XX-XXXX ... OK",
        "[DEF] iptables DROP src=10.7.XX.XX",
        "[CTRL] claim token issued",
        "[WARN] countermeasure detected — evasive",
      ];
      setLines((L) => [...L.slice(-24), samples[Math.floor(Math.random() * samples.length)]]);
    }, 900);
    return () => clearInterval(iv);
  }, [enabled]);
  return lines;
};

const HeaderBar = ({ user, onLogout }: { user: string; onLogout: () => void }) => (
  <div className="sticky top-0 z-40 bg-[#0b1220]/80 backdrop-blur border-b border-sky-900/40">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
      <Airplay className="size-5 text-sky-300" />
      <div className="font-semibold tracking-widest uppercase text-sky-100 text-sm">RTAF Cyber Range — Airbase Tactical</div>
      <Badge variant="outline" className="ml-3 border-sky-700/60 text-sky-300">KoTH</Badge>
      <div className="ml-auto flex items-center gap-3">
        <Badge className="bg-emerald-600/30 text-emerald-200 border-emerald-500/40"><span className="inline-flex items-center gap-1"><Activity className="size-3"/> Online</span></Badge>
        <div className="flex items-center gap-2">
          <Avatar className="size-7 border border-sky-700/50"><AvatarFallback>TW</AvatarFallback></Avatar>
          <span className="text-slate-200 text-sm">{user}</span>
        </div>
        <Button variant="outline" className="border-sky-800/60 text-sky-200 hover:bg-sky-900/40" onClick={onLogout}>
          <LogOut className="size-4 mr-1"/> Log out
        </Button>
      </div>
    </div>
  </div>
);

const LoginScreen = ({ onLogin }: { onLogin: (u: string, role: string) => void }) => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("Operator");
  return (
    <div className="min-h-dvh grid place-items-center bg-[radial-gradient(ellipse_at_center,rgba(12,20,34,1),#050914)] overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-md">
        <Card className="bg-[#0b1220]/80 border-indigo-900/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-sky-100 tracking-wide uppercase">RTAF Cyber Command Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-slate-400 text-sm">Authenticate with your <Neon>Military ID</Neon> or email to deploy.</div>
            <Input placeholder="Email or Military ID" value={user} onChange={(e) => setUser(e.target.value)} className="bg-slate-900/60 border-indigo-900/60"/>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="bg-slate-900/60 border-indigo-900/60">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Commander">Commander</SelectItem>
                <SelectItem value="Operator">Operator</SelectItem>
                <SelectItem value="Observer">Observer</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full bg-sky-700 hover:bg-sky-600" onClick={() => onLogin(user || "Operator-01", role)}>
              <Power className="size-4 mr-2"/> Enter King of the Hill
            </Button>
            <div className="text-[11px] text-slate-500 text-center">Login แล้วเข้าสู่ <strong>King of the Hill</strong> ทันที • โหมดอื่นอยู่ในหน้า Admin</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ambient decorative lines */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <svg className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1200px]" viewBox="0 0 1200 200" fill="none">
          <path d="M0 100 C 200 20, 400 180, 600 100 S 1000 20, 1200 100" stroke="url(#g)" strokeWidth="2" />
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.0"/>
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const ModeDashboard = ({ onEnterKoTH, role }: { onEnterKoTH: () => void; role: string }) => (
  <div className="min-h-dvh bg-[radial-gradient(ellipse_at_top,#0d0f1a,#141729)]">
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="py-8 flex items-center justify-between">
        <div>
          <div className="text-slate-400 text-xs uppercase tracking-wider">Mission Console</div>
          <h1 className="text-2xl font-semibold text-sky-100">Select Mode</h1>
        </div>
        <Badge className="bg-indigo-600/30 text-indigo-200 border-indigo-500/40">Role: {role}</Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer" onClick={onEnterKoTH}>
          <Section title="King of the Hill" right={<Siren className="size-4 text-rose-300"/>}>
            <div className="flex items-center gap-5">
              <div className="w-40 h-28 rounded-lg overflow-hidden ring-1 ring-sky-900/50">
                <div className="w-full h-full bg-slate-950 relative">
                  <div className="absolute inset-0 p-2"><RadarCanvas rings={5} teamHue={245}/></div>
                  <div className="absolute bottom-1 left-1 text-[10px] text-sky-300">HILL-01</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-slate-200 font-medium">Airbase Tactical — Hold the Hill</div>
                <div className="text-slate-400 text-sm">Capture and defend the strategic hill node. Real-time control, countermeasures, flight-route tactics.</div>
                <Button className="bg-sky-700 hover:bg-sky-600">Enter Lobby</Button>
              </div>
            </div>
          </Section>
        </motion.div>

        <Section title="Attack / Defense" right={<Swords className="size-4 text-amber-300"/>}>
          <div className="text-slate-400 text-sm">Red/Blue cell engagements with mission-based scoring and asset protection.</div>
        </Section>
        <Section title="Jeopardy CTF" right={<Shield className="size-4 text-emerald-300"/>}>
          <div className="text-slate-400 text-sm">Challenge board with dynamic difficulty ramp and team collaboration tools.</div>
        </Section>
      </div>
    </div>
  </div>
);

const KillFeed = ({ items }: { items: string[] }) => (
  <div className="space-y-1 text-[12px] text-slate-300 font-mono">
    {items.slice(-10).map((it, i) => (
      <div key={i} className="flex items-center gap-2">
        <span className="text-sky-400">●</span>
        <span className="truncate">{it}</span>
      </div>
    ))}
  </div>
);

const ChatPanel = () => {
  const [msgs, setMsgs] = useState<string[]>(["[CMD] ROE active. Maintain control of Hill."]);
  const [txt, setTxt] = useState("");
  return (
    <div className="flex flex-col h-64">
      <div className="flex-1 overflow-y-auto space-y-1 text-[12px] text-slate-200 font-mono">
        {msgs.map((m, i) => <div key={i} className="px-2">{m}</div>)}
      </div>
      <div className="mt-2 flex gap-2">
        <Input className="bg-slate-900/60 border-indigo-900/60" placeholder="Type radio message..." value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && txt.trim()) { setMsgs((x) => [...x, txt]); setTxt(""); } }} />
        <Button className="bg-sky-700 hover:bg-sky-600" onClick={() => { if (txt.trim()) { setMsgs((x) => [...x, txt]); setTxt(""); } }}>Send</Button>
      </div>
    </div>
  );
};

const KoTHScreen = ({ role }: { role: string }) => {
  const dominance = useDominationFeed();
  const terminal = useTerminalFeed(true);
  const control = dominance.at(-1)?.alpha ?? 50;
  const [topology, setTopology] = useState(true);
  const [timer, setTimer] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    const t = setInterval(() => setTimer((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mmss = (n: number) => `${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`;

  return (
    <div className="min-h-dvh bg-[radial-gradient(ellipse_at_center,#0d0f1a,#141729)]">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Top summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <Section title="Control Status" right={<Trophy className="size-4 text-amber-300"/>}>
            <div className="flex items-center gap-4">
              <div className="text-slate-200 text-sm">Team <Neon>Alpha</Neon> controls the hill</div>
              <Badge className="bg-emerald-600/30 text-emerald-200 border-emerald-500/40">Stable</Badge>
              <div className="ml-auto text-slate-400 text-sm flex items-center gap-2"><Clock className="size-4"/> {mmss(timer)}</div>
            </div>
            <div className="mt-3">
              <Progress value={control} className="h-3 bg-slate-800 border border-indigo-900/60"/>
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Alpha {Math.round(control)}%</span>
                <span>Bravo {100 - Math.round(control)}%</span>
              </div>
            </div>
          </Section>

          <Section title="Role & Comms" right={<Radio className="size-4 text-sky-300"/>}>
            <div className="flex items-center gap-4">
              <Badge className="bg-indigo-600/30 text-indigo-200 border-indigo-500/40">Role: {role}</Badge>
              <Badge variant="outline" className="border-sky-700/60 text-sky-300">UHF 243.0</Badge>
              <Badge variant="outline" className="border-sky-700/60 text-sky-300">VHF 138.9</Badge>
            </div>
          </Section>

          <Section title="Mission Toggles" right={<Map className="size-4 text-teal-300"/>}>
            <div className="flex items-center gap-3">
              <Button variant="outline" className={`border-sky-800/60 text-sky-200 ${topology ? 'bg-sky-900/40' : ''}`} onClick={() => setTopology((x) => !x)}>Topology</Button>
              <Button variant="outline" className="border-sky-800/60 text-sky-200">IFF</Button>
              <Button variant="outline" className="border-sky-800/60 text-sky-200">Thermal</Button>
            </div>
          </Section>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-6">
            <Section title="Tactical Radar — HILL-01" right={<Badge className="bg-sky-600/30 text-sky-200 border-sky-500/40">Air Routes</Badge>}>
              <div className="h-[360px] relative rounded-xl overflow-hidden ring-1 ring-sky-900/50">
                <RadarCanvas rings={6} teamHue={245} />
                {topology && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Draw overlay routes as SVG for extra contrast */}
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <g stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="0.6" fill="none">
                        <path d="M10,50 C35,20 65,80 90,50" strokeDasharray="4 6">
                          <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="2s" repeatCount="indefinite"/>
                        </path>
                        <path d="M20,80 80,20" strokeDasharray="4 6">
                          <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2.5s" repeatCount="indefinite"/>
                        </path>
                      </g>
                    </svg>
                  </div>
                )}
              </div>
            </Section>

            <Section title="Domination Timeline" right={<BarChart3 className="size-4 text-sky-300"/>}>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dominance} margin={{ left: 0, right: 8, top: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="alpha" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.6}/>
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="bravo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f472b6" stopOpacity={0.5}/>
                        <stop offset="100%" stopColor="#f472b6" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid rgba(56,189,248,0.3)", color: "#e2e8f0" }} />
                    <Area type="monotone" dataKey="alpha" stroke="#38bdf8" fill="url(#alpha)" strokeWidth={2}/>
                    <Area type="monotone" dataKey="bravo" stroke="#f472b6" fill="url(#bravo)" strokeWidth={2}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Section>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Section title="Kill Log" right={<Users className="size-4 text-rose-300"/>}>
              <KillFeed items={[
                "Alpha ▸ neutralized Bravo-Op3 at Hill-Perimeter",
                "Bravo ▸ recaptured Token-South",
                "Alpha ▸ deployed WAF rule #142",
                "Bravo ▸ failed exploit runway CVE-20xx",
                "Alpha ▸ extended control +5s",
                "Observer ▸ camera HILL-01/SE online",
                "Bravo ▸ jammer detected; signal weak",
              ]} />
            </Section>

            <Section title="Operator Terminal" right={<Terminal className="size-4 text-emerald-300"/>}>
              <div className="h-48 overflow-y-auto rounded-md bg-black/50 ring-1 ring-emerald-700/30 p-2 font-mono text-[12px] text-emerald-200">
                {terminal.map((l, i) => <div key={i} className="whitespace-pre">{l}</div>)}
              </div>
              <div className="mt-2 flex gap-2">
                <Button className="bg-emerald-700 hover:bg-emerald-600">Run Attack</Button>
                <Button variant="outline" className="border-emerald-800/60 text-emerald-200">Deploy Defense</Button>
              </div>
            </Section>

            <Section title="Radio Comms" right={<Radio className="size-4 text-sky-300"/>}>
              <ChatPanel/>
            </Section>
          </div>
        </div>

        {/* Role-specific helper */}
        <div className="grid md:grid-cols-3 gap-4">
          <Section title="Commander Tools" right={<Shield className="size-4 text-indigo-300"/>}>
            <div className="text-sm text-indigo-100/80">Broadcast orders, set ROE, assign sectors. (Prototype actions)</div>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Button className="bg-indigo-900/60 hover:bg-indigo-800/80 text-indigo-100 border border-indigo-700/60 font-medium shadow-md">Broadcast Order</Button>
              <Button className="bg-indigo-900/60 hover:bg-indigo-800/80 text-indigo-100 border border-indigo-700/60 font-medium shadow-md">Assign Sectors</Button>
              <Button className="bg-indigo-900/60 hover:bg-indigo-800/80 text-indigo-100 border border-indigo-700/60 font-medium shadow-md">Authorize Countermeasures</Button>
            </div>
          </Section>
          <Section title="Operator Shortcuts" right={<Swords className="size-4 text-indigo-300"/>}>
            <div className="mt-2 flex gap-2 flex-wrap">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md">Exploit Suite</Button>
              <Button variant="outline" className="border-indigo-700/70 text-indigo-100 hover:bg-indigo-800/40">Token Claim</Button>
              <Button variant="outline" className="border-indigo-700/70 text-indigo-100 hover:bg-indigo-800/40">Beacon Rotate</Button>
            </div>
          </Section>
          <Section title="Observer Views" right={<Airplay className="size-4 text-indigo-300"/>}>
            <div className="text-sm text-indigo-100/80">Switch cams, annotate plays, mark anomalies.</div>
            <div className="mt-2 flex gap-2 flex-wrap">
              <Button className="bg-indigo-800/60 hover:bg-indigo-700/70 text-indigo-100 border border-indigo-700/60 shadow-sm">Camera NW</Button>
              <Button className="bg-indigo-800/60 hover:bg-indigo-700/70 text-indigo-100 border border-indigo-700/60 shadow-sm">Thermal</Button>
              <Button className="bg-indigo-800/60 hover:bg-indigo-700/70 text-indigo-100 border border-indigo-700/60 shadow-sm">Anomaly Tag</Button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default function RTAFKoTHAirbaseApp() {
  const [screen, setScreen] = useState<"login" | "koth">("login");
  const [user, setUser] = useState("Operator-01");
  const [role, setRole] = useState("Operator");

  return (
    <div className="text-slate-100">
      {screen !== "login" && <HeaderBar user={user} onLogout={() => setScreen("login")} />}
      <AnimatePresence mode="wait">
        {screen === "login" && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginScreen onLogin={(u, r) => { setUser(u); setRole(r); setScreen("koth"); }} />
          </motion.div>
        )}
                {screen === "koth" && (
          <motion.div key="koth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <KoTHScreen role={role} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
