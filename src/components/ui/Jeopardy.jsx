import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BellRing,
  Crown,
  Headset,
  LogOut,
  Map,
  Moon,
  Music2,
  Shield,
  SunMedium,
  Trophy,
  Wifi,
  Radar,
  Satellite,
  Cpu,
  Bug,
  Globe,
  Lock,
  Binary,
  Swords,
  KeyRound,
  ArrowLeft,
  TerminalSquare,
  Sparkles,
  Star
} from "lucide-react";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// =========================================================================
// RTAF BRAND TOKENS (Galactic Bright Edition)
// =========================================================================
const BRAND = {
  primary: "#004D9E",
  primary600: "#0B64BB",
  primary500: "#1F7CCE",
  neon: "#22E3FF",
  neon600: "#4DEBFF",
  neon400: "#7FF1FF",
  accentRed: "#FF5E73",
  accentPurple: "#9B5BFF",
  text: "#F3F8FF",
  textMuted: "#C2D4EA",
  surface: "#0A1326",
  surfaceElev: "#0E1B33CC",
  line: "rgba(34,227,255,0.18)",
  halo: "rgba(155,91,255,0.45)",
  bgDarkFrom: "#061229",
  bgDarkVia: "#0A1B3A",
  bgDarkTo: "#0B1F47",
};

const brandGradient = `bg-[radial-gradient(1400px_700px_at_-10%_-20%,rgba(155,91,255,.22),transparent_60%),radial-gradient(1000px_600px_at_110%_10%,rgba(34,227,255,.20),transparent_60%)]`;

// Utility for polar positioning
const polarToCartesian = (radius: number, angleDeg: number) => {
  const angle = (angleDeg - 90) * (Math.PI / 180);
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
};

// ------------------------------------------------------------
// Mock Data
// ------------------------------------------------------------
const STATIONS = [
  { id: "crypto", label: "Crypto Station", icon: Binary, color: `from-[${BRAND.neon600}] to-[${BRAND.primary}]`, orbit: 120, angle: 10,
    challenges: [
      { id: "c1", title: "Affine Afterburner", points: 100, difficulty: "Easy", solved: false },
      { id: "c2", title: "RSA Debris Field", points: 200, difficulty: "Medium", solved: false },
      { id: "c3", title: "ECC Docking Key", points: 400, difficulty: "Hard", solved: false },
    ] },
  { id: "re", label: "Reverse Engineering", icon: Cpu, color: `from-[${BRAND.accentPurple}] to-[${BRAND.primary600}]`, orbit: 180, angle: 80,
    challenges: [
      { id: "r1", title: "Orbit Loader", points: 150, difficulty: "Easy", solved: false },
      { id: "r2", title: "Telemetry VMProtect", points: 300, difficulty: "Medium", solved: false },
      { id: "r3", title: "Firmware Blackbox", points: 500, difficulty: "Hard", solved: false },
    ] },
  { id: "pwn", label: "Pwn", icon: Bug, color: `from-[${BRAND.neon400}] to-[${BRAND.primary600}]`, orbit: 240, angle: 155,
    challenges: [
      { id: "p1", title: "Kernel EVA", points: 200, difficulty: "Medium", solved: false },
      { id: "p2", title: "Heap Thrusters", points: 350, difficulty: "Medium", solved: false },
      { id: "p3", title: "ROP Docking Arm", points: 600, difficulty: "Hard", solved: false },
    ] },
  { id: "web", label: "Web Exploitation", icon: Globe, color: `from-[${BRAND.neon}] to-[${BRAND.primary}]`, orbit: 300, angle: 230,
    challenges: [
      { id: "w1", title: "CSRF Airlock", points: 100, difficulty: "Easy", solved: false },
      { id: "w2", title: "SSRF Satellite", points: 250, difficulty: "Medium", solved: false },
      { id: "w3", title: "GraphQL Nebula", points: 450, difficulty: "Hard", solved: false },
    ] },
  { id: "forensic", label: "Forensics", icon: Lock, color: `from-[${BRAND.neon600}] to-[${BRAND.accentPurple}]`, orbit: 360, angle: 300,
    challenges: [
      { id: "f1", title: "PCAP Meteors", points: 100, difficulty: "Easy", solved: false },
      { id: "f2", title: "Memory Snapshot", points: 200, difficulty: "Medium", solved: false },
      { id: "f3", title: "Artifact Starfield", points: 400, difficulty: "Hard", solved: false },
    ] },
  { id: "misc", label: "OSINT / Misc", icon: Radar, color: `from-[${BRAND.accentPurple}] to-[${BRAND.primary}]`, orbit: 420, angle: 20,
    challenges: [
      { id: "m1", title: "SatCam Recon", points: 100, difficulty: "Easy", solved: false },
      { id: "m2", title: "Signals Hunt", points: 200, difficulty: "Medium", solved: false },
    ] },
];

const MINI_LEADERBOARD = [
  { team: "Falcon-RTAF", score: 950 },
  { team: "SkyGuard", score: 860 },
  { team: "BlueWing", score: 780 },
  { team: "ThunderOps", score: 640 },
];

const ROLES = ["Commander", "Operator", "Observer"] as const;

// =========================================================================
// AUDIO: SAFE PLAY HELPERS (fix NotSupportedError in sandbox)
// =========================================================================
function useSafeAudio(url: string) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);

  const element = (
    <audio
      ref={(el) => { ref.current = el; }}
      src={url}
      preload="auto"
      muted={false}
    />
  );

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onCanPlay = () => setReady(true);
    a.addEventListener("canplaythrough", onCanPlay, { once: true });
    return () => a.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  const play = async (): Promise<{ ok: boolean; reason?: string }> => {
    const a = ref.current;
    if (!a) return { ok: false, reason: "no_ref" };
    try {
      const maybe = a.play();
      if (maybe && typeof (maybe as any).then === "function") {
        await (maybe as Promise<void>);
      }
      return { ok: true };
    } catch (e: any) {
      return { ok: false, reason: e?.name || "error" };
    }
  };

  return { element, play, ready };
}

// =========================================================================
// UI SUB-COMPONENTS
// =========================================================================
function StationNode({ station, centerX, centerY, onClick, index }: any) {
  const angle = station.angle + index * 8;
  const { x, y } = polarToCartesian(station.orbit, angle);
  const Icon = station.icon;
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(station)}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: centerX + x, top: centerY + y }}
      aria-label={station.label}
    >
      <div className={`relative rounded-2xl p-[1px] bg-gradient-to-br ${station.color} shadow-[0_0_32px_rgba(34,227,255,0.26)]`}>
        <div className="rounded-2xl backdrop-blur-xl px-4 py-3 border min-w-[172px] flex items-center gap-3 text-[13px]"
             style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
          <div className="rounded-xl p-2 border"
               style={{ background: "rgba(255,255,255,0.08)", borderColor: BRAND.line }}>
            <Icon className="size-5" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold leading-5" style={{ color: BRAND.text }}>{station.label}</p>
            <div className="flex items-center gap-2 text-xs opacity-80" style={{ color: BRAND.textMuted }}>
              <Wifi className="size-3.5" />
              <span>{station.challenges.length} challenges</span>
            </div>
          </div>
          <Swords className="size-5" style={{ color: BRAND.neon }} />
        </div>
      </div>
    </motion.button>
  );
}

function ChallengeCard({ ch, onLaunch, disabled = false }: any) {
  const diffColor: Record<string, string> = {
    Easy: `bg-[${BRAND.neon}]\/14 text-[${BRAND.neon}] border-[${BRAND.neon}]\/30`,
    Medium: `bg-[${BRAND.primary500}]\/14 text-[${BRAND.primary500}] border-[${BRAND.primary500}]\/30`,
    Hard: `bg-[${BRAND.accentRed}]\/14 text-[${BRAND.accentRed}] border-[${BRAND.accentRed}]\/30`,
    Insane: `bg-[${BRAND.accentPurple}]\/14 text-[${BRAND.accentPurple}] border-[${BRAND.accentPurple}]\/30`,
  };
  return (
    <Card className="backdrop-blur-lg" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base" style={{ color: BRAND.text }}>{ch.title}</CardTitle>
          <Badge className="text-black border" style={{ background: BRAND.neon, borderColor: "rgba(255,255,255,0.18)" }}>
            {ch.points} pts
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 mt-2">
          <Badge className={`${diffColor[ch.difficulty] || ""}`}>{ch.difficulty}</Badge>
          {ch.solved ? (
            <Badge className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">Solved</Badge>
          ) : (
            <Badge className="bg-white/5 text-white/70 border" style={{ borderColor: BRAND.line }}>Open</Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-3">
          <Button size="sm" className="rounded-xl hover:brightness-110 focus:ring-2"
                  style={{ background: `linear-gradient(135deg, ${BRAND.primary600}, ${BRAND.accentPurple})`, color: "#EAF2FB" }}
                  disabled={disabled} onClick={() => onLaunch(ch.id)}>
            Launch
          </Button>
          <Button variant="secondary" size="sm" className="rounded-xl border hover:brightness-110"
                  style={{ borderColor: BRAND.neon, color: BRAND.neon }} disabled={disabled}>
            Hint (-50)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniLeaderboard({ data }: { data: { team: string; score: number }[] }) {
  return (
    <Card className="backdrop-blur-lg" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2" style={{ color: BRAND.text }}><Trophy className="size-4" /> Mini Leaderboard</CardTitle>
        <CardDescription className="text-xs" style={{ color: BRAND.textMuted }}>Top teams in this station</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.map((d, i) => (
          <div key={d.team} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="min-w-6 justify-center border" style={{ borderColor: BRAND.neon, color: BRAND.text }}>{i + 1}</Badge>
              <span className="font-medium" style={{ color: BRAND.text }}>{d.team}</span>
            </div>
            <span className="tabular-nums" style={{ color: BRAND.textMuted }}>{d.score}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function XPCard({ level, xp, next }: { level: number; xp: number; next: number }) {
  const pct = Math.min(100, Math.round((xp / next) * 100));
  return (
    <Card className="backdrop-blur-lg" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2" style={{ color: BRAND.text }}>
          <Sparkles className="size-4"/> Pilot Level
        </CardTitle>
        <CardDescription className="text-xs" style={{ color: BRAND.textMuted }}>Earn XP by solving challenges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm mb-2" style={{ color: BRAND.text }}>
          <span>Level {level} — Cadet Falcon</span>
          <span style={{ color: BRAND.textMuted }}>{xp}/{next} XP</span>
        </div>
        <Progress value={pct} className="h-2" />
      </CardContent>
    </Card>
  );
}

function CommanderTerminal({ onCommand }: { onCommand: (cmd: string) => void }) {
  const [cmd, setCmd] = useState("");
  const [logs, setLogs] = useState<string[]>(["/help — list commands"]);
  const run = () => {
    if (!cmd.trim()) return;
    setLogs(prev => ["> " + cmd, ...prev].slice(0, 12));
    onCommand(cmd.trim());
    setCmd("");
  };
  return (
    <Card className="backdrop-blur-lg" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2"><TerminalSquare className="size-4"/> Commander Terminal</CardTitle>
        <CardDescription className="text-xs" style={{ color: BRAND.textMuted }}>Try: /announce, /disable station crypto, /warp map</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="rounded-lg p-3 border h-36 overflow-auto text-xs" style={{ borderColor: BRAND.line, color: BRAND.text }}>
          {logs.map((l, i) => <div key={i} className="mb-1">{l}</div>)}
        </div>
        <div className="flex gap-2">
          <Input value={cmd} onChange={(e) => setCmd(e.target.value)} placeholder="/announce 'New challenge online'"/>
          <Button onClick={run} className="rounded-xl" style={{ background: BRAND.primary, color: BRAND.text }}>Run</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// =========================================================================
// SIMPLE IN-FILE ROUTER (Login → Dashboard → Category → Challenge)
// =========================================================================

type Route =
  | { name: "login" }
  | { name: "dashboard" }
  | { name: "category"; stationId: string }
  | { name: "challenge"; stationId: string; challengeId: string };

function useRouter() {
  const [route, setRoute] = useState<Route>({ name: "login" });
  const navigate = (r: Route) => setRoute(r);
  return { route, navigate };
}

function WarpTransition({ children, keyTag }: { children: React.ReactNode; keyTag: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyTag}
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(12px)" }}
        transition={{ duration: 0.45 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AuroraLayer({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        background: `radial-gradient(800px_400px_at_20%_10%, ${BRAND.accentPurple}33, transparent 60%), radial-gradient(700px_500px_at_80%_20%, ${BRAND.neon}33, transparent 60%)`
      }}
      animate={{ backgroundPosition: ["0% 0%", "100% 50%", "0% 0%"] }}
      transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
    />
  );
}

function FloatingSatellites() {
  return (
    <>
      <motion.div className="absolute left-1/2 top-1/2" style={{ width: 12, height: 12, marginLeft: -6, marginTop: -6 }}
                  animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: 220, top: 0 }}>
          <Star className="size-3" style={{ color: BRAND.neon }} />
        </div>
      </motion.div>
      <motion.div className="absolute left-1/2 top-1/2" style={{ width: 16, height: 16, marginLeft: -8, marginTop: -8 }}
                  animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 65, ease: "linear" }}>
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: 300, top: 0 }}>
          <Satellite className="size-4" style={{ color: BRAND.accentPurple }} />
        </div>
      </motion.div>
    </>
  );
}

function MissionIntro({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-xl backdrop-blur-xl"
                     style={{ background: "#0E1B33E6", borderColor: BRAND.line }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><BellRing className="size-5"/> Mission Briefing</DialogTitle>
        </DialogHeader>
        <div className="text-sm" style={{ color: BRAND.textMuted }}>
          Enemy signal detected near the outer orbit. Your mission is to breach the target module and retrieve the flag.
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <Button variant="secondary" className="rounded-xl border" style={{ borderColor: BRAND.neon, color: BRAND.neon }} onClick={onClose}>Proceed</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LoginPage({ onLogin, requestAudioConsent }: { onLogin: () => void; requestAudioConsent: () => void }) {
  return (
    <div className={`min-h-screen w-full bg-[${BRAND.bgDarkFrom}] text-white ${brandGradient} grid place-items-center relative`} style={{ fontFamily: 'Kanit, Prompt, ui-sans-serif, system-ui' }}>
      <AuroraLayer enabled={true} />
      <Card className="w-full max-w-md backdrop-blur-xl relative" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl grid place-items-center"
               style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accentPurple})`, boxShadow: `0 0 40px ${BRAND.halo}` }}>
            <Shield className="text-white" />
          </div>
          <CardTitle className="text-2xl mt-2">RTAF Cyber Command</CardTitle>
          <CardDescription>Space Command — CTF Access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm">Username</label>
            <Input placeholder="callsign@rtaf.mil.th" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">2FA Code</label>
            <Input placeholder="000 000" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full rounded-xl hover:brightness-110 focus:ring-2"
                    style={{ background: `linear-gradient(135deg, ${BRAND.primary600}, ${BRAND.accentPurple})` }}
                    onClick={onLogin}>
              <KeyRound className="mr-2 size-4"/> Enter the Range
            </Button>
            <Button variant="secondary" className="w-full rounded-xl border" style={{ borderColor: BRAND.neon, color: BRAND.neon }} onClick={requestAudioConsent}>
              <Headset className="mr-2 size-4"/> Enable Audio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardPage(props: any) {
  const { onOpenStation, uiState, onCommand, onPlayWarp, onPlayAlarm } = props;
  const { dark, setDark, soundOn, setSoundOn, musicOn, setMusicOn, role, setRole, auroraOn, setAuroraOn, level, xp, nextXp, audioAllowed } = uiState;

  const centerRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCenter = () => {
      if (centerRef.current) {
        const rect = centerRef.current.getBoundingClientRect();
        setCenter({ x: rect.width / 2, y: rect.height / 2 });
      }
    };
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  const bgClass = dark
    ? `from-[${BRAND.bgDarkFrom}] via-[${BRAND.bgDarkVia}] to-[${BRAND.bgDarkTo}]`
    : "from-sky-100 via-indigo-100 to-sky-50";

  return (
    <div className={`${dark ? "dark" : ""}`}> 
      <div className={`min-h-screen w-full bg-gradient-to-b ${bgClass} text-foreground relative overflow-hidden ${brandGradient}`} style={{ fontFamily: 'Kanit, Prompt, ui-sans-serif, system-ui' }}>
        <AuroraLayer enabled={auroraOn} />
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur bg-white/0">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl grid place-items-center text-white shadow-lg"
                   style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accentPurple})` }}>
                <Shield className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: BRAND.textMuted }}>RTAF Cyber Command</p>
                <h1 className="text-lg font-bold leading-tight" style={{ color: BRAND.text }}>Space Command – CTF Jeopardy</h1>
              </div>
              <Badge className="ml-2 text-black" style={{ background: BRAND.neon }}>Live</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Select value={role} onValueChange={(v: any) => setRole(v)}>
                <SelectTrigger className="w-[150px] rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="mx-1 h-6" />

              <Button variant="ghost" className="rounded-xl" onClick={() => setDark((v: boolean) => !v)} aria-label="Toggle theme">
                {dark ? <SunMedium className="size-5"/> : <Moon className="size-5"/>}
              </Button>
              <Button variant={soundOn ? "default" : "secondary"} className="rounded-xl" onClick={() => setSoundOn((v: boolean) => !v)} aria-label="Toggle sound"
                      style={{ backgroundColor: soundOn ? BRAND.primary : undefined, color: soundOn ? BRAND.text : undefined }}>
                <Headset className="size-5"/>
              </Button>
              <Button variant={musicOn ? "default" : "secondary"} className="rounded-xl" onClick={() => setMusicOn((v: boolean) => !v)} aria-label="Toggle music"
                      style={{ backgroundColor: musicOn ? BRAND.primary : undefined, color: musicOn ? BRAND.text : undefined }}>
                <Music2 className="size-5"/>
              </Button>
              <Button variant={auroraOn ? "default" : "secondary"} className="rounded-xl" onClick={() => setAuroraOn((v: boolean) => !v)} aria-label="Toggle aurora"
                      style={{ backgroundColor: auroraOn ? BRAND.accentPurple : undefined }}>
                <Sparkles className="size-5"/>
              </Button>

              <Separator orientation="vertical" className="mx-1 h-6" />

              <Button variant="secondary" className="rounded-xl border" style={{ borderColor: BRAND.neon, color: BRAND.neon }}><Crown className="mr-2 size-4"/> Scoreboard</Button>
              <Button variant="ghost" className="rounded-xl" aria-label="Log out"><LogOut className="size-5"/></Button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-7xl px-4 pb-8 grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-4">
          {/* Orbital Map */}
          <Card className="relative overflow-hidden backdrop-blur-xl" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2"><Map className="size-5"/> Jeopardy Station Map</CardTitle>
              <CardDescription className="text-xs" style={{ color: BRAND.textMuted }}>Click a station module to view challenges.</CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={centerRef} className="relative h-[520px] md:h-[620px]">
                <FloatingSatellites />
                {/* Center Planet */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="h-40 w-40 md:h-48 md:w-48 rounded-full border grid place-items-center text-white"
                    style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accentPurple})`, boxShadow: `0 0 90px ${BRAND.halo}`, borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    <div className="text-center">
                      <Satellite className="mx-auto size-7 mb-1"/>
                      <div className="text-xs uppercase tracking-wider opacity-90">RTAF HQ</div>
                      <div className="text-lg font-bold">Space Core</div>
                    </div>
                  </motion.div>
                </div>

                {/* Orbits */}
                {[120,180,240,300,360,420].map((r, idx) => (
                  <motion.div
                    key={r}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                    style={{ width: r * 2, height: r * 2, borderColor: BRAND.line }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * idx }}
                  />
                ))}

                {/* Stations */}
                {STATIONS.map((s, i) => (
                  <StationNode
                    key={s.id}
                    station={s}
                    centerX={center.x}
                    centerY={center.y}
                    onClick={(st: any) => onOpenStation(st.id)}
                    index={i}
                  />
                ))}

                {/* Subtle grid */}
                <motion.div className="pointer-events-none absolute inset-0" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 90, ease: "linear" }}>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] opacity-10" style={{
                    backgroundImage: `radial-gradient(${BRAND.line} 1px, transparent 1px)`,
                    backgroundSize: "22px 22px",
                    borderRadius: "9999px"
                  }}/>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Right column */}
          <div className="space-y-4">
            <MiniLeaderboard data={MINI_LEADERBOARD} />
            <XPCard level={level} xp={xp} next={nextXp} />
            {role === 'Commander' && <CommanderTerminal onCommand={onCommand} />}
            <Card className="backdrop-blur-lg" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Crown className="size-5"/> Mission Summary</CardTitle>
                <CardDescription className="text-xs" style={{ color: BRAND.textMuted }}>Personal progress snapshot</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border p-3" style={{ borderColor: BRAND.line }}>
                  <div className="text-xs" style={{ color: BRAND.textMuted }}>Solved</div>
                  <div className="text-xl font-bold" style={{ color: BRAND.text }}>0</div>
                </div>
                <div className="rounded-xl border p-3" style={{ borderColor: BRAND.line }}>
                  <div className="text-xs" style={{ color: BRAND.textMuted }}>Score</div>
                  <div className="text-xl font-bold tabular-nums" style={{ color: BRAND.text }}>0</div>
                </div>
                <div className="rounded-xl border p-3" style={{ borderColor: BRAND.line }}>
                  <div className="text-xs" style={{ color: BRAND.textMuted }}>Rank</div>
                  <div className="text-xl font-bold" style={{ color: BRAND.text }}>-</div>
                </div>
              </CardContent>
            </Card>

            {/* ======= DEV TEST CASES (non-intrusive) ======= */}
            <Card className="backdrop-blur-lg" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
              <CardHeader>
                <CardTitle className="text-base">Runtime Tests</CardTitle>
                <CardDescription className="text-xs" style={{ color: BRAND.textMuted }}>Validate audio calls won’t throw in sandbox</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 text-xs" style={{ color: BRAND.textMuted }}>
                <Button size="sm" variant="secondary" className="rounded-xl border" style={{ borderColor: BRAND.neon, color: BRAND.neon }}
                        onClick={async () => { const r = await onPlayWarp(); console.log("TEST: warp play result", r); }}>
                  Test Warp Sound
                </Button>
                <Button size="sm" variant="secondary" className="rounded-xl border" style={{ borderColor: BRAND.neon, color: BRAND.neon }}
                        onClick={async () => { const r = await onPlayAlarm(); console.log("TEST: alarm play result", r); }}>
                  Test Alarm Sound
                </Button>
                <Button size="sm" variant="secondary" className="rounded-xl border" style={{ borderColor: BRAND.neon, color: BRAND.neon }}
                        onClick={() => {
                          const a = polarToCartesian(100, 90);
                          const b = polarToCartesian(0, 0);
                          console.assert(Math.abs(a.x - 100) < 1e-6 && Math.abs(a.y) < 1e-6, 'polarToCartesian 90° failed');
                          console.assert(Math.abs(b.x) < 1e-9 && Math.abs(b.y) < 1e-9, 'polarToCartesian zero radius failed');
                          console.log('TEST: polar math ✓', { a, b });
                        }}>
                  Test Polar Math
                </Button>
                <div>
                  Expected: No exception; console shows <code>{'{ ok: true }'}</code> or <code>{'{ ok: false, reason: "*" }'}</code>.
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="sticky bottom-0 z-30">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs" style={{ color: BRAND.textMuted }}>
              <Radar className="size-4"/>
              <span>Comms: Secure</span>
              <span>•</span>
              <span>Latency: 12 ms</span>
              {!audioAllowed && <span className="ml-2">• Audio blocked (click Enable Audio)</span>}
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-xl" variant="default" style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accentPurple})` }}>
                    <Trophy className="size-4 mr-2"/> View Full Scoreboard
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl backdrop-blur-xl" style={{ background: "#0E1B33E6", borderColor: BRAND.line }}>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><Trophy className="size-5"/> Scoreboard (Mock)</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {MINI_LEADERBOARD.map((d, i) => (
                      <Card key={d.team} className="backdrop-blur-lg" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Badge variant="outline" className="min-w-6 justify-center border" style={{ borderColor: BRAND.neon, color: BRAND.text }}>{i + 1}</Badge>
                            {d.team}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm" style={{ color: BRAND.textMuted }}>Score: {d.score}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function CategoryPage({ stationId, onBack, onOpenChallenge, role, onIntro }: any) {
  const station = STATIONS.find(s => s.id === stationId);
  if (!station) return (
    <div className="p-6">
      <Button onClick={onBack} variant="secondary" className="rounded-xl"><ArrowLeft className="mr-2"/> Back</Button>
      <div className="mt-6">Station not found.</div>
    </div>
  );
  return (
    <div className={`min-h-screen w-full bg-[${BRAND.bgDarkFrom}] ${brandGradient} px-4 py-6 relative`} style={{ fontFamily: 'Kanit, Prompt, ui-sans-serif, system-ui' }}>
      <AuroraLayer enabled={true} />
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="secondary" className="rounded-xl border" style={{ borderColor: BRAND.neon, color: BRAND.neon }}><ArrowLeft className="mr-2"/> Back</Button>
            <h2 className="text-xl font-bold" style={{ color: BRAND.text }}>{station.label}</h2>
          </div>
          <Badge className="text-black" style={{ background: BRAND.neon }}>{station.challenges.length} Challenges</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {station.challenges.map(ch => (
            <ChallengeCard key={ch.id} ch={ch} disabled={role === 'Observer'} onLaunch={() => { onIntro(); onOpenChallenge(station.id, ch.id); }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChallengePage({ stationId, challengeId, onBack }: any) {
  const station = STATIONS.find(s => s.id === stationId);
  const challenge = station?.challenges.find((c: any) => c.id === challengeId);
  if (!station || !challenge) return (
    <div className="p-6">
      <Button onClick={onBack} variant="secondary" className="rounded-xl"><ArrowLeft className="mr-2"/> Back</Button>
      <div className="mt-6">Challenge not found.</div>
    </div>
  );
  return (
    <div className={`min-h-screen w-full bg-[${BRAND.bgDarkFrom}] ${brandGradient} px-4 py-6`} style={{ fontFamily: 'Kanit, Prompt, ui-sans-serif, system-ui' }}>
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="secondary" className="rounded-xl border" style={{ borderColor: BRAND.neon, color: BRAND.neon }}><ArrowLeft className="mr-2"/> Back</Button>
            <h2 className="text-xl font-bold" style={{ color: BRAND.text }}>{station.label} / {challenge.title}</h2>
          </div>
          <Badge className="text-black" style={{ background: BRAND.neon }}>{challenge.points} pts</Badge>
        </div>
        <Card className="backdrop-blur-lg" style={{ background: BRAND.surfaceElev, borderColor: BRAND.line }}>
          <CardHeader>
            <CardTitle>Mission Briefing</CardTitle>
            <CardDescription>Read the description and submit your flag.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm" style={{ color: BRAND.textMuted }}>(Mock) Challenge description goes here. Provide input/output examples, files and hints as needed.</p>
            <div className="flex items-center gap-2">
              <Input placeholder="RTAF{your_flag_here}" />
              <Button className="rounded-xl hover:brightness-110 focus:ring-2" style={{ background: `linear-gradient(135deg, ${BRAND.primary600}, ${BRAND.accentPurple})`, color: BRAND.text }}>Submit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// =========================================================================
// ROOT APP
// =========================================================================
export default function RTAFJeopardyStation() {
  // UI state shared across pages
  const [dark, setDark] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [auroraOn, setAuroraOn] = useState(true);
  const [role, setRole] = useState<typeof ROLES[number]>("Operator");
  const [level, setLevel] = useState(3);
  const [xp, setXp] = useState(280);
  const [nextXp, setNextXp] = useState(500);
  const [showIntro, setShowIntro] = useState(false);
  const [audioAllowed, setAudioAllowed] = useState<boolean>(false);

  const { route, navigate } = useRouter();

  // Audio (safe)
  const warp = useSafeAudio("https://cdn.pixabay.com/download/audio/2022/10/24/audio_25d3d81a2a.mp3?filename=warp-speed-124008.mp3");
  const alarm = useSafeAudio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_23f7e7f948.mp3?filename=alarm-116190.mp3");

  const requestAudioConsent = async () => {
    setSoundOn(true);
    setAudioAllowed(true);
    await warp.play();
  };

  const playWarp = async () => {
    if (!soundOn || !audioAllowed) return { ok: false, reason: "blocked" } as const;
    return await warp.play();
  };

  const playAlarm = async () => {
    if (!soundOn || !audioAllowed) return { ok: false, reason: "blocked" } as const;
    return await alarm.play();
  };

  // Commander commands mock
  const handleCommand = async (cmd: string) => {
    if (cmd.startsWith("/announce")) await playAlarm();
    if (cmd.startsWith("/warp")) await playWarp();
    if (cmd.startsWith("/disable")) {/* no-op */}
  };

  // Page handlers
  const handleLogin = async () => { await playWarp(); navigate({ name: "dashboard" }); };
  const openStation = async (stationId: string) => { await playWarp(); navigate({ name: "category", stationId }); };
  const openChallenge = (stationId: string, challengeId: string) => { setShowIntro(true); setTimeout(() => setShowIntro(false), 1500); navigate({ name: "challenge", stationId, challengeId }); };
  const backToDashboard = () => navigate({ name: "dashboard" });
  const backToCategory = (stationId: string) => navigate({ name: "category", stationId });

  // Route switcher with warp transition
  const pageKey = route.name + ("stationId" in route ? (route as any).stationId : "") + ("challengeId" in route ? (route as any).challengeId : "");

  return (
    <WarpTransition keyTag={pageKey}>
      {/* Inject audio elements */}
      {warp.element}
      {alarm.element}

      {route.name === "login" && <LoginPage onLogin={handleLogin} requestAudioConsent={requestAudioConsent} />}
      {route.name === "dashboard" && (
        <DashboardPage
          onOpenStation={openStation}
          onCommand={handleCommand}
          onPlayWarp={playWarp}
          onPlayAlarm={playAlarm}
          uiState={{ dark, setDark, soundOn, setSoundOn, musicOn, setMusicOn, role, setRole, auroraOn, setAuroraOn, level, xp, nextXp, audioAllowed }}
        />
      )}
      {route.name === "category" && (
        <>
          <MissionIntro open={showIntro} onClose={() => setShowIntro(false)} />
          <CategoryPage stationId={(route as any).stationId} role={role} onBack={backToDashboard} onOpenChallenge={openChallenge} onIntro={() => setShowIntro(true)} />
        </>
      )}
      {route.name === "challenge" && (
        <>
          <MissionIntro open={showIntro} onClose={() => setShowIntro(false)} />
          <ChallengePage stationId={(route as any).stationId} challengeId={(route as any).challengeId} onBack={() => backToCategory((route as any).stationId)} />
        </>
      )}
    </WarpTransition>
  );
}
