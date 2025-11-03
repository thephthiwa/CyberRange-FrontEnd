import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import CategoryBoard from './CategoryBoard';

const scoreboard = {
  teams: [
    { name: 'Falcon', points: 1240, firstBlood: 4 },
    { name: 'Hawk', points: 980, firstBlood: 2 },
    { name: 'Eagle', points: 860, firstBlood: 1 }
  ],
  updatedAt: 'Updated 5s ago'
};

export default function JeopardyPage() {
  return (
    <div className="space-y-6">
      <PageTitle>CTF Jeopardy</PageTitle>
      <Card title="Mission Broadcast" actions={<span className="text-xs uppercase tracking-[0.3em] text-white/60">{scoreboard.updatedAt}</span>}>
        <p>
          สนามแข่งขันรูปแบบ Jeopardy ปล่อยโจทย์ตามหมวดหมู่ สามารถเปิดรายละเอียดโจทย์และส่ง Flag ได้ทันที ทุกการส่งจะถูกบันทึกลง Event Log
          ของศูนย์ปฏิบัติการแบบเรียลไทม์.
        </p>
      </Card>
      <CategoryBoard />
      <Card title="Scoreboard Snapshot">
        <div className="grid gap-3 text-sm">
          {scoreboard.teams.map((team, index) => (
            <div
              key={team.name}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/60">
                  #{index + 1}
                </span>
                <div>
                  <div className="font-semibold text-white">{team.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">First blood: {team.firstBlood}</div>
                </div>
              </div>
              <span className="text-lg font-semibold text-rtaf-cyan">{team.points}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
