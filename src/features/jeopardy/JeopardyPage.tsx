import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';

import CategoryBoard from './CategoryBoard';

const scoreboard = {
  updatedAt: 'อัปเดต 10 วินาทีที่แล้ว',
  streak: 'Falcon ครองสตรีค 3 ด่านติด',
  teams: [
    { name: 'Falcon', points: 1240, firstBlood: 4, accuracy: '94%' },
    { name: 'Hawk', points: 980, firstBlood: 2, accuracy: '82%' },
    { name: 'Eagle', points: 860, firstBlood: 1, accuracy: '77%' }
  ]
};

const radioBroadcasts = [
  { ts: '16:21:04', call: 'Ops', msg: 'หมวด Crypto ปล่อยสัญญาณใหม่ ความยาก 400 คะแนน', icon: '📡' },
  { ts: '16:18:55', call: 'Falcon', msg: 'ส่ง Flag สำเร็จ (Web - 200) • Response: 437ms', icon: '🏆' },
  { ts: '16:15:33', call: 'SOC', msg: 'ตรวจพบ Traffic ผิดปกติจากทีม Hawk (UDP/7000)', icon: '⚠️' }
];

const eventFeed = [
  { label: 'Falcon', detail: 'Solve หมวด Crypto-300', status: 'FIRST BLOOD', tone: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10' },
  { label: 'Hawk', detail: 'Submit Web-200 ล้มเหลว', status: 'REJECTED', tone: 'text-rose-300 border-rose-500/40 bg-rose-500/10' },
  { label: 'SOC', detail: 'Trigger Alert: Data Exfil Attempt', status: 'ALERT', tone: 'text-amber-300 border-amber-500/40 bg-amber-500/10' }
];

export default function JeopardyPage() {
  return (
    <div className="space-y-6">
      <PageTitle subtitle="Jeopardy Range">
        Mission Control · Jeopardy
      </PageTitle>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <Card
          title="Signal Dashboard"
          actions={<span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/60">{scoreboard.updatedAt}</span>}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-inner shadow-black/30">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/50">
                  <span>สตรีคล่าสุด</span>
                  <span className="text-lg">🎯</span>
                </div>
                <div className="mt-3 text-lg font-semibold text-white">{scoreboard.streak}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  ระบบกำลังปล่อยด่านต่อเนื่องในความถี่สูง ทีมควรกระจายทรัพยากรและจัดลำดับหมวดเพื่อรักษาระดับคะแนน.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/50">
                  <span className="text-lg">🔥</span>
                  Challenge Heatmap
                </div>
                <p className="mt-3 leading-relaxed">
                  หมวด Crypto และ Web มีอัตราการส่งสูงสุด สถานะระบบตอบสนองเฉลี่ย 512ms โดยไม่มีการดีเลย์จากเซิร์ฟเวอร์ Lab.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {scoreboard.teams.map((team, index) => (
                <div
                  key={team.name}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/60">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-white">{team.name}</div>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
                        <span>First blood: {team.firstBlood}</span>
                        <span className="h-3 w-px bg-white/10" />
                        <span>Accuracy: {team.accuracy}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xl font-semibold text-rtaf-cyan">{team.points}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Operations Console">
          <div className="space-y-4 text-sm text-white/80">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-white/50">ระบบตรวจสอบ</div>
                <div className="mt-1 font-semibold text-white">Flag Integrity Monitor</div>
              </div>
              <span className="text-rtaf-cyan">ปกติ</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-rtaf-cyan hover:text-white">
                Deploy Hint
              </button>
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-rtaf-cyan hover:text-white">
                Freeze Category
              </button>
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-rtaf-cyan hover:text-white">
                Broadcast Alert
              </button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/50">
                <span className="text-lg">📻</span> Mission Radio
              </div>
              <p className="mt-3 leading-relaxed">
                ศูนย์บัญชาการพร้อมส่งข้อความบังคับใช้กฎใหม่หรือหยุดการแข่งขันแบบฉุกเฉินได้ทันที.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <CategoryBoard />

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Card title="Live Event Feed">
          <ul className="space-y-3 text-sm">
            {eventFeed.map((event) => (
              <li
                key={event.detail}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-white/50">{event.label}</div>
                  <div className="text-white">{event.detail}</div>
                </div>
                <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.3em] ${event.tone}`}>
                  {event.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Operations Radio">
          <div className="space-y-3 text-sm">
            {radioBroadcasts.map((cast) => (
              <div
                key={`${cast.ts}-${cast.call}`}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mt-1 rounded-full border border-white/10 bg-black/40 p-2 text-lg">{cast.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/50">
                    <span>{cast.call}</span>
                    <span>{cast.ts}</span>
                  </div>
                  <div className="mt-2 text-white/80">{cast.msg}</div>
                </div>
              </div>
            ))}
            <button className="w-full rounded-full border border-white/10 bg-white/5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-rtaf-cyan hover:text-white">
              เปิดบันทึกวิทยุทั้งหมด
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
