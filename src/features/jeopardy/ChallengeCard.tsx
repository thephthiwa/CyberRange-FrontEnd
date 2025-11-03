import type { Challenge } from './CategoryBoard';

type ChallengeCardProps = {
  challenge: Challenge;
};

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const handleClick = () => {
    alert(`เปิดรายละเอียดโจทย์ ${challenge.title} (${challenge.points} pts)`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-left text-sm text-white transition hover:border-white hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-lg font-semibold text-white">{challenge.points} pts</span>
        {challenge.firstBlood && (
          <span className="rounded-full border border-white/20 bg-white/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-white/80">
            1st: {challenge.firstBlood}
          </span>
        )}
      </div>
      <div className="mt-1 text-white/80">{challenge.title}</div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-white/50">Solved: {challenge.solved}</div>
    </button>
  );
}
