import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import { fetchLabs, fetchLabVMs, vmAction } from '@lib/api';

export default function LabsPage() {
const { data: labs, isLoading, isError } = useQuery({ queryKey: ['labs'], queryFn: fetchLabs });

return (
<div className="space-y-4">
<PageTitle>Practice Labs</PageTitle>
{isLoading && <div>Loading…</div>}
{isError && <div className="text-rtaf-alert">Failed to load labs</div>}
<div className="grid gap-4 md:grid-cols-2">
{Array.isArray(labs) && labs.map((lab: any) => (
<LabCard key={lab.id} lab={lab} />
))}
</div>
</div>
);
}

function LabCard({ lab }: { lab: any }) {
const qc = useQueryClient();
const { data: vms } = useQuery({ queryKey: ['lab-vms', lab.id], queryFn: () => fetchLabVMs(lab.id), refetchInterval: 8000 });
const act = useMutation({
mutationFn: ({ id, a }: { id: string; a: 'start'|'stop'|'reset'|'snapshot'|'clone' }) => vmAction(id, a),
onSuccess: () => qc.invalidateQueries({ queryKey: ['lab-vms', lab.id] })
});

return (
<Card title={`${lab.name} (${lab.kind})`}>
<div className="grid gap-3">
{Array.isArray(vms) && vms.map((vm: any) => (
<div key={vm.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
<div>
<div className="font-medium">{vm.name}</div>
<div className="text-xs text-white/60">State: {vm.state}</div>
</div>
<div className="flex gap-2 text-xs">
{(['start','stop','reset','snapshot','clone'] as const).map(a => (
<button key={a} onClick={() => act.mutate({ id: vm.id, a })} className="rounded-md border border-white/20 px-2 py-1 hover:bg-white/10">{a}</button>
))}
</div>
</div>
))}
</div>
{act.isPending && <div className="mt-2 text-xs text-white/60">Working…</div>}
{act.isError && <div className="mt-2 text-xs text-rtaf-alert">Action failed</div>}
</Card>
);
}