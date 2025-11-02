# CyberRange Front-End Prototype

ต้นแบบส่วนติดต่อผู้ใช้งานสำหรับแพลตฟอร์ม CyberRange ที่ประกอบด้วยหน้าใช้งานหลัก 3 ส่วน ได้แก่ Admin Console, Competition View และ Practice Lab ภายในหน้าเดียว (Single Page Application) โดยใช้ HTML, CSS และ JavaScript พื้นฐาน

## โครงสร้างไฟล์

```
.
├── index.html         # โครงร่างหน้าเว็บและระบบนำทาง
├── scripts/
│   └── app.js         # ตรรกะจัดการ state และเรนเดอร์แต่ละหน้า
├── styles/
│   └── main.css       # สไตล์หลักของแอป
├── README.md
└── REVIEW.md
```

## ฟีเจอร์หลัก

- **Admin Console**
  - แสดงภาพรวมคะแนนรวมของแต่ละทีมพร้อมแยก Attack / Defense / Service
  - ปรับโหมดการแข่งขันได้ 3 โหมด: Jeopardy, Attack/Defense, King of the Hill
  - ปุ่มควบคุม VM (Start / Restart / Shutdown) พร้อมแสดงสถานะออนไลน์และการใช้ทรัพยากร

- **Competition View**
  - แสดงโหมดการแข่งขันปัจจุบันพร้อมคำอธิบายและจุดโฟกัส
  - ตารางคะแนนที่ซิงก์จาก Admin Console
  - การ์ดสรุปสถานการณ์แต่ละทีมตามโหมดที่เลือก

- **Practice Lab**
  - รายการ Lab จำลอง 3 หมวด พร้อมคำอธิบายและโมดูลย่อย
  - ปุ่มเข้าสู่แต่ละ Lab พร้อม Toast แจ้งสถานะ

## การใช้งาน

1. เปิดไฟล์ `index.html` ด้วยเว็บเบราว์เซอร์สมัยใหม่ (Chrome, Edge, Firefox)
2. ใช้แถบนำทางด้านบนเพื่อสลับหน้า
3. การเปลี่ยนโหมดการแข่งขันในหน้า Admin จะรีเฟรชข้อมูลในหน้า Competition โดยอัตโนมัติ

> หมายเหตุ: โค้ดนี้เป็นต้นแบบจำลอง (mock) ไม่มีการเชื่อมต่อระบบ backend หรือฐานข้อมูลจริง
