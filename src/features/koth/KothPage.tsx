import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import TargetPanel from './TargetPanel';

export default function KothPage() {
  return (
    <div className="space-y-4">
      <PageTitle>King of the Hill</PageTitle>
      <div className="grid gap-4 md:grid-cols-3">
        <TargetPanel name="Hill-1" holder="Falcon" seconds={320} />
        <TargetPanel name="Hill-2" holder="Hawk" seconds={126} />
        <TargetPanel name="Hill-3" holder="Eagle" seconds={0} />
      </div>
      <Card title="Leaderboard">Hold-time ranking</Card>
    </div>
  );
}
