import StatusDot from '@components/ui/StatusDot';

const rows = [
  { team: 'Falcon', svc: 'HTTP', host: '10.0.1.10', port: 80, up: true, latency: 42 },
  { team: 'Hawk', svc: 'DNS', host: '10.0.2.10', port: 53, up: false, latency: 0 },
  { team: 'Eagle', svc: 'SSH', host: '10.0.3.10', port: 22, up: true, latency: 88 },
  { team: 'Raven', svc: 'Telemetry', host: '10.0.4.10', port: 7000, up: true, latency: 65 }
];

export default function ServicesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/10 text-sm">
        <thead className="bg-white/10 text-white/60">
          <tr className="text-left uppercase tracking-[0.25em] text-[11px]">
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Host</th>
            <th className="px-4 py-3">Port</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Latency</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-white/5 text-white">
          {rows.map((row, index) => (
            <tr key={`${row.team}-${row.svc}`} className={index % 2 === 0 ? 'bg-white/10' : 'bg-white/5'}>
              <td className="px-4 py-3 font-semibold text-white">{row.team}</td>
              <td className="px-4 py-3 text-white/80">{row.svc}</td>
              <td className="px-4 py-3 text-white/70">{row.host}</td>
              <td className="px-4 py-3 text-white/70">{row.port}</td>
              <td className="px-4 py-3">
                <span className="flex items-center gap-2 text-white/80">
                  <StatusDot ok={row.up} />
                  {row.up ? 'UP' : 'DOWN'}
                </span>
              </td>
              <td className="px-4 py-3 text-white/70">{row.latency ? `${row.latency} ms` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
