import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function LoginPage() {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (token) navigate('/labs', { replace: true });
  }, [token, navigate]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      await login({ email, password });
      navigate('/labs', { replace: true });
    } catch (err) {
      console.error(err);
      setError('ไม่สามารถตรวจสอบสิทธิ์ได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001732] via-[#00122a] to-[#000915] text-white">
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12 sm:px-12">
        <div className="absolute inset-x-10 top-24 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative flex flex-1 flex-col justify-center gap-12 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
              <span className="h-2 w-2 rounded-full bg-rtaf-cyan" />
              RTAF Cyber Operations Center
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              เข้าสู่ระบบ CyberRange <span className="text-rtaf-cyan">เพื่อเริ่มปฏิบัติภารกิจ</span>
            </h1>
            <p className="text-sm text-white/70 sm:text-base">
              แพลตฟอร์มฝึกปฏิบัติการไซเบอร์ของกองทัพอากาศ จำลองสถานการณ์จริงทั้ง Red Team และ Blue Team พร้อมข้อมูลข่าวกรองและเครื่องมือครบชุดสำหรับเจ้าหน้าที่ประจำศูนย์ปฏิบัติการ.
            </p>
            <dl className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'นักรบไซเบอร์ฝึกแล้ว', value: '1,200+' },
                { label: 'เวลาปฏิบัติการเฉลี่ย', value: '3 ชม./ภารกิจ' },
                { label: 'ความพร้อมภารกิจ', value: 'สถานะ: พร้อม' }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <dt className="text-[11px] uppercase tracking-wide text-white/50">{item.label}</dt>
                  <dd className="mt-1 text-lg font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-rtaf-cyan/30 via-white/0 to-white/0 blur" />
            <div className="relative rounded-3xl border border-white/10 bg-[#00172e]/80 p-8 shadow-lg shadow-black/30 backdrop-blur">
              <div className="mb-6 space-y-1 text-center">
                <h2 className="text-2xl font-semibold">RTAF Secure Access</h2>
                <p className="text-xs text-white/60">กรอกข้อมูล SSO ของคุณเพื่อเข้าสู่ระบบ CyberRange</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-white/70">
                    Military Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-rtaf-cyan focus:ring-2 focus:ring-rtaf-cyan/40"
                    placeholder="name@rtaf.mi.th"
                    value={email}
                    onChange={(event: any) => setEmail(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-white/70">
                    <label htmlFor="password">Access Code</label>
                    <button type="button" className="text-[11px] normal-case text-rtaf-cyan hover:text-white">
                      ลืมรหัสผ่าน?
                    </button>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-rtaf-cyan focus:ring-2 focus:ring-rtaf-cyan/40"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event: any) => setPassword(event.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rtaf-cyan to-teal-300 px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-rtaf-cyan/30 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบและเริ่มฝึก'}
                </button>
                {error && <div className="text-center text-xs text-rtaf-alert">{error}</div>}
              </form>
              <div className="mt-8 grid gap-3 rounded-2xl border border-white/5 bg-black/20 p-4 text-[11px] uppercase tracking-wide text-white/50">
                <div className="flex items-center justify-between">
                  <span>เชื่อมต่อกับเครือข่าย</span>
                  <span className="text-white/70">RTAF-SOC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>เวลาระบบ (ICT)</span>
                  <span className="text-white/70">{new Intl.DateTimeFormat('th-TH', { hour: '2-digit', minute: '2-digit' }).format(new Date())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
