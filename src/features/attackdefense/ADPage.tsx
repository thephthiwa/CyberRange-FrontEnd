import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import ServicesTable from './ServicesTable';

export default function ADPage() {
  return (
    <div className="space-y-4">
      <PageTitle>Attack / Defense</PageTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Teams & Services">4 teams · 6 services/team</Card>
        <Card title="Scoring">Uptime + flag steals</Card>
      </div>
      <ServicesTable />
    </div>
  );
}
