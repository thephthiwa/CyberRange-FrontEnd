import { Link, useLocation } from 'react-router-dom';

const sections = [
  {
    label: 'Mission Deck',
    items: [
      { to: '/', label: 'Practice Labs', description: 'โหมดฝึกหลัก RTAF' },
      { to: '/competition', label: 'Competition Arena', description: 'สนามแข่งขันทีม' }
    ]
  },
  {
    label: 'Command & Control',
    items: [{ to: '/admin', label: 'Command Console', description: 'ควบคุมสถานะระบบ' }]
  }
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="flex h-full flex-col justify-between p-4 text-sm">
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-white/50">Status</div>
          <div className="mt-2 text-sm font-semibold text-white">Mission Ready</div>
          <p className="mt-1 text-xs text-white/60">Training window 08:00 - 22:00 ICT</p>
        </div>
        {sections.map((section) => (
          <div key={section.label} className="space-y-3">
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">{section.label}</div>
            <ul className="space-y-2">
              {section.items.map((item) => {
                const active = pathname === item.to || (item.to === '/' && pathname === '/labs');
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`group block rounded-2xl border border-transparent px-4 py-3 transition ${
                        active
                          ? 'border-rtaf-cyan/50 bg-white/10 text-white shadow-[0_0_20px_rgba(0,229,255,0.12)]'
                          : 'bg-white/0 text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        {active && <span className="text-[10px] uppercase tracking-wider text-rtaf-cyan">Active</span>}
                      </div>
                      <p className="mt-1 text-xs text-white/50">{item.description}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 text-xs text-white/60">
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">Quick Intel</div>
        <ul className="mt-3 space-y-2">
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
            <span className="text-white/80">Secure</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
