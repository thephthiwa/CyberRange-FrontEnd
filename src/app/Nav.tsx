import { Link } from 'react-router-dom';
export default function Nav() {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-white/10 bg-[#001a33]/70 backdrop-blur">
      <Link to="/" className="font-semibold tracking-wide">RTAF Cyber Range</Link>
      <nav className="text-sm flex gap-4 text-white/80">
        <Link to="/jeopardy">Jeopardy</Link>
        <Link to="/attack-defense">A/D</Link>
        <Link to="/koth">KoTH</Link>
        <Link to="/labs">Labs</Link>
        <Link to="/scoreboard">Scoreboard</Link>
        <Link to="/admin" className="text-rtaf-cyan">Admin</Link>
      </nav>
    </header>
  );
}
