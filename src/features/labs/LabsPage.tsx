import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLabVMs, fetchLabs, vmAction } from '@lib/api';

const heroStats = [
  { label: 'ภารกิจพร้อมใช้งาน', value: '7 Labs', detail: 'ทุกสภาพแวดล้อมพร้อม' },
  { label: 'Threat Intel ล่าสุด', value: '04:30Z', detail: 'อัปเดตทุก 15 นาที' },
  { label: 'เจ้าหน้าที่ออนไลน์', value: '18', detail: 'SOC + Threat Hunter' }
];

type Lab = {
  id: string;
  name: string;
  kind: string;
  domain: string;
  description: string;
  difficulty: string;
  duration: string;
  status: string;
  highlight: string;
  objectives: string[];
  skills: string[];
  environment: { network: string; tooling: string[]; intel: string };
};

type LabVm = { id: string; name: string; state: string; ip: string; role: string };

export default function LabsPage() {
  const { data: labs, isLoading, isError } = useQuery<Lab[]>({ queryKey: ['labs'], queryFn: fetchLabs });

  return (
    <div className="space-y-10 pb-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/15 via-[#03203f] to-[#020b1a] p-8 shadow-[0_30px_60px_rgba(3,15,35,0.5)]">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 rounded-l-[3rem] bg-gradient-to-br from-rtaf-cyan/40 via-transparent to-transparent blur-3xl md:block" />
        <div className="relative grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
              <span className="h-2 w-2 rounded-full bg-rtaf-cyan" />
              Practice Command
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                RTAF Practice Labs Command Center
              </h1>
              <p className="max-w-2xl text-sm text-white/70 sm:text-base">
                เตรียมความพร้อมกำลังพลกองทัพอากาศด้วยสภาพแวดล้อมการฝึกที่จำลองภารกิจจริง ตั้งแต่การเจาะระบบ การตอบสนองเหตุการณ์ ไปจนถึงการวิเคราะห์ลอจและ OT.
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <dt className="text-[11px] uppercase tracking-wide text-white/50">{item.label}</dt>
                  <dd className="mt-2 text-xl font-semibold text-white">{item.value}</dd>
                  <dd className="text-[11px] uppercase tracking-wide text-white/40">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">Today's Flight Plan</div>
            <ol className="mt-4 space-y-3 text-sm">
              {[
                { title: '0800 - Mission Brief', detail: 'สรุปภาพรวมภัยคุกคามและกติกาปฏิบัติ' },
                { title: '0930 - Live Range', detail: 'เข้าสู่แต่ละ Lab ตามสายงาน' },
                { title: '1300 - Cross Team Sync', detail: 'Blue/Red/SOC แลกเปลี่ยนข้อมูล' },
                { title: '1600 - After Action Review', detail: 'สรุปบทเรียนและแนวทางแก้ไข' }
              ].map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-white/40">Phase {index + 1}</span>
                    <span className="text-[11px] text-white/50">{step.title}</span>
                  </div>
                  <p className="mt-2 text-white/80">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Active Training Programs</h2>
            <p className="text-sm text-white/60">เลือกภารกิจที่ต้องการ เริ่มฝึกและรับรายงานผลแบบเรียลไทม์</p>
          </div>
          <div className="flex gap-2 text-[11px] uppercase tracking-widest text-white/50">
            <span className="rounded-full border border-white/10 px-3 py-1">Red Team</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Blue Team</span>
            <span className="rounded-full border border-white/10 px-3 py-1">OT</span>
          </div>
        </header>

        {isLoading && <div className="text-white/70">กำลังโหลดข้อมูลภารกิจ…</div>}
        {isError && <div className="text-rtaf-alert">ไม่สามารถดึงข้อมูล Lab ได้</div>}

        <div className="grid gap-6">
          {Array.isArray(labs) &&
            labs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
        </div>
      </section>
    </div>
  );
}

type LabCardProps = { lab: Lab; key?: string };

function LabCard({ lab }: LabCardProps) {
  const queryClient = useQueryClient();
  const { data: vms } = useQuery<LabVm[]>({
    queryKey: ['lab-vms', lab.id],
    queryFn: () => fetchLabVMs(lab.id),
    refetchInterval: 8000
  });
  const action = useMutation({
    mutationFn: ({ id, a }: { id: string; a: 'start' | 'stop' | 'reset' | 'snapshot' | 'clone' }) => vmAction(id, a),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lab-vms', lab.id] })
  });

  const handleAction = (vmId: string, a: 'start' | 'stop' | 'reset' | 'snapshot' | 'clone') => {
    action.mutate({ id: vmId, a });
  };

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-[#051c37]/70 to-transparent p-6 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
      <div className="absolute right-16 top-0 h-56 w-56 rounded-full bg-rtaf-cyan/25 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#122c4a]/80 blur-3xl" />
      <div className="relative space-y-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest">
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-white/70">{lab.domain}</span>
              <span className="rounded-full border border-rtaf-cyan/40 bg-rtaf-cyan/10 px-3 py-1 text-rtaf-cyan">{lab.status}</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">{lab.name}</h3>
              <p className="mt-2 text-sm text-white/70">{lab.description}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
              <div className="text-xs uppercase tracking-widest text-white/40">Highlight</div>
              <p className="mt-1 text-white/80">{lab.highlight}</p>
            </div>
          </div>
          <div className="grid shrink-0 gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/70 md:w-64">
            <div className="flex justify-between text-sm text-white">
              <span>Difficulty</span>
              <span className="font-semibold text-rtaf-cyan">{lab.difficulty}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span className="text-white">{lab.duration}</span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40">Skill Focus</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {lab.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Mission Objectives</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              {lab.objectives.map((objective) => (
                <li key={objective} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rtaf-cyan" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Range Environment</div>
            <dl className="mt-3 space-y-3 text-sm text-white/75">
              <div className="flex justify-between">
                <dt className="text-white/50">Network</dt>
                <dd className="text-right text-white/80">{lab.environment.network}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/50">Tooling</dt>
                <dd className="text-right text-white/80">{lab.environment.tooling.join(', ')}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/50">Intel Feed</dt>
                <dd className="text-right text-white/80">{lab.environment.intel}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-black/50 via-black/40 to-black/20 p-5">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/40">
            <span>Active Assets</span>
            <span>Real-time status feed</span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {Array.isArray(vms) && vms.length > 0 ? (
              vms.map((vm) => (
                <div key={vm.id} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <div>
                      <div className="font-medium text-white">{vm.name}</div>
                      <div className="text-xs text-white/50">{vm.role}</div>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-[11px] uppercase tracking-wide ${
                      vm.state === 'running'
                        ? 'bg-emerald-400/20 text-emerald-300'
                        : vm.state === 'stopped'
                        ? 'bg-white/10 text-white/60'
                        : 'bg-amber-400/20 text-amber-200'
                    }`}
                    >
                      {vm.state}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                    <span>{vm.ip}</span>
                    <div className="flex gap-1">
                      {(['start', 'stop', 'reset', 'snapshot', 'clone'] as const).map((actionName) => (
                        <button
                          key={actionName}
                          onClick={() => handleAction(vm.id, actionName)}
                          className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wide text-white/60 transition hover:border-rtaf-cyan hover:text-rtaf-cyan"
                        >
                          {actionName}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/60">
                ยังไม่มีเครื่องเสมือนที่ออนไลน์สำหรับ Lab นี้
              </div>
            )}
          </div>
          {action.isPending && <div className="mt-3 text-xs text-white/60">กำลังดำเนินการ...</div>}
          {action.isError && <div className="mt-3 text-xs text-rtaf-alert">คำสั่งไม่สำเร็จ ลองใหม่อีกครั้ง</div>}
        </div>
      </div>
    </article>
  );
}
