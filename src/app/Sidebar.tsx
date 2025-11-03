import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@features/auth/AuthContext';

const operatorSections = [
  {
    label: 'Mission Deck',
    items: [
      { to: '/', label: 'Practice Labs', description: 'โหมดฝึกหลัก RTAF พร้อม Brief' },
      { to: '/competition', label: 'Competition Arena', description: 'สนามแข่งขันทีมแบบสด' }
    ]
  }
];

const adminSections = [
  {
    label: 'Command & Control',
    items: [
      { to: '/admin', label: 'Command Console', description: 'ควบคุมสถานะระบบ & Competition Mode' }
    ]
  }
];

const statusChips = [
  { label: 'Range', value: 'Stable', tone: 'from-emerald-400/40 to-emerald-500/30' },
  { label: 'Threat Intel', value: 'Updated 04:30Z', tone: 'from-sky-500/40 to-rtaf-cyan/40' },
  { label: 'Operators', value: '18 Online', tone: 'from-violet-500/40 to-fuchsia-500/30' }
];

export default function Sidebar() {
  const { persona } = useAuth();
  const { pathname } = useLocation();

  const sections = persona === 'admin' ? [...operatorSections, ...adminSections] : operatorSections;

  return (
    <aside className="relative flex h-full flex-col justify-between gap-6 p-4 text-sm">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(0,229,255,0.12),transparent_55%)]" />
      <div className="space-y-6">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/50">
            <span>Live Status</span>
            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] text-emerald-200">Ready</span>
          </div>
          <div className="space-y-3 text-xs text-white/70">
            <p>
              Training window <span className="font-semibold text-white">08:00 - 22:00 ICT</span>
            </p>
            <div className="grid gap-2">
              {statusChips.map((chip) => (
                <div
                  key={chip.label}
                  className={`rounded-xl border border-white/10 bg-gradient-to-r ${chip.tone} px-3 py-2 text-[11px] uppercase tracking-[0.25em] text-white`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span>{chip.label}</span>
                    <span className="text-white/90">{chip.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {sections.map((section) => (
          <div key={section.label} className="space-y-3">
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">{section.label}</div>
            <ul className="space-y-3">
              {section.items.map((item) => {
                const active = pathname === item.to || (item.to === '/' && pathname === '/labs');
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`group relative block overflow-hidden rounded-3xl border px-4 py-4 transition ${
                        active
                          ? 'border-rtaf-cyan/60 bg-white/15 text-white shadow-[0_0_24px_rgba(0,229,255,0.18)]'
                          : 'border-white/5 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">{item.label}</div>
                          <p className="mt-1 text-xs text-white/60">{item.description}</p>
                        </div>
                        {active ? (
                          <span className="rounded-full border border-rtaf-cyan/40 bg-rtaf-cyan/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-rtaf-cyan">
                            Active
                          </span>
                        ) : (
                          <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">Brief</span>
                        )}
                      </div>
                      <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,229,255,0.18),transparent_70%)]" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="space-y-3 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-5 text-xs text-white/60">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/40">
          <span>Quick Intel</span>
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase text-white/50">SOC feed</span>
        </div>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Weather</span>
            <span className="text-white/80">Clear Skies</span>
          </li>
          <li className="flex justify-between">
            <span>Last Briefing</span>
            <span className="text-white/80">0700Z</span>
          </li>
          <li className="flex justify-between">
            <span>Comms</span>
            <span className="text-white/80">Secure (AES-256)</span>
          </li>
        </ul>
        <button className="w-full rounded-xl border border-white/15 bg-white/10 py-2 text-[11px] uppercase tracking-[0.25em] text-white transition hover:border-rtaf-cyan hover:text-rtaf-cyan">
          View Briefing Packet
        </button>
      </div>
    </aside>
  );
}
