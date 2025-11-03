import ChallengeCard from './ChallengeCard';

type Challenge = {
  id: string;
  points: number;
  title: string;
  solved: number;
  firstBlood?: string;
};

type Category = {
  name: string;
  icon: string;
  gradient: string;
  challenges: Challenge[];
};

const categories: Category[] = [
  {
    name: 'Crypto Station',
    icon: '🔐',
    gradient: 'from-sky-500/40 via-cyan-500/30 to-emerald-400/30',
    challenges: [
      { id: 'crypto-100', points: 100, title: 'Satellite Beacon', solved: 24, firstBlood: 'Falcon' },
      { id: 'crypto-200', points: 200, title: 'Key Drift', solved: 12 },
      { id: 'crypto-300', points: 300, title: 'Quantum Signal', solved: 3 }
    ]
  },
  {
    name: 'Web Exploitation',
    icon: '🛰️',
    gradient: 'from-pink-500/40 via-fuchsia-500/30 to-purple-500/30',
    challenges: [
      { id: 'web-100', points: 100, title: 'Mission Brief Portal', solved: 32, firstBlood: 'Hawk' },
      { id: 'web-200', points: 200, title: 'Telemetry Upload', solved: 17 },
      { id: 'web-300', points: 300, title: 'Radar Relay', solved: 5 }
    ]
  },
  {
    name: 'Forensics Lab',
    icon: '🧬',
    gradient: 'from-amber-400/40 via-orange-500/30 to-pink-500/30',
    challenges: [
      { id: 'forensics-100', points: 100, title: 'Black Box Dump', solved: 28 },
      { id: 'forensics-200', points: 200, title: 'Flight Path Memory', solved: 14, firstBlood: 'Eagle' },
      { id: 'forensics-300', points: 300, title: 'Signal Artifact', solved: 6 }
    ]
  },
  {
    name: 'Reverse Engineering',
    icon: '🛠️',
    gradient: 'from-indigo-500/40 via-blue-500/30 to-sky-500/30',
    challenges: [
      { id: 'rev-100', points: 100, title: 'Drone Firmware', solved: 21 },
      { id: 'rev-200', points: 200, title: 'Control Loop', solved: 11 },
      { id: 'rev-300', points: 300, title: 'Anti-Jam Module', solved: 2 }
    ]
  }
];

export default function CategoryBoard() {
  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {categories.map((category) => (
        <div
          key={category.name}
          className={`rounded-3xl border border-white/10 bg-gradient-to-br ${category.gradient} p-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">Category</div>
              <div className="mt-1 text-lg font-semibold">{category.name}</div>
            </div>
            <span className="text-2xl">{category.icon}</span>
          </div>
          <div className="mt-4 space-y-3">
            {category.challenges.map((challenge) => (
              <div key={challenge.id}>
                <ChallengeCard challenge={challenge} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export type { Challenge };
