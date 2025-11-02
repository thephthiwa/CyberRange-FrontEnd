import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import CategoryBoard from './CategoryBoard';

export default function JeopardyPage() {
  return (
    <div className="space-y-4">
      <PageTitle>CTF Jeopardy</PageTitle>
      <CategoryBoard />
      <Card title="Scoreboard">Top teams · first blood</Card>
    </div>
  );
}
