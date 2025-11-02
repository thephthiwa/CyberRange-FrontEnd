import { useQuery } from '@tanstack/react-query';
import { fetchAdminState } from '@lib/api';
import PageTitle from '@components/ui/PageTitle';
import JeopardyPage from '@features/jeopardy/JeopardyPage';
import ADPage from '@features/attackdefense/ADPage';
import KothPage from '@features/koth/KothPage';

export default function CompetitionPage() {
const { data, isLoading, isError } = useQuery({ queryKey: ['admin-state'], queryFn: fetchAdminState, refetchInterval: 3000 });
const mode = (data?.mode || 'jeopardy') as 'jeopardy'|'ad'|'koth';

if (isLoading) return <div>Loading mode…</div>;
if (isError) return <div className="text-rtaf-alert">Cannot load mode</div>;

return (
<div className="space-y-4">
<PageTitle>Competition — {mode.toUpperCase()}</PageTitle>
{mode === 'jeopardy' && <JeopardyPage />}
{mode === 'ad' && <ADPage />}
{mode === 'koth' && <KothPage />}
</div>
);
}