const state = {
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

const routes = {
  admin: renderAdmin,
  competition: renderCompetition,
  practice: renderPracticeLab,
};

const appRoot = document.getElementById('app');
const navButtons = document.querySelectorAll('.nav-button');

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const route = button.dataset.route;
    navigate(route);
  });
});

function navigate(route) {
  if (!routes[route]) return;
  navButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.route === route));
  routes[route]();
}

function renderAdmin() {
  appRoot.innerHTML = `
    <section class="view-container">
      <section class="section">
        <div class="section-header">
          <h2>ภาพรวมคะแนนรวม</h2>
          <span>อัปเดตล่าสุด: ${new Date().toLocaleTimeString('th-TH')}</span>
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

      <section class="section">
        <div class="section-header">
          <h2>โหมดการแข่งขัน</h2>
          <span>เลือกรูปแบบการแข่งขันที่ต้องการ</span>
        </div>
        <div class="mode-selector">
          <label for="mode-select">โหมด:</label>
          <select id="mode-select">
            <option value="jeopardy" ${state.mode === 'jeopardy' ? 'selected' : ''}>Jeopardy</option>
            <option value="attack-defense" ${state.mode === 'attack-defense' ? 'selected' : ''}>Attack / Defense</option>
            <option value="koth" ${state.mode === 'koth' ? 'selected' : ''}>KoTH</option>
          </select>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>ควบคุม VM ทั้งหมด</h2>
          <span>ตรวจสอบสถานะและสั่งการแบบรวดเร็ว</span>
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
                    <button class="button" data-action="start" data-vm="${vm.id}">Start</button>
                    <button class="button" data-action="restart" data-vm="${vm.id}">Restart</button>
                    <button class="button danger" data-action="shutdown" data-vm="${vm.id}">Shutdown</button>
                  </div>
                </article>
              `
            )
            .join('')}
        </div>
      </section>
    </section>
  `;

  const select = document.getElementById('mode-select');
  select.addEventListener('change', (event) => {
    state.mode = event.target.value;
    renderToast(`เปลี่ยนโหมดการแข่งขันเป็น ${modeDescriptions[state.mode].name}`);
    const competitionButton = document.querySelector('[data-route="competition"]');
    if (competitionButton?.classList.contains('active')) {
      renderCompetition();
    }
  });

  appRoot.querySelectorAll('.vm-actions .button').forEach((button) => {
    button.addEventListener('click', () => {
      const vmId = button.dataset.vm;
      const action = button.dataset.action;
      renderToast(`${actionLabel(action)} ${vmId} เรียบร้อย`);
    });
  });
}

function renderCompetition() {
  const mode = modeDescriptions[state.mode];
  appRoot.innerHTML = `
    <section class="view-container">
      <section class="section mode-banner">
        <h2>${mode.name}</h2>
        <p>${mode.summary}</p>
        <div class="badge">Focus: ${mode.focus.join(' • ')}</div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>ตารางคะแนนสด</h2>
          <span>ซิงก์กับข้อมูลจาก Admin Console</span>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ทีม</th>
                <th>รวม</th>
                <th>Attack</th>
                <th>Defense</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              ${state.teams
                .map(
                  (team) => `
                    <tr>
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

      <section class="section">
        <div class="section-header">
          <h2>สถานการณ์ปัจจุบัน</h2>
          <span>อัปเดตตามโหมดที่เลือก</span>
        </div>
        <div class="challenge-grid">
          ${state.teams
            .map(
              (team) => `
                <article class="challenge-card">
                  <h3>${team.name}</h3>
                  <span>สถานะ ${mode.name}</span>
                  <p>${generateScenario(team)}</p>
                </article>
              `
            )
            .join('')}
        </div>
      </section>
    </section>
  `;
}

function renderPracticeLab() {
  const { practice } = state;
  const filteredLabs = practice.labs.filter((lab) =>
    practice.activeFilter === 'all' ? true : lab.category === practice.activeFilter
  );

  appRoot.innerHTML = `
    <section class="practice-dashboard">
      <div class="practice-main">
        <section class="section practice-hero">
          <div class="practice-hero__content">
            <div class="practice-hero__copy">
              <h2>Practice Lab Command Center</h2>
              <p>
                กำหนดจังหวะการฝึก ฝึกซ้อมแบบโฟกัส และติดตามพัฒนาการแบบเรียลไทม์
                ทั้ง Offensive, Defensive และ Forensics ในที่เดียว
              </p>
              <div class="practice-hero__actions">
                <button class="button primary" data-action="resume" data-label="Advanced Exploit Development">
                  ดำเนินการต่อ Lab ล่าสุด
                </button>
                <button class="button ghost" data-action="overview">ดูสรุปการเรียนรู้</button>
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
        renderToast(`กลับเข้าสู่ ${label}`);
      } else if (action === 'overview') {
        renderToast('เปิดภาพรวมเส้นทางการฝึก');
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
