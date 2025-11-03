import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import TargetPanel from './TargetPanel';

const leaderboard = [
  { team: 'Falcon', hold: '05:20', captures: 3 },
  { team: 'Hawk', hold: '03:12', captures: 2 },
  { team: 'Eagle', hold: '01:45', captures: 1 }
];

export default function KothPage() {
  return (
    <div className="space-y-6">
      <PageTitle>King of the Hill</PageTitle>
      <Card title="Mission Broadcast">
        <p>
          ควบคุมระบบป้องกันภัยทางอากาศให้ได้นานที่สุด ทีมที่ยึดระบบได้จะสะสมเวลาถือครอง (Hold-time) และต้องป้องกันการ夺คืนจากทีมอื่นแบบ
          เรียลไทม์.
        </p>
      </Card>
      <div className="grid gap-4 lg:grid-cols-3">
        <TargetPanel name="Hill-1" holder="Falcon" seconds={320} />
        <TargetPanel name="Hill-2" holder="Hawk" seconds={126} />
        <TargetPanel name="Hill-3" holder="Eagle" seconds={0} />
      </div>
      <Card title="Leaderboard">
        <div className="grid gap-3 text-sm">
          {leaderboard.map((entry, index) => (
            <div key={entry.team} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/60">#{index + 1}</span>
                <div>
                  <div className="font-semibold text-white">{entry.team}</div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">Captures: {entry.captures}</div>
                </div>
              </div>
              <span className="text-lg font-semibold text-rtaf-cyan">{entry.hold}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
