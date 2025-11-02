# CyberRange Frontend

อินเทอร์เฟซฝึกปฏิบัติการไซเบอร์ของกองทัพอากาศไทย (RTAF) สำหรับการเข้าสู่ระบบและจัดการ Practice Labs ที่จำลองภารกิจจริงทั้ง Red/Blue/OT ภายใต้โหมด CyberRange เดียวกัน โปรเจ็กต์นี้สร้างด้วย [Vite](https://vitejs.dev/) + React และมี mock API ในตัวเพื่อให้ทดสอบได้ทันทีบนเครื่องพัฒนา

## ความต้องการของระบบ
- Node.js 20 ขึ้นไป (แนะนำ LTS ล่าสุด)
- npm 10 ขึ้นไป (มากับ Node.js 20)

## การติดตั้งและเตรียมโปรเจ็กต์
1. ติดตั้ง dependencies
   ```bash
   npm install
   ```
2. เปิด mock API (ถูกผูกกับ axios mock adapter อัตโนมัติ เมื่อ import `@lib/api.mock` ในจุดเริ่มต้นของแอปแล้วจึงไม่ต้องรันเซิร์ฟเวอร์แยก)

## การรันในโหมดพัฒนา
```bash
npm run dev
```
คำสั่งนี้จะเปิด Vite dev server (ปกติที่ http://localhost:5173) พร้อม hot reload หลังจาก build สำเร็จเข้าใช้งานผ่านเบราว์เซอร์ได้เลย

## การ build เพื่อตรวจสอบก่อนปล่อย (local test)
```bash
npm run build
```
คำสั่งนี้จะรัน TypeScript incremental build (`tsc -b`) และ bundle ผ่าน Vite เพื่อยืนยันว่าโค้ดสามารถคอมไพล์ได้ครบ ไม่มี type error ก่อน deploy

ถ้าต้องการตรวจสอบ bundle production แบบท้องถิ่น สามารถรัน
```bash
npm run preview
```
เพื่อเปิดเซิร์ฟเวอร์ static preview แล้วทดลองเข้าใช้งานอีกครั้ง

## เส้นทางการทดสอบการใช้งานหลัก
ให้ใช้เคสต่อไปนี้เพื่อเช็ก UX/UI หลังจาก `npm run dev` หรือ `npm run preview`

1. **เข้าสู่ระบบ**
   - เปิดหน้า `/` จะเห็นหน้าจอ "RTAF Secure Access" พร้อมสถิติภารกิจและคำอธิบายบริบทตามการออกแบบใน `LoginPage`
   - กรอกอีเมลรูปแบบ `name@rtaf.mi.th` และรหัสผ่านใดก็ได้ (mock API จะตอบกลับ token เสมอ)
   - หลัง submit จะถูกนำทางไปหน้า Practice Labs และ token/user จะถูกเก็บใน `localStorage` ผ่าน `AuthContext`

2. **ตรวจสอบหน้า Practice Labs**
   - หน้า `/labs` แสดง hero section, flight plan และรายชื่อ Lab ทั้ง 7 ภายใต้ `LabsPage`
   - ยืนยันว่าแต่ละ Lab card แสดงข้อมูล domain, status, highlight, mission objectives, skill focus และ environment ตาม mock data

3. **ควบคุม Lab VMs**
   - ในแต่ละ Lab card มีส่วน "Active Assets" ที่ดึงสถานะ VM จาก mock API ทุก 8 วินาที และมีปุ่ม `start/stop/reset/snapshot/clone`
   - กดปุ่มใด ๆ จะเห็นสถานะ "กำลังดำเนินการ..." และเมื่อสำเร็จข้อมูลจะรีเฟรชตาม `react-query` mutation

4. **ตรวจสอบ state persistence**
   - รีเฟรชหน้าหลัง login แล้วยังอยู่ใน `/labs` เพราะ token/user ถูกบันทึกไว้ใน `localStorage`
   - กดปุ่มออกจากระบบ (ใน shell navigation) เพื่อยืนยันว่าค่าใน storage ถูกลบและ redirect กลับไปหน้า login

## คำแนะนำเพิ่มเติมสำหรับการปรับแต่ง
- ถ้าต้องการเชื่อมต่อ backend จริง ให้แก้ไข `src/lib/api.ts` และนำ mock adapter (`@lib/api.mock`) ออกจาก entry point
- ปรับ theme/visual ผ่าน `tailwind.config.js` และไฟล์ CSS ภายใต้ `src/index.css`

## โครงสร้างสำคัญในโปรเจ็กต์
- `src/features/auth/` — หน้าจอ login และ context การจัดการ token ผู้ใช้
- `src/features/labs/` — หน้ารวม Practice Labs และ component Lab card + VM actions
- `src/lib/api.mock.ts` — ข้อมูล mock lab, VM, และ auth สำหรับทดสอบบนเครื่อง

ด้วยขั้นตอนข้างต้นคุณสามารถทดสอบและใช้งาน CyberRange Frontend ได้ครบตั้งแต่การเข้าสู่ระบบไปจนถึงการควบคุมทรัพยากรในแต่ละ Lab บนเครื่องของคุณเอง
