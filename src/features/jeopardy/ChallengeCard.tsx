export default function ChallengeCard({ title }: { title: string }) {
  return (
    <button className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-left hover:bg-white/10">
      <div className="text-sm">{title} pts</div>
      <div className="text-xs text-white/60">Click for details</div>
    </button>
  );
}
