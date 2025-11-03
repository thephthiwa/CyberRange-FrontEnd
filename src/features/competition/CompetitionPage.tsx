import { useQuery } from '@tanstack/react-query';
import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import { fetchAdminState } from '@lib/api';
import JeopardyPage from '@features/jeopardy/JeopardyPage';
import ADPage from '@features/attackdefense/ADPage';
import KothPage from '@features/koth/KothPage';

const modeDescriptions: Record<'jeopardy' | 'ad' | 'koth', string> = {
  jeopardy: 'จับเวลาปล่อยโจทย์ CTF เน้นการไล่ล่า Flag และ First Blood',
  ad: 'ทีมบุกและรับรักษาความพร้อมบริการพร้อมระบบคะแนนอัตโนมัติ',
  koth: 'ชิงพื้นที่ควบคุมระบบป้องกันภัยทางอากาศแบบเวลาจริง'
};

export default function CompetitionPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-state'],
    queryFn: fetchAdminState,
    refetchInterval: 3000
  });

  if (isLoading) return <div className="text-white/70">Loading mode…</div>;
  if (isError) return <div className="text-rtaf-alert">Cannot load mode</div>;

  const mode = (data?.mode || 'jeopardy') as 'jeopardy' | 'ad' | 'koth';

  return (
    <div className="space-y-6">
      <PageTitle>Competition Command</PageTitle>
      <Card
        title={`Current Mode — ${mode.toUpperCase()}`}
        actions={<span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase text-white/60">Auto refresh</span>}
      >
        <div className="grid gap-4 md:grid-cols-[1.8fr_1fr]">
          <div className="space-y-3">
            <p>{modeDescriptions[mode]}</p>
            <div className="grid gap-3 text-xs uppercase tracking-[0.25em] text-white/70 sm:grid-cols-3">
              <span className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white">
                Status: <span className="text-rtaf-cyan">Live</span>
              </span>
              <span className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white">
                Next sync: 15 min
              </span>
              <span className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white">
                Spectators: 42
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">Highlights</div>
            <ul className="mt-2 space-y-2">
              <li>• ระบบแจ้งเตือนคะแนนอัปเดตทุก 5 วินาที</li>
              <li>• ถ่ายทอดสดผลไปยัง Operation Center</li>
              <li>• SOC พร้อมซัพพอร์ตเหตุการณ์พิเศษ</li>
            </ul>
          </div>
        </div>
      </Card>

      {mode === 'jeopardy' && <JeopardyPage />}
      {mode === 'ad' && <ADPage />}
      {mode === 'koth' && <KothPage />}
    </div>
  );
}
