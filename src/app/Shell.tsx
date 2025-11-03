import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Sidebar from './Sidebar';

export default function Shell() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030b1a] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_5%_-10%,rgba(0,59,119,0.9),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_90%_10%,rgba(14,165,233,0.35),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:120px_120px] opacity-20" />
      <div className="relative grid min-h-screen grid-cols-[280px_1fr] grid-rows-[64px_1fr]">
        <div className="col-span-2">
          <Nav />
        </div>
        <div className="border-r border-white/10 bg-black/40 backdrop-blur">
          <Sidebar />
        </div>
        <main className="relative overflow-y-auto p-6">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_0%,rgba(0,229,255,0.18),transparent_55%)]" />
          <div className="absolute inset-x-10 top-20 -z-10 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative mx-auto w-full max-w-6xl space-y-6 pb-16">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
