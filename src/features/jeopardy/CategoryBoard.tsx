import ChallengeCard from './ChallengeCard';
const categories = [
  { name: 'Crypto', points: [100,200,300] },
  { name: 'Web', points: [100,200,300] },
  { name: 'Forensics', points: [100,200,300] },
  { name: 'Reversing', points: [100,200,300] }
];
export default function CategoryBoard() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {categories.map(cat => (
        <div key={cat.name} className="space-y-2">
          <div className="font-semibold text-rtaf-cyan">{cat.name}</div>
          {cat.points.map(p => <ChallengeCard key={p} title={`${p}`} />)}
        </div>
      ))}
    </div>
  );
}
