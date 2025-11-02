import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';

export default function ScoreboardPage() {
  return (
    <div className="space-y-4">
      <PageTitle>Scoreboard</PageTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Teams">Falcon · Hawk · Eagle · Viper</Card>
        <Card title="Players">Top 10 recent</Card>
      </div>
    </div>
  );
}
