import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';

import ServicesTable from './ServicesTable';

const recentAttacks = [
  { ts: '16:20:12', actor: 'Falcon', action: 'Exploit DNS overflow', result: 'SUCCESS', tone: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200' },
  { ts: '16:18:44', actor: 'Hawk', action: 'Bruteforce SSH Falcon-03', result: 'BLOCKED', tone: 'border-rose-500/40 bg-rose-500/10 text-rose-200' },
  { ts: '16:16:21', actor: 'Raven', action: 'Beacon Telemetry exfil', result: 'DETECTED', tone: 'border-amber-500/40 bg-amber-500/10 text-amber-200' }
];

const perimeterStatus = [
  { label: 'บริการสำคัญ', value: '23 / 24', symbol: '🛡️', tone: 'text-emerald-300' },
  { label: 'Service Checker รอบล่าสุด', value: '32s ago', symbol: '📶', tone: 'text-white/70' },
  { label: 'โจมตีที่ถูกบล็อก (5 นาที)', value: '12', symbol: '🗡️', tone: 'text-rtaf-cyan' }
];

export default function ADPage() {
  return (
    <div className="space-y-6">
      <PageTitle subtitle="Attack / Defense">Live Arena</PageTitle>

      <Card title="Engagement Brief" actions={<span className="text-xs uppercase tracking-[0.3em] text-white/60">Refresh 30s</span>}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 text-sm text-white/80">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/50">
                <span className="text-lg">🔥</span>
                Red Ops
              </div>
              <p className="mt-3 leading-relaxed">
                ทีมรุกสามารถโจมตีบริการคู่แข่งได้เต็มรูปแบบ แต่ต้องรักษา Flag ของตัวเองไว้พร้อมกัน. ระบบ SOC จะตรวจสอบ log และออกคะแนนตามเวลาที่ถือครอง.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/50">
                <span className="text-lg">🛡️</span>
                Blue Coverage
              </div>
              <p className="mt-3 leading-relaxed">
                เครือข่ายจะถูกสุ่มตรวจทุก 30 วินาที หากบริการใดล่มจะสูญเสียคะแนน Uptime และเปิดช่องให้ทีมอื่นยึดได้.
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-white/80">
            {perimeterStatus.map((status) => (
              <div key={status.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-white/10 bg-black/40 p-2 text-lg">{status.symbol}</div>
                  <span className="text-white">{status.label}</span>
                </div>
                <span className={`text-sm font-semibold ${status.tone}`}>{status.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Card title="Service Telemetry">
          <ServicesTable />
        </Card>
        <div className="space-y-6">
          <Card title="Attack Feed" actions={<span className="text-xs uppercase tracking-[0.3em] text-white/60">SOC Relay</span>}>
            <ul className="space-y-3 text-sm">
              {recentAttacks.map((entry) => (
                <li key={entry.ts} className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/50">
                    <span>{entry.actor}</span>
                    <span>{entry.ts}</span>
                  </div>
                  <div className="mt-2 text-white">{entry.action}</div>
                  <span className={`mt-3 inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.3em] ${entry.tone}`}>
                    {entry.result}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Containment Advisory" subtle>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-lg">⚠️</span>
                <span>เปิดโหมด Rate-limit บริการ VPN หากโดน Brute force ติดต่อกันเกิน 5 ครั้ง</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-lg">🗡️</span>
                <span>เตรียม Script กู้คืนฐานข้อมูลสำหรับทีมที่ถูกยึด Flag</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
