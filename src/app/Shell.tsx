import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Sidebar from './Sidebar';

export default function Shell() {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] grid-rows-[56px_1fr]">
      <div className="col-span-2"><Nav /></div>
      <div className="border-r border-white/10 bg-black/20 backdrop-blur"><Sidebar /></div>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
