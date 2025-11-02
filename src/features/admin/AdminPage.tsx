import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <PageTitle>Admin Console</PageTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Event Control" actions={<button className="text-xs rounded-md border border-rtaf-cyan/50 px-2 py-1">Freeze</button>}>
          Start / Stop / Freeze event (wired to backend later)
        </Card>
        <Card title="Challenges Manager">Create, hide/unhide, points, flags</Card>
        <Card title="Users & Teams">Assign roles, reset passwords</Card>
        <Card title="Audit Log">Track admin actions</Card>
      </div>
    </div>
  );
}
