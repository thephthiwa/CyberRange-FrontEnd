import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth/AuthContext';

const personaOptions = [
  { value: 'operator', label: 'Operator', description: 'มุมมองเจ้าหน้าที่ปฏิบัติการ' },
  { value: 'admin', label: 'Admin', description: 'มุมมองผู้ควบคุมระบบ' }
] as const;

type PersonaOption = (typeof personaOptions)[number]['value'];

export default function Nav() {
  const { user, persona, switchPersona, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { to: '/', label: 'Practice Labs', end: true },
    { to: '/competition', label: 'Competition Arena' },
    ...(persona === 'admin'
      ? [{ to: '/admin', label: 'Command Console', accent: true }]
      : [])
  ];

  const handlePersonaChange = (next: PersonaOption) => {
    if (persona !== next) switchPersona(next);
  };

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-white/10 bg-[#001329]/80 px-6 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(0,229,255,0.16),transparent_55%)]" />
      <div className="flex items-center gap-4">
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-rtaf-cyan/60 bg-gradient-to-br from-rtaf-cyan/30 via-transparent to-transparent text-xs font-semibold uppercase text-rtaf-cyan">
          <div className="absolute inset-0 bg-[conic-gradient(from_140deg,rgba(0,229,255,0.3),transparent_60%)]" />
          <span className="relative">RTAF</span>
        </div>
        <div>
          <NavLink to="/" end className="text-sm font-semibold tracking-wide text-white">
            Cyber Range Operations
          </NavLink>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/50">
            <span>Air Operations Center</span>
            <span className="h-1.5 w-1.5 rounded-full bg-rtaf-cyan shadow-[0_0_10px_rgba(0,229,255,0.6)]" />
            <span className="text-rtaf-cyan/80">Live</span>
          </div>
        </div>
      </div>
      <nav className="hidden items-center gap-3 text-sm text-white/70 lg:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }: { isActive: boolean }) =>
              `group relative overflow-hidden rounded-full px-4 py-2 transition ${
                isActive
                  ? 'bg-white/10 text-white shadow-[0_0_18px_rgba(0,229,255,0.28)]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              } ${item.accent ? 'font-semibold text-rtaf-cyan' : ''}`
            }
          >
            <span className="relative z-10">{item.label}</span>
            <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(0,229,255,0.22),transparent_65%)] opacity-0 transition group-hover:opacity-100" />
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <div className="hidden flex-col gap-1 text-right xl:flex">
          <div className="text-sm font-medium text-white">{user?.name}</div>
          <div className="text-[11px] uppercase tracking-wide text-white/60">
            {user ? `${user.rank} • ${user.unit}` : 'Offline'}
          </div>
        </div>
        <div className="hidden text-xs text-white/70 sm:flex sm:flex-col sm:items-end">
          <span className="uppercase tracking-[0.3em] text-white/50">Mode</span>
          <div className="mt-1 flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 shadow-inner shadow-black/20">
            {personaOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handlePersonaChange(option.value)}
                className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-wide transition ${
                  persona === option.value
                    ? 'bg-gradient-to-r from-rtaf-cyan to-sky-400 text-black shadow-[0_0_14px_rgba(0,229,255,0.4)]'
                    : 'text-white/60 hover:text-white'
                }`}
                title={option.description}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-full border border-rtaf-cyan/70 bg-gradient-to-r from-rtaf-cyan/30 via-sky-500/10 to-transparent px-3 py-1.5 text-xs font-semibold text-rtaf-cyan transition hover:from-rtaf-cyan/50 hover:text-white"
        >
          ออกจากระบบ
        </button>
      </div>
    </header>
  );
}
