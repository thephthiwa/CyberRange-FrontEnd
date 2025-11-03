import { ReactNode } from 'react';

type CardProps = {
  title: string;
  actions?: ReactNode;
  children?: ReactNode;
  subtle?: boolean;
};

export default function Card({ title, actions, children, subtle = false }: CardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border p-6 shadow-lg shadow-black/20 ${
        subtle
          ? 'border-white/10 bg-white/5'
          : 'border-white/10 bg-gradient-to-br from-white/15 via-white/5 to-transparent'
      }`}
    >
      <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-rtaf-cyan/20 blur-3xl transition group-hover:scale-110" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl transition group-hover:scale-125" />
      <div className="relative flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.35em] text-white/40">Module</div>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
        </div>
        {actions && <div className="text-xs text-white/60">{actions}</div>}
      </div>
      <div className="relative mt-4 text-sm leading-relaxed text-white/80">{children}</div>
    </div>
  );
}
