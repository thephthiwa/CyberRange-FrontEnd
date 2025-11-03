export default function StatusDot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full shadow-[0_0_10px] ${
        ok ? 'bg-emerald-400 shadow-emerald-400/60' : 'bg-rtaf-alert shadow-rtaf-alert/60'
      }`}
    />
  );
}
