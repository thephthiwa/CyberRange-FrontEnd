import { Link, useLocation } from 'react-router-dom';

const items = [
  { to: '/', label: 'Dashboard' },
  { to: '/jeopardy', label: 'Jeopardy' },
  { to: '/attack-defense', label: 'Attack/Defense' },
  { to: '/koth', label: 'King of the Hill' },
  { to: '/labs', label: 'Practice Labs' },
  { to: '/scoreboard', label: 'Scoreboard' },
  { to: '/admin', label: 'Admin Console' }
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="p-3 text-sm">
      <ul className="space-y-1">
        {items.map(i => (
          <li key={i.to}>
            <Link
              to={i.to}
              className={`block rounded-lg px-3 py-2 hover:bg-white/5 ${pathname===i.to ? 'bg-white/10 text-rtaf-cyan' : 'text-white/80'}`}
            >{i.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
