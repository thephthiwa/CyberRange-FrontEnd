import Card from '@components/ui/Card';
import PageTitle from '@components/ui/PageTitle';
import ServicesTable from './ServicesTable';

export default function ADPage() {
  return (
    <div className="space-y-6">
      <PageTitle>Attack / Defense Arena</PageTitle>
      <Card title="Mission Overview">
        <p>
          แต่ละทีมต้องรักษาความพร้อมบริการสำคัญพร้อมทั้งโจมตีทีมอื่นเพื่อยึด Flag. ระบบจะตรวจสอบสถานะบริการทุก 30 วินาทีและบันทึกการโจมตีที่สำเร็จลง
          ใน Log โดยอัตโนมัติ.
        </p>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Teams & Services">
          มีทั้งหมด 4 ทีม โดยแต่ละทีมต้องดูแล 6 บริการหลัก ได้แก่ HTTP, DNS, SSH, Database, VPN และ Telemetry
        </Card>
        <Card title="Scoring Model">
          คะแนนประกอบด้วย Uptime, การป้องกันการโจมตี และคะแนน Flag Steal เมื่อยึดบริการจากทีมอื่นได้สำเร็จ
        </Card>
      </div>
      <ServicesTable />
    </div>
  );
}
