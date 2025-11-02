import { ReactNode } from 'react';
export default function Card({ title, actions, children }: { title: string; actions?: ReactNode; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-medium">{title}</div>
        {actions}
      </div>
      <div className="text-sm text-white/80">{children}</div>
    </div>
  );
}
