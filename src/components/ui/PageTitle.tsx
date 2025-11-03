import type { ReactNode } from 'react';

type PageTitleProps = {
  children: ReactNode;
  subtitle?: string;
};

export default function PageTitle({ children, subtitle }: PageTitleProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rtaf-cyan shadow-[0_0_12px_rgba(0,229,255,0.5)]" />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            <span className="bg-gradient-to-r from-white via-rtaf-cyan to-sky-400 bg-clip-text text-transparent">
              {children}
            </span>
          </h1>
          {subtitle && (
            <div className="text-xs uppercase tracking-[0.4em] text-white/40">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}
