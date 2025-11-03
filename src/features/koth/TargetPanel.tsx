type TargetPanelProps = {
  name: string;
  holder: string;
  seconds: number;
  stability: number;
  contested?: boolean;
};

export default function TargetPanel({ name, holder, seconds, stability, contested = false }: TargetPanelProps) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  const holdTime = `${mins}:${secs}`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/15 via-white/5 to-transparent p-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
      <div className="pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-rtaf-cyan/30 blur-2xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-sky-500/20 blur-2xl" />
      <div className="relative space-y-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Objective</div>
          <div className="mt-1 text-lg font-semibold text-white">{name}</div>
          <div className="mt-2 text-sm text-white/80">
            Current holder: <span className="text-white">{holder || '—'}</span>
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Hold-time: {holdTime}</div>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
            <span>Stability</span>
            <span>{stability}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-gradient-to-r from-rtaf-cyan/70 to-sky-500" style={{ width: `${stability}%` }} />
          </div>
          {contested && (
            <div className="mt-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-amber-200">
              Contesting detected
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button className="rounded-full border border-white/20 bg-white/10 px-3 py-1 uppercase tracking-[0.25em] text-white/70 transition hover:border-rtaf-cyan hover:text-rtaf-cyan">
            Rotate
          </button>
          <button className="rounded-full border border-white/20 bg-white/10 px-3 py-1 uppercase tracking-[0.25em] text-white/70 transition hover:border-rtaf-cyan hover:text-rtaf-cyan">
            Sanity Check
          </button>
        </div>
      </div>
    </div>
  );
}
