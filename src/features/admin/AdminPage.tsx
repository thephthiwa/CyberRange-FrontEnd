import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import { fetchScoreOverview, fetchAdminState, setAdminMode, fetchVMs, vmAction } from '@lib/api';
import type { Mode, VM } from '@lib/types';

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <PageTitle>Admin Console</PageTitle>
      <div className="grid gap-4 md:grid-cols-2">
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
    refetchInterval: 5000,
  });
  return (
    <Card title="Score Overview" actions={<span className="text-xs text-white/60">auto-refresh</span>}>
      {isLoading && <div>Loading…</div>}
      {isError && <div className="text-rtaf-alert">Failed to load</div>}
      {data && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="font-semibold mb-2">Top Teams</div>
            <ul className="space-y-1 text-sm">
              {data.teams?.slice(0, 5).map((t: any) => (
                <li key={t.teamId} className="flex justify-between">
                  <span>{t.name}</span>
                  <span>{t.points}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Top Players</div>
            <ul className="space-y-1 text-sm">
              {data.players?.slice(0, 5).map((p: any) => (
                <li key={p.userId} className="flex justify-between">
                  <span>{p.name}</span>
                  <span>{p.points}</span>
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
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['admin-state'], queryFn: fetchAdminState });
  const mutation = useMutation({
    mutationFn: (mode: Mode) => setAdminMode(mode),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-state'] });
    },
  });

  const modes: Mode[] = ['jeopardy', 'ad', 'koth'];
  const current = (data?.mode || 'jeopardy') as Mode;

  return (
    <Card title="Competition Mode" actions={<span className="text-xs text-white/60">current: {current}</span>}>
      <div className="flex gap-2">
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => mutation.mutate(m)}
            className={`px-3 py-1 rounded-lg border text-sm transition ${
              current === m ? 'bg-cyan-400/20 border-cyan-300/50' : 'border-white/10 hover:bg-white/5'
            }`}
            disabled={mutation.isPending}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
      {mutation.isPending && <div className="mt-2 text-xs text-white/60">Switching…</div>}
      {mutation.isError && <div className="mt-2 text-xs text-rtaf-alert">Failed to switch</div>}
    </Card>
  );
}

function VMControlCard() {
  const qc = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['vms'],
    queryFn: fetchVMs,
    refetchInterval: 8000,
  });
  const action = useMutation({
    mutationFn: ({ id, a }: { id: string; a: 'start' | 'stop' | 'reset' | 'snapshot' | 'clone' }) => vmAction(id, a),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vms'] }),
  });

  return (
    <Card title="VM Control">
      {isLoading && <div>Loading…</div>}
      {isError && <div className="text-rtaf-alert">Failed to load VMs</div>}
      {Array.isArray(data) && (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
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
                  <td className="px-3 py-2">{vm.name}</td>
                  <td className="px-3 py-2">{vm.lab || '—'}</td>
                  <td className="px-3 py-2">{vm.host || '—'}</td>
                  <td className="px-3 py-2">{vm.state}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2 text-xs">
                      <VMBtn label="Start" onClick={() => action.mutate({ id: vm.id, a: 'start' })} />
                      <VMBtn label="Stop" onClick={() => action.mutate({ id: vm.id, a: 'stop' })} />
                      <VMBtn label="Reset" onClick={() => action.mutate({ id: vm.id, a: 'reset' })} />
                      <VMBtn label="Snapshot" onClick={() => action.mutate({ id: vm.id, a: 'snapshot' })} />
                      <VMBtn label="Clone" onClick={() => action.mutate({ id: vm.id, a: 'clone' })} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {action.isPending && <div className="mt-2 text-xs text-white/60">Executing action…</div>}
      {action.isError && <div className="mt-2 text-xs text-rtaf-alert">Action failed</div>}
    </Card>
  );
}

function VMBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-md border border-white/20 px-2 py-1 hover:bg-white/10">
      {label}
    </button>
  );
}
