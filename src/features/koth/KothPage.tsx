import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';

import TargetPanel from './TargetPanel';

const leaderboard = [
  { team: 'Falcon', hold: '08:12', captures: 4 },
  { team: 'Hawk', hold: '04:55', captures: 3 },
  { team: 'Eagle', hold: '02:10', captures: 1 }
];

const telemetry = [
  { label: 'Radar Sweep', value: '12s ago', symbol: '📡' },
  { label: 'Active Contest', value: 'Hill-2 (Hawk vs Raven)', symbol: '⚔️' },
  { label: 'Defensive Programs', value: 'Auto-shield v3.1', symbol: '🛡️' }
];

const commandLog = [
  { ts: '16:21:09', entry: 'Falcon deploy defensive drone swarm (Hill-1)' },
  { ts: '16:19:43', entry: 'Hawk contest initiated against Hill-2' },
  { ts: '16:17:55', entry: 'Raven request forensic snapshot denied' }
];

export default function KothPage() {
  return (
    <div className="space-y-6">
      <PageTitle subtitle="King of the Hill">Range Dominance</PageTitle>

      <Card title="Mission Broadcast" actions={<span className="text-xs uppercase tracking-[0.3em] text-white/60">Live feed</span>}>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="text-sm leading-relaxed text-white/80">
            ทีมต้องถือครองระบบป้องกันภัยทางอากาศให้นานที่สุด ระหว่างที่ยึด Hill ได้จะต้องคอยตอบสนองต่อการเจาะระบบและป้องกันการ夺คืนจากคู่แข่ง.
            ระบบจะอัปเดตเวลาถือครองทุกวินาทีและคำนวณคะแนนจากการรักษาระบบ.
          </div>
          <div className="space-y-3 text-sm text-white/80">
            {telemetry.map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="rounded-full border border-white/10 bg-black/40 p-2 text-lg">{item.symbol}</div>
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</div>
                  <div className="text-white">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <TargetPanel name="Hill-1" holder="Falcon" seconds={492} stability={88} />
        <TargetPanel name="Hill-2" holder="Hawk" seconds={295} stability={62} contested />
        <TargetPanel name="Hill-3" holder="Eagle" seconds={130} stability={48} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
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

        <Card title="Command Log" actions={<span className="text-xs uppercase tracking-[0.3em] text-white/60">UTC+7</span>}>
          <ul className="space-y-3 text-sm">
            {commandLog.map((log) => (
              <li key={log.ts} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">{log.ts}</div>
                <div className="mt-2 text-white/80">{log.entry}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
