import StatusDot from '@components/ui/StatusDot';

const rows = [
  { team: 'Falcon', svc: 'HTTP', host: '10.0.1.10', port: 80, up: true, latency: 42 },
  { team: 'Hawk', svc: 'DNS', host: '10.0.2.10', port: 53, up: false, latency: 0 },
  { team: 'Eagle', svc: 'SSH', host: '10.0.3.10', port: 22, up: true, latency: 88 }
];

export default function ServicesTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="min-w-full text-sm">
        <thead className="bg-white/5">
          <tr className="text-left">
            <th className="px-3 py-2">Team</th>
            <th className="px-3 py-2">Service</th>
            <th className="px-3 py-2">Host</th>
            <th className="px-3 py-2">Port</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Latency</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i) => (
            <tr key={i} className="border-t border-white/5">
              <td className="px-3 py-2">{r.team}</td>
              <td className="px-3 py-2">{r.svc}</td>
              <td className="px-3 py-2">{r.host}</td>
              <td className="px-3 py-2">{r.port}</td>
              <td className="px-3 py-2 flex items-center gap-2"><StatusDot ok={r.up} /> {r.up ? 'UP' : 'DOWN'}</td>
              <td className="px-3 py-2">{r.latency} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
