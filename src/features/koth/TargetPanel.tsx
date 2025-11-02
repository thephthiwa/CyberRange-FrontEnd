export default function TargetPanel({ name, holder, seconds }: { name: string; holder: string; seconds: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="font-medium text-rtaf-cyan">{name}</div>
      <div className="mt-1 text-sm">Current holder: <span className="text-white/90">{holder || '—'}</span></div>
      <div className="text-xs text-white/60">Held: {seconds}s</div>
      <div className="mt-3 flex gap-2 text-xs">
        <button className="rounded-md border border-white/20 px-2 py-1 hover:bg-white/10">Rotate</button>
        <button className="rounded-md border border-white/20 px-2 py-1 hover:bg-white/10">Sanity Check</button>
      </div>
    </div>
  );
}
