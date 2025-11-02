import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import VMCard from './VMCard';

export default function LabsPage() {
  return (
    <div className="space-y-4">
      <PageTitle>Practice Labs</PageTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Pentest Range">Multi-VM lab · Snapshot/Clone</Card>
        <Card title="SOC Simulator">SIEM · Cases · Injects</Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <VMCard name="Web-01" state="running" />
        <VMCard name="DB-01" state="stopped" />
        <VMCard name="OT-PLC" state="running" />
      </div>
    </div>
  );
}
