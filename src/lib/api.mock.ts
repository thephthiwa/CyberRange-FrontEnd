import { api } from './api';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(api, { delayResponse: 300 });

let currentMode: 'jeopardy' | 'ad' | 'koth' = 'jeopardy';

const labs = [
  {
    id: 'pentest-range',
    name: 'Pentest Range',
    kind: 'red-team',
    domain: 'Red Team Operations',
    description: 'จำลองฐานสนับสนุนการบินพร้อมช่องโหว่ระดับองค์กรสำหรับฝึกเจาะระบบและยกระดับสิทธิ์.',
    difficulty: 'Intermediate',
    duration: '3 ชั่วโมง',
    status: 'Live Now',
    highlight: 'โจมตีระบบสนับสนุนการบินเพื่อเก็บหลักฐานและทำรายงาน AAR.',
    objectives: [
      'สแกนหาช่องโหว่และระบุจุดโจมตีสำคัญ',
      'ยึดครองเซิร์ฟเวอร์ Command & Control และรักษาสิทธิ์',
      'ส่งมอบรายงาน IOC ให้ SOC ภายใน 2 ชั่วโมง'
    ],
    skills: ['Reconnaissance', 'Privilege Escalation', 'Reporting'],
    environment: {
      network: '3-tier DMZ + Blue HQ',
      tooling: ['Nmap', 'Burp Suite', 'Cobalt Strike'],
      intel: 'SIGINT feed 04:30Z'
    }
  },
  {
    id: 'virtual-lab',
    name: 'Virtual Lab',
    kind: 'foundation',
    domain: 'Cyber Fundamentals',
    description: 'พื้นที่ฝึกเสรีสำหรับทดสอบเทคนิคเชิงลึกทั้ง Windows และ Linux โดยไม่กระทบภารกิจจริง.',
    difficulty: 'Beginner',
    duration: 'ไม่จำกัดเวลา',
    status: 'Available',
    highlight: 'Scenario mini-range พร้อม snapshot อัตโนมัติ.',
    objectives: [
      'ติดตั้งและตั้งค่าชุดเครื่องมือพื้นฐาน',
      'ทดลองโจมตี/ป้องกันแบบ sandbox',
      'บันทึกขั้นตอนเพื่อใช้ในภารกิจจริง'
    ],
    skills: ['Tool Familiarization', 'Scripting', 'System Hardening'],
    environment: {
      network: 'Isolated Segment',
      tooling: ['Kali', 'Security Onion', 'Atomic Red Team'],
      intel: 'Knowledge base update 02:15Z'
    }
  },
  {
    id: 'real-world-simulator',
    name: 'Real World Simulator',
    kind: 'campaign',
    domain: 'Mission Simulation',
    description: 'สถานการณ์จำลองการโจมตีโครงสร้างพื้นฐานของสนามบินและศูนย์ควบคุม.',
    difficulty: 'Advanced',
    duration: '4 ชั่วโมง',
    status: 'Live Now',
    highlight: 'ไล่ล่าผู้บุกรุกในเครือข่ายที่ซับซ้อนพร้อมข้อมูลข่าวกรองสด.',
    objectives: [
      'ติดตามเส้นทางการเจาะจาก Phishing',
      'กักกันระบบที่ถูกยึดและกู้คืนบริการ',
      'ประสานงานกับหน่วย OT เพื่อควบคุมความเสี่ยง'
    ],
    skills: ['Incident Response', 'Forensics', 'Coordination'],
    environment: {
      network: 'Hybrid Cloud + OT',
      tooling: ['Velociraptor', 'ELK Stack', 'SOAR'],
      intel: 'Threat bulletin 03:50Z'
    }
  },
  {
    id: 'soc-simulator',
    name: 'SOC Simulator',
    kind: 'blue-team',
    domain: 'Blue Team Operations',
    description: 'สวมบทนักวิเคราะห์ SOC ตอบสนองเหตุการณ์ตามเวลาจริงผ่าน Dashboard จำลอง.',
    difficulty: 'Intermediate',
    duration: '2 ชั่วโมง',
    status: 'Live Now',
    highlight: 'แจ้งเตือนและ playbook พร้อมใช้งานแบบ role-based.',
    objectives: [
      'คัดกรองแจ้งเตือนและจัดลำดับความสำคัญ',
      'ดำเนิน Playbook ใน SOAR',
      'อัปเดตสถานะและสื่อสารกับผู้บังคับบัญชา'
    ],
    skills: ['Alert Triage', 'SOAR Automation', 'Communication'],
    environment: {
      network: 'SOC Operations',
      tooling: ['Splunk', 'TheHive', 'Cortex XSOAR'],
      intel: 'SOC shift log 04:00Z'
    }
  },
  {
    id: 'log-analysis',
    name: 'Log Analysis Exercise',
    kind: 'analytics',
    domain: 'Threat Analytics',
    description: 'ฝึกวิเคราะห์เหตุการณ์จากบันทึกการใช้งานเครือข่ายและระบบ Cloud.',
    difficulty: 'Beginner',
    duration: '90 นาที',
    status: 'Available',
    highlight: 'Dataset ใหม่อัปเดตทุกสัปดาห์พร้อมคำถามแนว CTF.',
    objectives: [
      'สร้างคำสั่งค้นหาเพื่อระบุพฤติกรรมผิดปกติ',
      'สรุปสาเหตุและผลกระทบของเหตุการณ์',
      'จัดทำรายงานเพื่อส่งต่อให้ผู้บริหาร'
    ],
    skills: ['Log Parsing', 'Detection Engineering', 'Reporting'],
    environment: {
      network: 'Cloud & On-prem Logs',
      tooling: ['Kibana', 'Sigma', 'Jupyter'],
      intel: 'Detection feed 01:40Z'
    }
  },
  {
    id: 'threat-hunting',
    name: 'Threat Hunting Lab',
    kind: 'hunting',
    domain: 'Threat Hunting',
    description: 'วิเคราะห์ IOC และ Hunt ในเครือข่ายกองทัพอากาศจากข้อมูล Telemetry ขนาดใหญ่.',
    difficulty: 'Advanced',
    duration: '3 ชั่วโมง',
    status: 'Live Now',
    highlight: 'รวมข้อมูลจาก Endpoint, Network, และ Cloud Telemetry.',
    objectives: [
      'ระบุเส้นทางการโจมตีเชิงลึก',
      'ยืนยัน IOC และอัปเดต Threat Intel',
      'เสนอแนะมาตรการป้องกันเชิงรุก'
    ],
    skills: ['Hypothesis-driven Hunt', 'Data Fusion', 'Intel Sharing'],
    environment: {
      network: 'Enterprise + AirOps Segment',
      tooling: ['MISP', 'Elastic', 'YARA'],
      intel: 'Intel fusion 03:10Z'
    }
  },
  {
    id: 'ot-scenario',
    name: 'OT Scenario Lab',
    kind: 'ot',
    domain: 'Airfield OT Defense',
    description: 'ตอบสนองเหตุการณ์ในระบบควบคุมสนามบินและระบบช่วยเดินอากาศ.',
    difficulty: 'Advanced',
    duration: '2.5 ชั่วโมง',
    status: 'Live Soon',
    highlight: 'Scenario รูปแบบ Airfield Lighting และ Fuel Farm.',
    objectives: [
      'ตรวจจับการเปลี่ยนค่า PLC ที่ผิดปกติ',
      'ใช้งาน playbook OT Incident Response',
      'สื่อสารกับหน่วยอากาศยานและฝ่ายวิศวกรรม'
    ],
    skills: ['ICS Monitoring', 'Protocol Analysis', 'Coordination'],
    environment: {
      network: 'SCADA + Field Devices',
      tooling: ['Kibana OT Dash', 'Wireshark', 'GRASSMARLIN'],
      intel: 'OT advisory 05:00Z'
    }
  }
];

const labAssets: Record<string, Array<{ id: string; name: string; state: 'running' | 'stopped' | 'suspended'; ip: string; role: string }>> = {
  'pentest-range': [
    { id: 'vm-pentest-1', name: 'Web-Strike-01', state: 'running', ip: '10.10.5.21', role: 'Target Web Server' },
    { id: 'vm-pentest-2', name: 'DB-Stronghold', state: 'suspended', ip: '10.10.5.32', role: 'Post Exploitation' }
  ],
  'virtual-lab': [
    { id: 'vm-virtual-1', name: 'Kali-Training', state: 'running', ip: '10.20.1.11', role: 'Offensive Toolkit' },
    { id: 'vm-virtual-2', name: 'Win-BlueLab', state: 'stopped', ip: '10.20.1.23', role: 'Defensive Practice' }
  ],
  'real-world-simulator': [
    { id: 'vm-real-1', name: 'SOC-Gateway', state: 'running', ip: '172.16.40.5', role: 'Ingress Monitor' },
    { id: 'vm-real-2', name: 'Incident-Workstation', state: 'running', ip: '172.16.40.21', role: 'Responder Console' }
  ],
  'soc-simulator': [
    { id: 'vm-soc-1', name: 'SIEM-Core', state: 'running', ip: '10.30.2.10', role: 'Alert Engine' },
    { id: 'vm-soc-2', name: 'SOAR-Orchestrator', state: 'running', ip: '10.30.2.12', role: 'Automation Hub' }
  ],
  'log-analysis': [
    { id: 'vm-log-1', name: 'Analytics-Node', state: 'running', ip: '10.40.8.7', role: 'Query Sandbox' }
  ],
  'threat-hunting': [
    { id: 'vm-hunt-1', name: 'Hunt-Console', state: 'running', ip: '10.50.3.19', role: 'Analyst Workbench' },
    { id: 'vm-hunt-2', name: 'Intel-Relay', state: 'stopped', ip: '10.50.3.22', role: 'Intel Sync' }
  ],
  'ot-scenario': [
    { id: 'vm-ot-1', name: 'SCADA-Master', state: 'suspended', ip: '192.168.120.10', role: 'Control Master' },
    { id: 'vm-ot-2', name: 'Field-PLC', state: 'stopped', ip: '192.168.120.44', role: 'Airfield PLC' }
  ]
};

const overviewVMs = Object.values(labAssets).flat();

mock.onPost('/auth/login').reply((config) => {
  const { email } = JSON.parse(config.data || '{}');
  return [
    200,
    {
      token: 'mock-rtaf-token',
      user: {
        name: 'Flt. Lt. Arisa Theppharat',
        rank: 'Flt. Lt.',
        role: 'Cyber Defense Officer',
        unit: 'RTAF Cyber Operations Center',
        email: email || 'arisa.theppharat@rtaf.mi.th'
      }
    }
  ];
});

mock.onGet('/admin/state').reply(200, { mode: currentMode });
mock.onPost('/admin/mode').reply((cfg) => {
  currentMode = JSON.parse(cfg.data).mode;
  return [200, { ok: true }];
});
mock.onGet('/scoreboard/overview').reply(200, {
  teams: [
    { teamId: 't1', name: 'Falcon', points: 1200 },
    { teamId: 't2', name: 'Hawk', points: 980 }
  ],
  players: [
    { userId: 'u1', name: 'Alice', points: 640 },
    { userId: 'u2', name: 'Bob', points: 590 }
  ],
  updatedAt: new Date().toISOString()
});
mock.onGet('/vms').reply(200, overviewVMs);
mock.onPost(/\/vms\/([^/]+)\/action/).reply(200, { ok: true });
mock.onGet('/labs').reply(200, labs);
mock.onGet(/\/labs\/([^/]+)\/vms/).reply((config) => {
  const labId = config.url?.split('/')?.[2];
  return [200, labId ? labAssets[labId] ?? [] : []];
});

export {}; // side-effect only
