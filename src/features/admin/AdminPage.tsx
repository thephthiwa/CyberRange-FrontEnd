import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import { useAuth } from '@features/auth/AuthContext';
import { fetchAdminState, fetchScoreOverview, fetchVMs, setAdminMode, vmAction } from '@lib/api';

import type { Mode, VM } from '@lib/types';

const incidentDeck = [
  {
    id: 'INC-204',
    title: 'Flag Replay Attempt',
    state: 'mitigated',
    severity: 'medium',
    detail: 'ระบบป้องกันจับ Flag ที่ส่งซ้ำจาก IP 10.21.4.33 และบล็อกการเชื่อมต่อ',
    symbol: '🛡️'
  },
  {
    id: 'INC-219',
    title: 'บริการ DNS ล่ม (ทีม Hawk)',
    state: 'active',
    severity: 'high',
    detail: 'Service checker รายงาน Timeout ติดต่อกัน 4 รอบ',
    symbol: '🚨'
  },
  {
    id: 'INC-225',
    title: 'คำขอรีเซ็ต VM',
    state: 'queued',
    severity: 'low',
    detail: 'ทีม Raven ร้องขอรีเซ็ต Snapshot ล่าสุด',
    symbol: '📋'
  }
];

const auditLog = [
  { ts: '16:22:01', actor: 'Admin-01', action: 'Switch competition mode -> Jeopardy', tone: 'text-rtaf-cyan' },
  { ts: '16:18:44', actor: 'SOC-Automation', action: 'สั่ง Snapshot VM-Falcon-02', tone: 'text-emerald-300' },
  { ts: '16:10:27', actor: 'Admin-02', action: 'Broadcast Advisory ถึงทุกทีม', tone: 'text-white/70' }
];

export default function AdminPage() {
  const { persona, switchPersona } = useAuth();

  if (persona !== 'admin') {
    return (
      <div className="space-y-6">
        <PageTitle subtitle="Access Control">Command Console</PageTitle>
        <Card
          title="Restricted Sector"
          actions={
            <button
              onClick={() => switchPersona('admin')}
              className="rounded-full border border-rtaf-cyan/60 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-rtaf-cyan transition hover:border-rtaf-cyan hover:text-white"
            >
              Elevate to Admin
            </button>
          }
        >
          <p>
            พื้นที่นี้สงวนสำหรับเจ้าหน้าที่ Command เท่านั้น ระบบจะบันทึกทุกความพยายามเข้าถึงใน Audit Log โดยอัตโนมัติ.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/50">
            SOC Notice: แจ้งเตือนหากพบการพยายามเข้าสู่โหมด Admin ซ้ำภายใน 5 นาที
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageTitle subtitle="Admin Ops">Command Console</PageTitle>
      <div className="grid gap-6 2xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <ScoreOverviewCard />
            <ModeSwitcherCard />
          </div>
          <VMControlCard />
        </div>
        <div className="space-y-6">
          <IncidentDeckCard />
          <AuditLogCard />
          <SystemsPulseCard />
        </div>
      </div>
    </div>
  );
}

function ScoreOverviewCard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['score-overview'],
    queryFn: fetchScoreOverview,
    refetchInterval: 5000
  });

  return (
    <Card
      title="Competition Intel"
      actions={<span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase text-white/60">Auto refresh</span>}
    >
      {isLoading && <div className="text-white/60">Loading…</div>}
      {isError && <div className="text-rtaf-alert">Failed to load</div>}
      {data && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.25em] text-white/40">Top Teams</div>
            <ul className="space-y-2 text-sm">
              {data.teams?.slice(0, 5).map((team: any, index: number) => (
                <li key={team.teamId} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">#{index + 1}</span>
                    {team.name}
                  </span>
                  <span className="text-rtaf-cyan">{team.points}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.25em] text-white/40">Top Players</div>
            <ul className="space-y-2 text-sm">
              {data.players?.slice(0, 5).map((player: any, index: number) => (
                <li key={player.userId} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">#{index + 1}</span>
                    {player.name}
                  </span>
                  <span className="text-emerald-300">{player.points}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}

function ModeSwitcherCard() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ['admin-state'], queryFn: fetchAdminState });
  const mutation = useMutation({
    mutationFn: (mode: Mode) => setAdminMode(mode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-state'] });
    }
  });

  const modes: Mode[] = ['jeopardy', 'ad', 'koth'];
  const current = (data?.mode || 'jeopardy') as Mode;

  return (
    <Card title="Competition Mode" actions={<span className="text-xs text-white/60">Current: {current.toUpperCase()}</span>}>
      <div className="flex flex-wrap gap-2">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => mutation.mutate(mode)}
            disabled={mutation.isPending}
            className={`rounded-full border px-4 py-2 text-sm font-medium uppercase tracking-[0.2em] transition ${
              current === mode
                ? 'border-rtaf-cyan/70 bg-gradient-to-r from-rtaf-cyan/30 via-sky-500/30 to-transparent text-white shadow-[0_0_18px_rgba(0,229,255,0.28)]'
                : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
      {mutation.isPending && <div className="mt-3 text-xs text-white/60">Switching…</div>}
      {mutation.isError && <div className="mt-3 text-xs text-rtaf-alert">Failed to switch</div>}
    </Card>
  );
}

function VMControlCard() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['vms'],
    queryFn: fetchVMs,
    refetchInterval: 8000
  });
  const action = useMutation({
    mutationFn: ({ id, a }: { id: string; a: 'start' | 'stop' | 'reset' | 'snapshot' | 'clone' }) => vmAction(id, a),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vms'] })
  });

  return (
    <Card title="Range Assets">
      {isLoading && <div className="text-white/60">Loading…</div>}
      {isError && <div className="text-rtaf-alert">Failed to load VMs</div>}
      {Array.isArray(data) && (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-white/70">
              <tr className="text-left">
                <th className="px-3 py-2">VM</th>
                <th className="px-3 py-2">Lab</th>
                <th className="px-3 py-2">Host</th>
                <th className="px-3 py-2">State</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((vm: VM) => (
                <tr key={vm.id} className="border-t border-white/5">
                  <td className="px-3 py-2 font-medium text-white">{vm.name}</td>
                  <td className="px-3 py-2 text-white/70">{vm.lab || '—'}</td>
                  <td className="px-3 py-2 text-white/70">{vm.host || '—'}</td>
                  <td className="px-3 py-2 text-white/80">{vm.state}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <VMActionButton label="Start" tone="from-emerald-400/40 to-emerald-500/30" onClick={() => action.mutate({ id: vm.id, a: 'start' })} />
                      <VMActionButton label="Stop" tone="from-rose-500/40 to-rose-600/30" onClick={() => action.mutate({ id: vm.id, a: 'stop' })} />
                      <VMActionButton label="Reset" tone="from-amber-400/40 to-amber-500/30" onClick={() => action.mutate({ id: vm.id, a: 'reset' })} />
                      <VMActionButton label="Snapshot" tone="from-sky-500/40 to-sky-600/30" onClick={() => action.mutate({ id: vm.id, a: 'snapshot' })} />
                      <VMActionButton label="Clone" tone="from-indigo-500/40 to-fuchsia-500/30" onClick={() => action.mutate({ id: vm.id, a: 'clone' })} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {action.isPending && <div className="mt-3 text-xs text-white/60">Executing action…</div>}
      {action.isError && <div className="mt-3 text-xs text-rtaf-alert">Action failed</div>}
    </Card>
  );
}

type VMActionButtonProps = {
  label: string;
  tone: string;
  onClick: () => void;
};

function VMActionButton({ label, tone, onClick }: VMActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-white/10 bg-gradient-to-r ${tone} px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white transition hover:scale-[1.02]`}
    >
      {label}
    </button>
  );
}

function IncidentDeckCard() {
  const toneBySeverity: Record<string, string> = {
    high: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
    medium: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
    low: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
  };

  return (
    <Card title="Incident Queue" actions={<span className="text-xs uppercase tracking-[0.3em] text-white/60">Live sync</span>}>
      <ul className="space-y-3 text-sm">
        {incidentDeck.map((incident) => (
          <li key={incident.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
              <span>{incident.id}</span>
              <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] ${toneBySeverity[incident.severity]}`}>
                <span className="text-sm">{incident.symbol}</span>
                {incident.state.toUpperCase()}
              </span>
            </div>
            <div className="mt-2 text-white">{incident.title}</div>
            <div className="mt-1 text-white/70">{incident.detail}</div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function AuditLogCard() {
  return (
    <Card title="Audit Timeline" actions={<span className="text-xs uppercase tracking-[0.3em] text-white/60">UTC+7</span>}>
      <ul className="space-y-3 text-sm">
        {auditLog.map((entry) => (
          <li key={`${entry.ts}-${entry.actor}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-lg">⏱️</div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                <span>{entry.actor}</span>
                <span>{entry.ts}</span>
              </div>
              <div className={`mt-2 text-white ${entry.tone}`}>{entry.action}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function SystemsPulseCard() {
  const signals = [
    { label: 'Range Broadcast', status: 'Nominal', symbol: '📡', tone: 'text-emerald-300' },
    { label: 'SOC Alert Channel', status: '1 Active (High)', symbol: '⚠️', tone: 'text-amber-300' },
    { label: 'Automation Queue', status: '3 pending tasks', symbol: '✅', tone: 'text-rtaf-cyan' }
  ];

  return (
    <Card title="Systems Pulse" subtle>
      <div className="space-y-3 text-sm text-white/80">
        {signals.map((signal) => (
          <div key={signal.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 p-2 text-lg">{signal.symbol}</div>
              <span className="text-white">{signal.label}</span>
            </div>
            <span className={`text-sm font-medium ${signal.tone}`}>{signal.status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
