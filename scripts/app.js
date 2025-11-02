const state = {
  userRole: 'admin',
  mode: 'jeopardy',
  teams: [
    { name: 'Red Falcon', total: 4520, attack: 1300, defense: 1800, service: 1420 },
    { name: 'Blue Hydra', total: 3890, attack: 1100, defense: 1450, service: 1340 },
    { name: 'Green Warden', total: 3280, attack: 980, defense: 1220, service: 1080 },
  ],
  vms: [
    { id: 'vm-core-01', name: 'Core Orchestrator', online: true, cpu: 62, memory: 48 },
    { id: 'vm-chal-02', name: 'Challenge Node Alpha', online: true, cpu: 44, memory: 32 },
    { id: 'vm-chal-03', name: 'Challenge Node Beta', online: false, cpu: 0, memory: 0 },
    { id: 'vm-sim-04', name: 'Attack Simulator', online: true, cpu: 71, memory: 55 },
  ],
  practice: {
    activeFilter: 'all',
    filters: [
      { id: 'all', label: 'ทั้งหมด' },
      { id: 'offense', label: 'Offensive' },
      { id: 'defense', label: 'Defensive' },
      { id: 'forensics', label: 'Forensics' },
      { id: 'cloud', label: 'Cloud / DevSecOps' },
      { id: 'fundamental', label: 'Fundamental' },
    ],
    stats: [
      {
        id: 'path-progress',
        title: 'Offensive Specialist Path',
        value: '45%',
        meta: 'ความคืบหน้าปัจจุบัน',
      },
      {
        id: 'skill-rating',
        title: 'คะแนน Skill Rating',
        value: '1,280',
        meta: '+120 ในสัปดาห์นี้',
      },
      {
        id: 'streak',
        title: 'Learning Streak',
        value: '7 วัน',
        meta: 'เรียนต่อเนื่อง',
      },
      {
        id: 'completed',
        title: 'Lab ที่เสร็จแล้ว',
        value: '18/32',
        meta: 'ครบ 3 เส้นทางหลัก',
      },
    ],
    labs: [
      {
        id: 'lab-off-advanced',
        title: 'Advanced Exploit Development',
        description:
          'สร้าง exploit เชิงลึกสำหรับบริการที่มีการป้องกันด้วย ASLR / DEP พร้อมทำ bypass mitigation',
        category: 'offense',
        difficulty: 'ขั้นสูง',
        tags: ['Binary', 'ROP', 'Bypass'],
        duration: '90 นาที',
        progress: 62,
        status: 'กำลังเรียน',
        xp: 420,
        lastActive: '2 ชั่วโมงที่แล้ว',
      },
      {
        id: 'lab-def-blue',
        title: 'Network Breach Hunt',
        description:
          'วิเคราะห์ packet capture และ log เพื่อระบุ lateral movement พร้อมสร้าง playbook ตอบสนอง',
        category: 'defense',
        difficulty: 'กลาง',
        tags: ['SIEM', 'PCAP', 'Threat Hunting'],
        duration: '75 นาที',
        progress: 35,
        status: 'เปิดแล้ว',
        xp: 260,
        lastActive: 'เมื่อวานนี้',
      },
      {
        id: 'lab-forensics',
        title: 'Memory Forensics - Persistence',
        description:
          'เรียนรู้การดึง process / dll แปลกปลอม และวิเคราะห์ artefact ใน snapshot ของระบบปฏิบัติการ',
        category: 'forensics',
        difficulty: 'ขั้นสูง',
        tags: ['Volatility', 'Windows', 'Malware'],
        duration: '60 นาที',
        progress: 0,
        status: 'พร้อมเริ่ม',
        xp: 310,
        lastActive: 'ยังไม่เคยเริ่ม',
      },
      {
        id: 'lab-cloud',
        title: 'Cloud Container Hardening',
        description:
          'ประเมิน misconfiguration บน Kubernetes และปรับแต่ง policy เพื่อป้องกันการยกระดับสิทธิ์',
        category: 'cloud',
        difficulty: 'กลาง',
        tags: ['Kubernetes', 'Policy', 'DevSecOps'],
        duration: '80 นาที',
        progress: 48,
        status: 'กำลังเรียน',
        xp: 300,
        lastActive: '3 ชั่วโมงที่แล้ว',
      },
      {
        id: 'lab-fundamental',
        title: 'Web Exploitation Essentials',
        description:
          'เสริมพื้นฐาน SQLi, XSS และการ bypass authentication ด้วย lab จำลองสถานการณ์จริง',
        category: 'fundamental',
        difficulty: 'พื้นฐาน',
        tags: ['Web', 'SQLi', 'XSS'],
        duration: '55 นาที',
        progress: 92,
        status: 'ใกล้เสร็จ',
        xp: 180,
        lastActive: '4 วันที่แล้ว',
      },
    ],
    tracks: [
      {
        id: 'track-red',
        title: 'Red Team Adaptive Campaign',
        description:
          'จำลองการบุกแบบ multi-stage ตั้งแต่ recon จนถึง data exfiltration พร้อม feedback เชิงลึก',
        focus: ['Initial Access', 'Lateral Movement', 'Action on Objectives'],
        progress: 58,
        xp: 1240,
      },
      {
        id: 'track-blue',
        title: 'Incident Commander Drill',
        description:
          'ฝึกการตัดสินใจตอบสนองเหตุการณ์ขั้นวิกฤติแบบ time-boxed พร้อม brief รายงานผู้บริหาร',
        focus: ['Detection', 'Containment', 'Eradication'],
        progress: 34,
        xp: 980,
      },
    ],
    sessions: [
      {
        id: 'session-1',
        title: 'Live Lab Coaching: Privilege Escalation',
        startTime: 'วันนี้ 19:30',
        duration: '60 นาที',
        mentor: 'โค้ช Arisa',
        type: 'กลุ่มเล็ก',
        focus: 'Linux PrivEsc',
      },
      {
        id: 'session-2',
        title: 'Capture The Flag Scrimmage',
        startTime: 'ศุกร์ 20:00',
        duration: '120 นาที',
        mentor: 'ทีม Staff',
        type: 'ทีม',
        focus: 'Jeopardy Mixed',
      },
      {
        id: 'session-3',
        title: 'Blue Team Retro & Post-Incident Review',
        startTime: 'เสาร์ 14:00',
        duration: '90 นาที',
        mentor: 'โค้ช Ken',
        type: 'เวิร์กช็อป',
        focus: 'Incident Response',
      },
    ],
    resources: [
      {
        id: 'resource-1',
        title: 'Playbook: จาก Alert ถึง Response ใน 30 นาที',
        type: 'PDF Guide',
        description: 'สรุปขั้นตอนและ checklist สำหรับ Blue Team ในการตอบสนองเหตุการณ์จริง',
      },
      {
        id: 'resource-2',
        title: 'Exploit Development Kata',
        type: 'Mini Lab',
        description: 'แบบฝึกสำหรับเจาะระบบ binary ระดับต้น-กลาง พร้อมเฉลยทีละขั้น',
      },
      {
        id: 'resource-3',
        title: 'Threat Intel Brief ประจำสัปดาห์',
        type: 'Intel Feed',
        description: 'อัปเดตแคมเปญโจมตีที่น่าสนใจ พร้อมแนวทางตั้งค่า alert',
      },
    ],
  },
};

const modeDescriptions = {
  jeopardy: {
    name: 'Jeopardy CTF',
    summary:
      'โหมดตอบคำถามแบบ Jeopardy ที่เน้นการแก้โจทย์เป็นรายหมวดหมู่ สะสมแต้มตามระดับความยากและเวลาที่เหลือ',
    focus: ['การวิเคราะห์โจทย์เชิงเทคนิค', 'การบริหารเวลาและแต้ม', 'การทำงานเป็นทีม'],
  },
  'attack-defense': {
    name: 'Attack / Defense',
    summary:
      'แต่ละทีมต้องป้องกันบริการของตัวเองพร้อมกับโจมตีบริการของคู่แข่งเพื่อแย่งคะแนนและฟลัก',
    focus: ['Hardening ระบบ', 'โต้ตอบช่องโหว่แบบเรียลไทม์', 'การทำ incident response'],
  },
  koth: {
    name: 'King of the Hill',
    summary:
      'แย่งชิงการควบคุมเครื่องหมายเป้าหมาย (king) โดยทีมที่ครองพื้นที่นานที่สุดจะได้รับคะแนนสูงสุด',
    focus: ['การยึดและรักษาสิทธิ์', 'การจู่โจมแบบต่อเนื่อง', 'การจัดการทรัพยากรทีม'],
  },
};

const personaProfiles = {
  admin: {
    label: 'Admin',
    badge: 'มุมมองผู้ดูแลระบบ',
    adminHero: {
      title: 'Admin Operations Console',
      message:
        'กำหนดกลยุทธ์การแข่งขัน กำกับเครื่องเสมือน และดูภาพรวมคะแนนทั้งหมดเพื่อให้ประสบการณ์การแข่งราบรื่น',
      actions: {
        primary: 'กระจายประกาศล่าสุด',
        secondary: 'เปิดบันทึกเหตุการณ์',
      },
    },
    competitionHero: {
      title: 'การแข่งขันสด - มุมมองผู้ดูแล',
      message: 'ติดตามคะแนนแบบเรียลไทม์และประกาศแจ้งเตือนไปยังทุกทีมได้ทันที',
    },
    practiceBadge: 'กำลังดูข้อมูลการฝึกของทุกทีม',
  },
  competitor: {
    label: 'ผู้เข้าแข่งขัน',
    badge: 'มุมมองผู้เข้าแข่งขัน',
    adminHero: {
      title: 'Admin Console (จำลอง)',
      message:
        'ในฐานะผู้เข้าแข่งขัน คุณสามารถตรวจสอบสถานะการแข่งขันและดูคะแนนรวม แต่ไม่สามารถสั่งการระบบได้',
      actions: {
        primary: 'ขอสิทธิ์การเข้าถึง',
        secondary: 'ดูคู่มือการแข่งขัน',
      },
    },
    competitionHero: {
      title: 'การแข่งขันสด - มุมมองทีม',
      message: 'ติดตามตำแหน่งทีมคุณบนกระดานคะแนนและดูคำแนะนำที่เกี่ยวข้องกับโหมดปัจจุบัน',
    },
    practiceBadge: 'ซิงก์ความคืบหน้าส่วนตัวของทีมคุณ',
  },
};

const routes = {
  admin: renderAdmin,
  competition: renderCompetition,
  practice: renderPracticeLab,
};

const appRoot = document.getElementById('app');
const navButtons = document.querySelectorAll('.nav-button');
const personaButtons = document.querySelectorAll('.persona-button');
let currentRoute = 'admin';

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const route = button.dataset.route;
    navigate(route);
  });
});

personaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const { persona } = button.dataset;
    if (!persona || state.userRole === persona) return;
    state.userRole = persona;
    personaButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.persona === persona));
    renderToast(`สลับเป็นมุมมอง${personaProfiles[persona].label}`);
    routes[currentRoute]();
  });
});

function navigate(route) {
  if (!routes[route]) return;
  navButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.route === route));
  currentRoute = route;
  routes[route]();
}

function renderAdmin() {
  const persona = personaProfiles[state.userRole];
  const isAdmin = state.userRole === 'admin';
  const totalScore = state.teams.reduce((sum, team) => sum + team.total, 0);
  const onlineVMs = state.vms.filter((vm) => vm.online).length;
  const mode = modeDescriptions[state.mode];

  const operationsFeed = [
    { time: '13:05', event: 'อัปเดตคะแนนรอบล่าสุด', detail: 'ระบบดึงข้อมูล Jeopardy flag +180 แต้ม' },
    { time: '12:52', event: 'ตรวจสอบ VM Attack Simulator', detail: 'CPU พุ่งสูงสุด 82% ระหว่างรันสคริปต์' },
    { time: '12:40', event: 'แจ้งเตือน Service Down', detail: 'ทีม Blue Hydra แจ้งปัญหาบริการ web03 ล่ม' },
  ];

  const playbook = [
    'ยืนยันสถานะ VM ที่ออฟไลน์ก่อนเริ่มรอบใหม่',
    'กระจายประกาศเกี่ยวกับ scope การโจมตีเพิ่มเติม',
    'ตรวจสอบทราฟฟิกผิดปกติใน Splunk dashboard',
  ];

  appRoot.innerHTML = `
    <section class="admin-dashboard">
      <div class="admin-main">
        <section class="section command-hero">
          <div class="command-hero__copy">
            <span class="persona-pill">${persona.badge}</span>
            <h2>${persona.adminHero.title}</h2>
            <p>${persona.adminHero.message}</p>
            <div class="command-hero__actions">
              <button class="button primary ${!isAdmin ? 'disabled' : ''}" data-action="broadcast">
                ${persona.adminHero.actions.primary}
              </button>
              <button class="button ghost" data-action="timeline">${persona.adminHero.actions.secondary}</button>
            </div>
          </div>
          <div class="command-hero__stats">
            <article class="stat-card">
              <span class="stat-card__label">คะแนนรวมสะสม</span>
              <strong class="stat-card__value">${totalScore.toLocaleString('th-TH')}</strong>
              <span class="stat-card__meta">รวมทุกทีมในระบบ</span>
            </article>
            <article class="stat-card">
              <span class="stat-card__label">ทีมที่เข้าร่วม</span>
              <strong class="stat-card__value">${state.teams.length} ทีม</strong>
              <span class="stat-card__meta">อัปเดต ${new Date().toLocaleTimeString('th-TH')}</span>
            </article>
            <article class="stat-card">
              <span class="stat-card__label">VM ออนไลน์</span>
              <strong class="stat-card__value">${onlineVMs}/${state.vms.length}</strong>
              <span class="stat-card__meta">พร้อมรับคำสั่งทันที</span>
            </article>
            <article class="stat-card">
              <span class="stat-card__label">โหมดปัจจุบัน</span>
              <strong class="stat-card__value">${mode.name}</strong>
              <span class="stat-card__meta">${mode.focus[0]}</span>
            </article>
          </div>
        </section>

        <section class="section admin-scoreboard">
          <div class="section-header">
            <h2>ภาพรวมคะแนนต่อทีม</h2>
            <span>${isAdmin ? 'สามารถ drill down เพื่อดูรายละเอียดเพิ่มเติม' : 'มุมมองอ่านอย่างเดียวสำหรับผู้เข้าแข่งขัน'}</span>
          </div>
          <div class="summary-grid">
            ${state.teams
              .map(
                (team) => `
                  <article class="summary-card">
                    <h3>${team.name}</h3>
                    <div class="value">${team.total.toLocaleString('th-TH')}</div>
                    <span class="badge">Attack: ${team.attack.toLocaleString('th-TH')}</span>
                    <span class="badge">Defense: ${team.defense.toLocaleString('th-TH')}</span>
                    <span class="badge">Service: ${team.service.toLocaleString('th-TH')}</span>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>

        <section class="section admin-mode-control">
          <div class="section-header">
            <h2>โหมดการแข่งขัน</h2>
            <span>${
              isAdmin
                ? 'เลือกโหมดเพื่อสลับประสบการณ์การแข่งแบบเรียลไทม์'
                : 'มุมมองจำลอง ไม่สามารถสลับโหมดได้'
            }</span>
          </div>
          <div class="mode-detail">
            <div class="mode-detail__copy">
              <h3>${mode.name}</h3>
              <p>${mode.summary}</p>
              <div class="mode-focus">
                ${mode.focus.map((item) => `<span class="chip">${item}</span>`).join('')}
              </div>
            </div>
            <div class="mode-switcher">
              <label for="mode-select">เลือกโหมด</label>
              <select id="mode-select" ${isAdmin ? '' : 'disabled'}>
                <option value="jeopardy" ${state.mode === 'jeopardy' ? 'selected' : ''}>Jeopardy</option>
                <option value="attack-defense" ${state.mode === 'attack-defense' ? 'selected' : ''}>Attack / Defense</option>
                <option value="koth" ${state.mode === 'koth' ? 'selected' : ''}>KoTH</option>
              </select>
              ${
                isAdmin
                  ? '<span class="helper-text">การสลับจะอัปเดตทุกหน้าจอทันที</span>'
                  : '<span class="helper-text">ต้องมีสิทธิ์ผู้ดูแลจึงจะสลับได้</span>'
              }
            </div>
          </div>
        </section>

        <section class="section admin-vms">
          <div class="section-header">
            <h2>ควบคุม VM</h2>
            <span>${
              isAdmin
                ? 'สั่งงาน VM เพื่อรับมือเหตุการณ์และปรับแต่งสภาพแวดล้อม'
                : 'ดูสถานะ VM ได้เท่านั้นในมุมมองผู้เข้าแข่งขัน'
            }</span>
          </div>
          <div class="vm-grid">
            ${state.vms
              .map(
                (vm) => `
                  <article class="vm-card">
                    <div>
                      <h3>${vm.name}</h3>
                      <p>ID: ${vm.id}</p>
                    </div>
                    <div class="status-indicator ${vm.online ? 'online' : ''}">
                      ${vm.online ? 'ออนไลน์' : 'ออฟไลน์'}
                    </div>
                    <div class="vm-metrics">
                      <span>CPU: ${vm.cpu}%</span>
                      <span> | RAM: ${vm.memory}%</span>
                    </div>
                    <div class="vm-actions">
                      <button class="button ${!isAdmin ? 'disabled' : ''}" data-action="start" data-vm="${
                        vm.id
                      }" ${isAdmin ? '' : 'disabled'}>Start</button>
                      <button class="button ${!isAdmin ? 'disabled' : ''}" data-action="restart" data-vm="${
                        vm.id
                      }" ${isAdmin ? '' : 'disabled'}>Restart</button>
                      <button class="button danger ${!isAdmin ? 'disabled' : ''}" data-action="shutdown" data-vm="${
                        vm.id
                      }" ${isAdmin ? '' : 'disabled'}>Shutdown</button>
                    </div>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>
      </div>

      <aside class="admin-sidebar">
        <section class="section admin-feed">
          <div class="section-header">
            <h2>Incident Feed</h2>
            <span>ล่าสุด 3 รายการ</span>
          </div>
          <ul class="feed-list">
            ${operationsFeed
              .map(
                (item) => `
                  <li class="feed-item">
                    <div class="feed-item__time">${item.time}</div>
                    <div class="feed-item__content">
                      <strong>${item.event}</strong>
                      <span>${item.detail}</span>
                    </div>
                  </li>
                `
              )
              .join('')}
          </ul>
        </section>

        <section class="section admin-playbook">
          <div class="section-header">
            <h2>Quick Playbook</h2>
            <span>ขั้นตอนแนะนำก่อนรอบถัดไป</span>
          </div>
          <ol class="playbook-list">
            ${playbook.map((step) => `<li>${step}</li>`).join('')}
          </ol>
        </section>
      </aside>
    </section>
  `;

  const select = document.getElementById('mode-select');
  if (select) {
    select.addEventListener('change', (event) => {
      state.mode = event.target.value;
      renderToast(`เปลี่ยนโหมดการแข่งขันเป็น ${modeDescriptions[state.mode].name}`);
      if (currentRoute === 'competition') {
        renderCompetition();
      }
    });
  }

  appRoot.querySelectorAll('.vm-actions .button').forEach((button) => {
    if (button.hasAttribute('disabled')) return;
    button.addEventListener('click', () => {
      const vmId = button.dataset.vm;
      const action = button.dataset.action;
      renderToast(`${actionLabel(action)} ${vmId} เรียบร้อย`);
    });
  });

  appRoot.querySelectorAll('.command-hero__actions .button').forEach((button) => {
    if (button.classList.contains('disabled')) {
      button.addEventListener('click', () => {
        renderToast('ต้องใช้สิทธิ์ผู้ดูแลระบบ');
      });
      return;
    }
    button.addEventListener('click', () => {
      const { action } = button.dataset;
      if (action === 'broadcast') {
        renderToast('ส่งประกาศไปยังทุกทีมแล้ว');
      } else if (action === 'timeline') {
        renderToast('เปิดบันทึกเหตุการณ์ล่าสุด');
      }
    });
  });
}
function renderCompetition() {
  const persona = personaProfiles[state.userRole];
  const isAdmin = state.userRole === 'admin';
  const mode = modeDescriptions[state.mode];
  const sortedTeams = [...state.teams].sort((a, b) => b.total - a.total);
  const leader = sortedTeams[0];
  const userTeam = isAdmin ? sortedTeams[0] : state.teams[1] || sortedTeams[0];
  const userRank = sortedTeams.findIndex((team) => team.name === userTeam.name) + 1;
  const leaderGap = Math.max(leader.total - userTeam.total, 0);

  const heroStats = isAdmin
    ? [
        { label: 'ผู้นำกระดาน', value: leader.name, meta: `${leader.total.toLocaleString('th-TH')} pts` },
        {
          label: 'ช่องว่างอันดับ 1-2',
          value: `${(sortedTeams[0].total - (sortedTeams[1]?.total ?? sortedTeams[0].total)).toLocaleString('th-TH')} pts`,
          meta: `${sortedTeams[1]?.name ?? leader.name} กำลังไล่ตาม`,
        },
        { label: 'โหมดปัจจุบัน', value: mode.name, meta: mode.focus[0] },
        { label: 'อัปเดตล่าสุด', value: new Date().toLocaleTimeString('th-TH'), meta: 'ข้อมูลสตรีมสด' },
      ]
    : [
        { label: 'ทีมของคุณ', value: userTeam.name, meta: `อันดับที่ ${userRank}` },
        { label: 'คะแนนที่ต้องไล่', value: `${leaderGap.toLocaleString('th-TH')} pts`, meta: `ถึง ${leader.name}` },
        { label: 'การส่ง Flag ล่าสุด', value: '2 นาทีที่แล้ว', meta: 'คิวตอบกลับทันที' },
        { label: 'โหมดปัจจุบัน', value: mode.name, meta: mode.focus[0] },
      ];

  const heroActions = isAdmin
    ? [
        { id: 'pause', label: 'Pause การแข่ง 5 นาที', style: 'primary' },
        { id: 'refresh', label: 'รีเฟรชกระดานคะแนน', style: 'ghost' },
      ]
    : [
        { id: 'submit', label: 'ส่ง Flag ล่าสุด', style: 'primary' },
        { id: 'briefing', label: 'เปิดคำแนะนำโหมด', style: 'ghost' },
      ];

  const callouts = isAdmin
    ? [
        { title: 'ตรวจสอบ Submission Queue', detail: 'Review 3 รายการที่รอตรวจสอบก่อนประกาศรอบต่อไป', tag: 'เร่งด่วน' },
        { title: 'สถานะ VM เป้าหมาย', detail: `${state.vms.filter((vm) => !vm.online).length} VM ต้องการการตรวจสอบเพิ่มเติม`, tag: 'infra' },
        { title: 'การสื่อสารทีม', detail: 'มี 2 ข้อความใหม่ในแชแนล Broadcast', tag: 'comms' },
      ]
    : [
        { title: 'กลยุทธ์ถัดไป', detail: 'โฟกัสโจทย์ Web & Crypto เพื่อเก็บแต้มเร็ว', tag: 'แผนการบุก' },
        { title: 'การป้องกัน', detail: 'ทีม Blue Hydra ต้องรักษา service uptime 99%', tag: 'ป้องกัน' },
        { title: 'สื่อสารกับทีม', detail: 'มี stand-up ใน Discord ภายใน 5 นาที', tag: 'team sync' },
      ];

  const timeline = isAdmin
    ? [
        { time: '13:12', title: 'Flag Review', detail: 'Red Falcon ส่ง flag หมวด Crypto', type: 'positive' },
        { time: '13:08', title: 'Service Alert', detail: 'Service web03 downtime 90 วินาที', type: 'warning' },
        { time: '13:05', title: 'Broadcast', detail: 'แจ้งเตือนเรื่อง scope SQL Injection', type: 'neutral' },
      ]
    : [
        { time: '13:11', title: 'Flag Accepted', detail: 'โจทย์ Binary-200 ผ่านการตรวจ', type: 'positive' },
        { time: '13:06', title: 'Defense Alert', detail: 'พบทราฟฟิกผิดปกติจาก Red Falcon', type: 'warning' },
        { time: '13:00', title: 'Coach Update', detail: 'Staff แชร์ hint สำหรับหมวด Forensics', type: 'neutral' },
      ];

  appRoot.innerHTML = `
    <section class="competition-dashboard">
      <div class="competition-main">
        <section class="section competition-hero">
          <div class="competition-hero__copy">
            <span class="persona-pill">${persona.badge}</span>
            <h2>${persona.competitionHero.title}</h2>
            <p>${persona.competitionHero.message}</p>
            <div class="competition-hero__meta">
              <span class="badge">โหมด: ${mode.name}</span>
              <span class="badge">${mode.focus[1] || mode.focus[0]}</span>
            </div>
            <div class="competition-hero__actions">
              ${heroActions
                .map(
                  (action) => `
                    <button class="button ${action.style}" data-competition-action="${action.id}">
                      ${action.label}
                    </button>
                  `
                )
                .join('')}
            </div>
          </div>
          <div class="competition-hero__stats">
            ${heroStats
              .map(
                (stat) => `
                  <article class="stat-card">
                    <span class="stat-card__label">${stat.label}</span>
                    <strong class="stat-card__value">${stat.value}</strong>
                    <span class="stat-card__meta">${stat.meta}</span>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>

        <section class="section competition-scoreboard">
          <div class="section-header">
            <h2>ตารางคะแนนสด</h2>
            <span>${isAdmin ? 'ข้อมูลซิงก์จาก Admin Console แบบเรียลไทม์' : 'ไฮไลต์ทีมของคุณบนกระดานคะแนน'}</span>
          </div>
          <div class="table-wrapper">
            <table class="${!isAdmin ? 'table-highlight-self' : ''}">
              <thead>
                <tr>
                  <th>อันดับ</th>
                  <th>ทีม</th>
                  <th>รวม</th>
                  <th>Attack</th>
                  <th>Defense</th>
                  <th>Service</th>
                </tr>
              </thead>
              <tbody>
                ${sortedTeams
                  .map(
                    (team, index) => `
                      <tr class="${!isAdmin && team.name === userTeam.name ? 'is-user-team' : ''}">
                        <td>${index + 1}</td>
                        <td>${team.name}</td>
                        <td>${team.total.toLocaleString('th-TH')}</td>
                        <td>${team.attack.toLocaleString('th-TH')}</td>
                        <td>${team.defense.toLocaleString('th-TH')}</td>
                        <td>${team.service.toLocaleString('th-TH')}</td>
                      </tr>
                    `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </section>

        <section class="section competition-scenarios">
          <div class="section-header">
            <h2>สถานการณ์ปัจจุบัน</h2>
            <span>อัปเดตตามโหมดที่เลือก</span>
          </div>
          <div class="challenge-grid">
            ${state.teams
              .map(
                (team) => `
                  <article class="challenge-card ${!isAdmin && team.name === userTeam.name ? 'is-user-team' : ''}">
                    <h3>${team.name}</h3>
                    <span>โหมด ${mode.name}</span>
                    <p>${generateScenario(team)}</p>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>
      </div>

      <aside class="competition-sidebar">
        <section class="section competition-callouts">
          <div class="section-header">
            <h2>${isAdmin ? 'สิ่งที่ต้องจับตา' : 'ภารกิจสำคัญของทีม'}</h2>
            <span>${isAdmin ? 'จัดลำดับสิ่งที่ต้องทำทันที' : 'ให้ทีมโฟกัสสิ่งสำคัญที่สุด'}</span>
          </div>
          <ul class="callout-list">
            ${callouts
              .map(
                (item) => `
                  <li class="callout-card">
                    <span class="chip">${item.tag}</span>
                    <strong>${item.title}</strong>
                    <p>${item.detail}</p>
                  </li>
                `
              )
              .join('')}
          </ul>
        </section>

        <section class="section competition-timeline">
          <div class="section-header">
            <h2>กิจกรรมล่าสุด</h2>
            <span>${isAdmin ? 'Feed จากระบบควบคุม' : 'สิ่งที่มีผลกับทีมคุณ'}</span>
          </div>
          <ul class="timeline-list">
            ${timeline
              .map(
                (entry) => `
                  <li class="timeline-item ${entry.type}">
                    <div class="timeline-item__time">${entry.time}</div>
                    <div class="timeline-item__body">
                      <strong>${entry.title}</strong>
                      <span>${entry.detail}</span>
                    </div>
                  </li>
                `
              )
              .join('')}
          </ul>
        </section>
      </aside>
    </section>
  `;

  appRoot.querySelectorAll('[data-competition-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.competitionAction;
      switch (action) {
        case 'pause':
          renderToast('ประกาศ Pause การแข่งขัน 5 นาทีแล้ว');
          break;
        case 'refresh':
          renderToast('รีเฟรชตารางคะแนนและกระจายข้อมูลแล้ว');
          break;
        case 'submit':
          renderToast('ส่ง Flag ล่าสุดของทีมเรียบร้อย!');
          break;
        case 'briefing':
          renderToast('เปิดคำแนะนำโหมดและ Hint ล่าสุด');
          break;
        default:
          renderToast('ทำรายการแล้ว');
      }
    });
  });
}
function renderPracticeLab() {
  const persona = personaProfiles[state.userRole];
  const isAdmin = state.userRole === 'admin';
  const { practice } = state;
  const filteredLabs = practice.labs.filter((lab) =>
    practice.activeFilter === 'all' ? true : lab.category === practice.activeFilter
  );
  const primaryPracticeLabel = isAdmin ? 'ตรวจสอบความคืบหน้าทีม' : 'ดำเนินการต่อ Lab ล่าสุด';
  const secondaryPracticeLabel = isAdmin ? 'เปิดแดชบอร์ดรวม' : 'ดูสรุปการเรียนรู้';
  const practiceSubtext = isAdmin
    ? 'กำลังตรวจสอบข้อมูลการฝึกของทุกทีมแบบเรียลไทม์'
    : 'ซิงก์ความคืบหน้าการฝึกของทีมคุณแบบส่วนตัว';

  appRoot.innerHTML = `
    <section class="practice-dashboard">
      <div class="practice-main">
        <section class="section practice-hero">
          <div class="practice-hero__content">
            <div class="practice-hero__copy">
              <span class="persona-pill">${persona.practiceBadge}</span>
              <h2>Practice Lab Command Center</h2>
              <p>
                กำหนดจังหวะการฝึก ฝึกซ้อมแบบโฟกัส และติดตามพัฒนาการแบบเรียลไทม์
                ทั้ง Offensive, Defensive และ Forensics ในที่เดียว
              </p>
              <span class="practice-hero__subtext">${practiceSubtext}</span>
              <div class="practice-hero__actions">
                <button class="button primary" data-action="resume" data-label="Advanced Exploit Development">
                  ${primaryPracticeLabel}
                </button>
                <button class="button ghost" data-action="overview">${secondaryPracticeLabel}</button>
              </div>
            </div>
            <div class="practice-hero__stats">
              ${practice.stats
                .map(
                  (stat) => `
                    <article class="stat-card">
                      <span class="stat-card__label">${stat.title}</span>
                      <strong class="stat-card__value">${stat.value}</strong>
                      <span class="stat-card__meta">${stat.meta}</span>
                    </article>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>

        <section class="section practice-catalog">
          <div class="section-header">
            <h2>Lab Catalog</h2>
            <span>คัดกรองตามเส้นทางที่สนใจ</span>
          </div>
          <div class="practice-filters">
            ${practice.filters
              .map(
                (filter) => `
                  <button class="filter-chip ${
                    filter.id === practice.activeFilter ? 'active' : ''
                  }" data-filter="${filter.id}">
                    ${filter.label}
                  </button>
                `
              )
              .join('')}
          </div>
          <div class="practice-lab-grid">
            ${
              filteredLabs.length
                ? filteredLabs
                    .map(
                      (lab) => `
                        <article class="practice-lab-card">
                          <header class="practice-lab-card__header">
                            <div>
                              <h3>${lab.title}</h3>
                              <span class="difficulty">ระดับ: ${lab.difficulty}</span>
                            </div>
                            <span class="lab-status">${lab.status}</span>
                          </header>
                          <p>${lab.description}</p>
                          <div class="lab-meta">
                            <span>${lab.duration}</span>
                            <span>${lab.xp} XP</span>
                            <span>${lab.lastActive}</span>
                          </div>
                          <div class="lab-tags">
                            ${lab.tags.map((tag) => `<span class="chip">${tag}</span>`).join('')}
                          </div>
                          <div class="progress-track">
                            <div class="progress-value" style="width: ${lab.progress}%"></div>
                          </div>
                          <footer class="practice-lab-card__footer">
                            <span class="progress-label">ความคืบหน้า ${lab.progress}%</span>
                            <button class="button" data-lab="${lab.id}" data-label="${lab.title}">
                              ${lab.progress === 0 ? 'เริ่ม Lab' : 'เปิด Lab'}
                            </button>
                          </footer>
                        </article>
                      `
                    )
                    .join('')
                : `<div class="empty-state">
                    <strong>ยังไม่มี Lab ในหมวดนี้</strong>
                    <span>ลองเลือกหมวดอื่นหรือรีเซ็ตตัวกรอง</span>
                  </div>`
            }
          </div>
        </section>

        <section class="section practice-tracks">
          <div class="section-header">
            <h2>เส้นทางการฝึกที่แนะนำ</h2>
            <span>เลือกแคมเปญเพื่อฝึกเชิงกลยุทธ์</span>
          </div>
          <div class="track-grid">
            ${practice.tracks
              .map(
                (track) => `
                  <article class="track-card">
                    <header>
                      <h3>${track.title}</h3>
                      <span class="chip">${track.xp} XP</span>
                    </header>
                    <p>${track.description}</p>
                    <div class="track-focus">
                      ${track.focus.map((item) => `<span>${item}</span>`).join('')}
                    </div>
                    <div class="progress-track">
                      <div class="progress-value" style="width: ${track.progress}%"></div>
                    </div>
                    <footer>
                      <span class="progress-label">${track.progress}% เสร็จแล้ว</span>
                      <button class="button ghost" data-track="${track.id}">รายละเอียด</button>
                    </footer>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>
      </div>

      <aside class="practice-aside">
        <section class="section practice-schedule">
          <div class="section-header">
            <h2>ตารางโค้ชชิ่ง</h2>
            <span>จอง session แบบสด</span>
          </div>
          <ul class="session-list">
            ${practice.sessions
              .map(
                (session) => `
                  <li class="session-item">
                    <div class="session-item__heading">
                      <strong>${session.title}</strong>
                      <span class="chip subtle">${session.type}</span>
                    </div>
                    <div class="session-item__meta">
                      <span>${session.startTime}</span>
                      <span>${session.duration}</span>
                    </div>
                    <div class="session-item__meta">
                      <span>โค้ช: ${session.mentor}</span>
                      <span>โฟกัส: ${session.focus}</span>
                    </div>
                    <button class="button primary" data-session="${session.id}">จองที่นั่ง</button>
                  </li>
                `
              )
              .join('')}
          </ul>
        </section>

        <section class="section practice-resources">
          <div class="section-header">
            <h2>Resource ล่าสุด</h2>
            <span>เสริมความรู้ก่อนลงสนาม</span>
          </div>
          <ul class="resource-list">
            ${practice.resources
              .map(
                (resource) => `
                  <li class="resource-item">
                    <div>
                      <strong>${resource.title}</strong>
                      <span class="resource-type">${resource.type}</span>
                    </div>
                    <p>${resource.description}</p>
                    <button class="button" data-resource="${resource.id}" data-label="${resource.title}">เปิด</button>
                  </li>
                `
              )
              .join('')}
          </ul>
        </section>
      </aside>
    </section>
  `;

  appRoot.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const { filter } = button.dataset;
      state.practice.activeFilter = filter;
      renderPracticeLab();
    });
  });

  appRoot.querySelectorAll('[data-lab]').forEach((button) => {
    button.addEventListener('click', () => {
      renderToast(`กำลังโหลด ${button.dataset.label}`);
    });
  });

  appRoot.querySelectorAll('[data-track]').forEach((button) => {
    button.addEventListener('click', () => {
      renderToast(`ดูรายละเอียดแคมเปญ ${button.closest('.track-card').querySelector('h3').textContent}`);
    });
  });

  appRoot.querySelectorAll('[data-session]').forEach((button) => {
    button.addEventListener('click', () => {
      renderToast(`จอง session เรียบร้อย (${button.dataset.session})`);
    });
  });

  appRoot.querySelectorAll('[data-resource]').forEach((button) => {
    button.addEventListener('click', () => {
      renderToast(`เปิด resource: ${button.dataset.label}`);
    });
  });

  appRoot.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const { action, label } = button.dataset;
      if (action === 'resume') {
        renderToast(
          state.userRole === 'admin'
            ? 'เปิดดูความคืบหน้าของทีมทั้งหมด'
            : `กลับเข้าสู่ ${label}`
        );
      } else if (action === 'overview') {
        renderToast(
          state.userRole === 'admin'
            ? 'เปิดแดชบอร์ดภาพรวมของผู้ฝึกทั้งหมด'
            : 'เปิดภาพรวมเส้นทางการฝึก'
        );
      }
    });
  });
}

function renderToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function actionLabel(action) {
  switch (action) {
    case 'start':
      return 'สั่งเปิด';
    case 'restart':
      return 'รีสตาร์ต';
    case 'shutdown':
      return 'ปิดเครื่อง';
    default:
      return 'คำสั่ง';
  }
}

function generateScenario(team) {
  switch (state.mode) {
    case 'attack-defense':
      return `${team.name} กำลังกระจายแพตช์ป้องกันช่องโหว่ล่าสุด พร้อมเตรียมสคริปต์โจมตีตอบโต้ทีมคู่แข่ง`;
    case 'koth':
      return `${team.name} ยึดครองโหนดหลักได้ ${Math.floor(Math.random() * 12) + 1} นาที และกำลังตั้งระบบป้องกันเสริม`;
    default:
      return `${team.name} แก้โจทย์หมวด Crypto และ Web สำเร็จเหลือเวลาโบนัสเพิ่มอีก 15 นาที`;
  }
}

navigate('admin');
