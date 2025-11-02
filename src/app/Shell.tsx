import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Sidebar from './Sidebar';

export default function Shell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,#003B77_0%,#001529_45%,#000d1e_100%)] text-white">
      <div className="grid min-h-screen grid-cols-[260px_1fr] grid-rows-[56px_1fr]">
        <div className="col-span-2">
          <Nav />
        </div>
        <div className="border-r border-white/10 bg-black/30 backdrop-blur">
          <Sidebar />
        </div>
        <main className="relative overflow-y-auto p-6">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_0%,rgba(0,229,255,0.18),transparent_45%)]" />
          <div className="relative mx-auto w-full max-w-6xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
