export default function VMCard({ name, state }: { name: string; state: 'running'|'stopped' }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="font-medium">{name}</div>
      <div className="text-xs text-white/60">State: {state}</div>
      <div className="mt-3 flex gap-2 text-xs">
        <button className="rounded-md border border-white/20 px-2 py-1 hover:bg-white/10">Clone</button>
        <button className="rounded-md border border-white/20 px-2 py-1 hover:bg-white/10">Snapshot</button>
        <button className="rounded-md border border-white/20 px-2 py-1 hover:bg-white/10">Reset</button>
      </div>
    </div>
  );
}
