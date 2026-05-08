# 👁️ ລະບົບສະແກນໃບໜ້າເຂົ້າວຽກ
**Face Attendance System** — GitHub Pages + Google Sheets

---

## 🗂️ ໂຄງສ້າງໂຟນເດີ

```
face-attendance/
├── index.html          ← ໜ້າຫຼັກ (ສະແກນເຂົ້າວຽກ)
├── admin.html          ← Admin Panel
├── config.js           ← ການຕັ້ງຄ່າ
├── download-models.sh  ← Script ດາວໂຫຼດ AI models
├── apps-script/
│   └── Code.gs         ← Google Apps Script (Backend)
└── models/             ← ⚠️ ຕ້ອງດາວໂຫຼດ (ເບິ່ງ Step 2)
```

---

## 🚀 ຂັ້ນຕອນການຕິດຕັ້ງ

### Step 1: ສ້າງ Google Sheet

1. ໄປທີ່ [Google Sheets](https://sheets.google.com)
2. ສ້າງ Spreadsheet ໃໝ່
3. ສຳເນົາ **ID** ຈາກ URL: `https://docs.google.com/spreadsheets/d/**ID_HERE**/`

### Step 2: ຕິດຕັ້ງ Google Apps Script

1. ໃນ Google Sheet → `Extensions` → `Apps Script`
2. ລຶບ Code ທີ່ມີ ແລ້ວວາງ Code ຈາກ `apps-script/Code.gs`
3. ແທນ `YOUR_GOOGLE_SPREADSHEET_ID_HERE` ດ້ວຍ ID ຂໍ້ 1
4. ກົດ `Deploy` → `New Deployment`
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. ສຳເນົາ **Web App URL**

### Step 3: ຕິດຕັ້ງ AI Models

```bash
# ໃຊ້ Terminal / Git Bash
bash download-models.sh
```

ຫຼື ດາວໂຫຼດ manual ທີ່:
https://github.com/justadudewhohacks/face-api.js/tree/master/weights

ໄຟລ໌ທີ່ຕ້ອງການ:
- `tiny_face_detector_model-*`
- `face_landmark_68_model-*`
- `face_recognition_model-*`

ວາງໃນໂຟນເດີ `models/`

### Step 4: ຕັ້ງຄ່າ `config.js`

```javascript
const CONFIG = {
  APPS_SCRIPT_URL: 'ໃສ່ URL ຈາກ Step 2',
  ALLOWED_LOCATION: {
    lat: 18.1148,   // Latitude ຫ້ອງການ
    lng: 103.2587,  // Longitude ຫ້ອງການ
    radius: 100     // ລັດສະໝີ (ແມັດ)
  },
  ADMIN_PASSWORD: 'ປ່ຽນລະຫັດຜ່ານ!'
};
```

### Step 5: ອັບຂຶ້ນ GitHub Pages

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

ຈາກນັ້ນ:
- GitHub → Repository Settings → Pages
- Source: **main branch** → `/root`
- ໄດ້ URL: `https://your-username.github.io/your-repo/`

---

## 📱 ການໃຊ້ງານ

### ສຳລັບ Admin
1. ໄປທີ່ `yoursite.com/admin.html`
2. ໃສ່ລະຫັດຜ່ານ (ຕາມ config.js)
3. ກົດ **ລົງທະບຽນ** → ໃສ່ຂໍ້ມູນ → ຖ່າຍໃບໜ້າ 3 ຮູບ

### ສຳລັບພະນັກງານ
1. ໄປທີ່ `yoursite.com/`
2. ອ​ນຸ​ຍາດ Camera & GPS
3. ກົດ **ເປີດກ້ອງ** → ຊີ້ໜ້າໃສ່ກ້ອງ
4. ກົດ **ເຂົ້າວຽກ** ຫຼື **ອອກວຽກ**

> ⚠️ ຖ້າຢູ່ນອກໂຊນ GPS — ລະບົບຈະ **ບໍ່ອ​ນຸ​ຍາດ** ໃຫ້ສະແກນ

---

## 🛡️ ຄຸນສົມບັດ

| ຄຸນສົມບັດ | ລາຍລະອຽດ |
|-----------|----------|
| 👤 Face Recognition | face-api.js (ເຮັດວຽກໃນ Browser) |
| 📍 Geolocation Lock | ບໍ່ໃຫ້ສະແກນນອກໂຊນ |
| 📊 Google Sheets | ບັນທຶກຂໍ້ມູນອັດຕະໂນມັດ |
| 🌙 Dark/Light Mode | ປ່ຽນໂໝດໄດ້ |
| 📱 Mobile First | ໃຊ້ໄດ້ທຸກອຸປະກອນ |
| 🔐 Admin Login | ປ້ອງກັນດ້ວຍລະຫັດຜ່ານ |

---

## ⚠️ ຂໍ້ຄວນລະວັງ

- ໃຊ້ **HTTPS** ເທົ່ານັ້ນ (GitHub Pages ຮອງຮັບ)
- Face Recognition ທຳງານໃນ Browser — ຂໍ້ມູນ **ບໍ່ສ່ອງໄປທາງອື່ນ**
- ປ່ຽນ `ADMIN_PASSWORD` ທຸກຄັ້ງກ່ອນ Deploy
- Models ຮວມ ~8MB — ໂຫຼດຄັ້ງທຳອິດຊ້ານ້ອຍໜຶ່ງ

---

## 🆘 ແກ້ໄຂບັນຫາ

| ບັນຫາ | ວິທີແກ້ |
|-------|---------|
| AI ໂຫຼດລົ້ມ | ກວດ `/models` ຄົບ ແລ້ວ |
| ຂໍ GPS ລົ້ມ | ໃຊ້ HTTPS ແລ້ວ ອ​ນຸ​ຍາດ GPS |
| ບໍ່ fetch Sheets | ກວດ Apps Script URL ແລ້ວ Deploy ໃໝ່ |
| ຈຳໜ້າລົ້ມ | ລົງທະບຽນໜ້າໃໝ່ — ທ່ຽງ / ແສງດີ |
