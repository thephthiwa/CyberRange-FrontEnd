import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import { useAuth } from '@features/auth/AuthContext';
import { fetchAdminState, fetchScoreOverview, fetchVMs, setAdminMode, vmAction } from '@lib/api';
import type { Mode, VM } from '@lib/types';

export default function AdminPage() {
  const { persona, switchPersona } = useAuth();

  if (persona !== 'admin') {
    return (
      <div className="space-y-6">
        <PageTitle>Command Console</PageTitle>
        <Card
          title="Restricted Area"
          actions={
            <button
              onClick={() => switchPersona('admin')}
              className="rounded-full border border-rtaf-cyan/60 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-rtaf-cyan transition hover:border-rtaf-cyan hover:text-white"
            >
              Switch to Admin Mode
            </button>
          }
        >
          <p>
            คุณกำลังใช้งานในโหมด Operator ซึ่งไม่มีสิทธิเข้าถึง Command Console. สลับไปยังโหมด Admin เพื่อจัดการการแข่งขันและระบบ VM
            ทั้งหมด.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/50">
            Audit log: ป้องกันการเข้าใช้งานโดยไม่ได้รับอนุญาต
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageTitle>Command Console</PageTitle>
      <div className="grid gap-6 lg:grid-cols-2">
        <ScoreOverviewCard />
        <ModeSwitcherCard />
      </div>
      <VMControlCard />
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
