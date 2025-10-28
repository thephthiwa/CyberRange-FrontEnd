import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Cloud, Flame, Radar, Radio, Server, ShieldCheck, Target, Users } from 'lucide-react'

const missionBriefings: Array<{
  title: string;
  status: string;
  description: string;
  impact: string;
  tags: string[];
}> = [
  {
    title: 'Advanced Persistent Threat Hunt',
    status: 'Live Training',
    description:
      'Deploy blue team protocols against simulated APT actors targeting critical air defense infrastructure.',
    impact: 'Operational Defense Readiness',
    tags: ['Blue Team', 'Threat Intel', 'Forensics'],
  },
  {
    title: 'Offensive Recon Operation',
    status: 'Mission Planning',
    description:
      'Coordinate red team units to infiltrate hardened network segments under strict ROE (Rules of Engagement).',
    impact: 'Proactive Vulnerability Discovery',
    tags: ['Red Team', 'Reconnaissance', 'SIGINT'],
  },
  {
    title: 'Joint Cyber-Air Coordination Drill',
    status: 'Upcoming',
    description:
      'Synchronize cyber operations with live-flight exercises and autonomous ISR (Intelligence, Surveillance, Reconnaissance) assets.',
    impact: 'Cross-Domain Preparedness',
    tags: ['Joint Ops', 'Command & Control', 'AI Integration'],
  },
]

const capabilityMetrics: Array<{
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}> = [
  {
    icon: ShieldCheck,
    label: 'Defensive Modules',
    value: '24+',
    detail: 'Realistic attack chains covering air defense infrastructure',
  },
  {
    icon: Target,
    label: 'Offensive Scenarios',
    value: '18',
    detail: 'Rules of engagement aligned with NATO cyber range standards',
  },
  {
    icon: Server,
    label: 'Mission Systems',
    value: '72',
    detail: 'Virtualized assets emulating C2, radar, and avionics networks',
  },
  {
    icon: Users,
    label: 'Operatives Trained',
    value: '650+',
    detail: 'Joint personnel from RTAF, coalition, and civilian agencies',
  },
]

type IntelVariant = 'alert' | 'info' | 'normal'

const realTimeIntel: Array<{
  icon: LucideIcon;
  channel: string;
  status: string;
  update: string;
  variant: IntelVariant;
}> = [
  {
    icon: Radar,
    channel: 'SOC Radar Feed',
    status: 'High Priority',
    update: 'Inbound lateral movement detected across segmented enclaves. Escalated to strike team.',
    variant: 'alert',
  },
  {
    icon: Radio,
    channel: 'Command Net',
    status: 'Coordinating',
    update: 'Blue and red controllers synchronizing cyber-air operations for next exercise window.',
    variant: 'info',
  },
  {
    icon: Cloud,
    channel: 'Telemetry Mesh',
    status: 'Nominal',
    update: 'Edge sensors reporting stable packet baselines with predictive AI thresholds engaged.',
    variant: 'normal',
  },
]

const variantStyles: Record<IntelVariant, string> = {
  alert: 'border-red-500/50 bg-red-500/5 text-red-100',
  info: 'border-emerald-500/50 bg-emerald-500/5 text-emerald-100',
  normal: 'border-slate-500/40 bg-slate-900/40 text-slate-200',
}

const RTAFCyberRange = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/10 via-slate-900 to-slate-950" />
        <header className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Royal Thai Air Force</p>
              <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Cyber Range Command Center</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Next-generation cyber warfare training nexus integrating simulated air defense assets, live operational
                telemetry, and mission-grade orchestration for RTAF cyber operators.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-100">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
                <span>Cyber Range Status: Operational</span>
              </div>
              <button className="group inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
                Initiate Mission Briefing
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {capabilityMetrics.map(({ icon: Icon, label, value, detail }) => (
              <div key={label} className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 shadow-lg shadow-slate-950/30">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/70 text-sky-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-slate-500">{label}</span>
                </div>
                <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-sm text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
        </header>
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24">
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Mission Briefings</h2>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs uppercase tracking-widest text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Authorized Clearance Required
              </div>
            </div>
            <div className="grid gap-4">
              {missionBriefings.map((briefing) => (
                <article
                  key={briefing.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 transition hover:border-sky-500/50 hover:bg-slate-900/80"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{briefing.status}</p>
                      <h3 className="mt-1 text-2xl font-semibold text-white">{briefing.title}</h3>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-sky-300">
                      View Objectives
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{briefing.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-200">
                      <Flame className="h-4 w-4" /> {briefing.impact}
                    </span>
                    {briefing.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-700/70 bg-slate-800/60 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-transparent" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold text-white">Real-Time Intelligence</h2>
              <p className="mt-2 text-sm text-slate-400">
                Incoming telemetry channels aggregated for SOC analysts and mission commanders.
              </p>
              <div className="mt-6 space-y-4">
                {realTimeIntel.map((intel) => (
                  <div key={intel.channel} className={`rounded-xl border px-4 py-3 ${variantStyles[intel.variant]}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/20">
                        <intel.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white/90">{intel.channel}</p>
                        <p className="text-xs uppercase tracking-widest text-slate-400">{intel.status}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-200/90">{intel.update}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-900/60 to-sky-950/40 p-6">
              <h2 className="text-xl font-semibold text-white">Range Readiness</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
                  Blue Team Defensive Grid: <span className="ml-auto text-emerald-300">Armed</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-sky-400" aria-hidden />
                  Offensive Sim Cells: <span className="ml-auto text-sky-300">On Standby</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
                  Mission Data Links: <span className="ml-auto text-amber-200">Synchronizing</span>
                </li>
              </ul>
              <button className="mt-6 w-full rounded-lg border border-sky-400/40 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:border-sky-300/60 hover:bg-sky-400/20">
                Generate Operation Report
              </button>
            </div>
          </aside>
        </section>

        <section className="rounded-3xl border border-slate-800/60 bg-slate-900/50 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Joint Range Synchronization</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Collaborative training corridor aligning cyber, space, and air operations for integrated defense and
                offense across coalition partners.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/70 text-sky-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">Secure Link Established</p>
                <p className="text-xs text-slate-500">Next synchronization window in 00:14:27</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Fusion Cell</h3>
              <p className="mt-3 text-lg font-semibold text-white">Live Data Orchestration</p>
              <p className="mt-2 text-sm text-slate-400">
                Aggregating telemetry streams from radar, comms, and cyber defense nodes with AI prioritization.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Strike Team</h3>
              <p className="mt-3 text-lg font-semibold text-white">Hybrid Red/Blue Ops</p>
              <p className="mt-2 text-sm text-slate-400">
                Coordinated adversarial engagements to harden mission systems through contested scenarios.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">After Action</h3>
              <p className="mt-3 text-lg font-semibold text-white">Performance Intelligence</p>
              <p className="mt-2 text-sm text-slate-400">
                Automated debriefs with metrics, heatmaps, and strategic insights for command leadership.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/50 bg-slate-950/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>Royal Thai Air Force Cyber Operations Command &copy; {new Date().getFullYear()}</p>
          <p>Classified Exercise Environment &mdash; Controlled Access Only</p>
        </div>
      </footer>
    </div>
  )
}

export default RTAFCyberRange
