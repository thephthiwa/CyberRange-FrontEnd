import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth/AuthContext';

const navItems = [
  { to: '/', label: 'Practice Labs', end: true },
  { to: '/competition', label: 'Competition Arena' },
  { to: '/admin', label: 'Command Console', accent: true }
];

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 bg-[#001a33]/70 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-rtaf-cyan/60 bg-white/10 text-xs font-semibold uppercase text-rtaf-cyan">
          RTAF
        </div>
        <div>
          <NavLink to="/" end className="text-sm font-semibold tracking-wide text-white">
            Cyber Range Operations
          </NavLink>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Air Operations Center</p>
        </div>
      </div>
      <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }: { isActive: boolean }) =>
              `relative transition hover:text-white ${
                isActive ? 'text-rtaf-cyan after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-rtaf-cyan' : ''
              } ${item.accent ? 'font-medium text-rtaf-cyan' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      {user ? (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium text-white">{user.name}</div>
            <div className="text-[11px] uppercase tracking-wide text-white/60">
              {user.rank} • {user.unit}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/70 transition hover:border-rtaf-cyan hover:text-white"
          >
            ออกจากระบบ
          </button>
        </div>
      ) : (
        <NavLink to="/login" className="rounded-full border border-rtaf-cyan px-3 py-1 text-xs font-semibold text-rtaf-cyan">
          เข้าสู่ระบบ
        </NavLink>
      )}
    </header>
  );
}
