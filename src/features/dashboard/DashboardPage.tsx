import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PageTitle>Airbase Tactical Console</PageTitle>
      <Card title="Modes">Jeopardy · Attack/Defense · KoTH · Labs — quick access</Card>
      <Card title="Announcements">Broadcast messages from Command</Card>
      <Card title="Live Scores">Top teams & players (auto-refresh planned)</Card>
      <Card title="Upcoming Events">Schedule & status</Card>
    </div>
  );
}
