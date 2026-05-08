// ============================================================
//  ການຕັ້ງຄ່າລະບົບສະແກນໃບໜ້າເຂົ້າວຽກ
//  Face Attendance System - Configuration
// ============================================================

const CONFIG = {
  // URL ຂອງ Google Apps Script Web App (ໃສ່ຫຼັງ Deploy)
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxfNi57WUVBSJqu1jgWuRJkrO974ClziWCv1MlKhPSeFvV5-5TITkuVnC-bF4PuGuo/exec',

  // ຕຳແໜ່ງທີ່ອ​ນຸ​ຍາດ (ທີ່ຕັ້ງຫ້ອງການ)
  ALLOWED_LOCATION: {
    lat: 20.934972795617405,   // ← ໃສ່ Latitude ຂອງທ່ານ
    lng: 101.39931016553159,  // ← ໃສ່ Longitude ຂອງທ່ານ
    radius: 30     // ລັດສະໝີ ເປັນ ແມັດ (meters)
  },

  // ຄ່າ Threshold ການຈົດຈຳໃບໜ້າ (ຕ່ຳ = ເຄັ່ງຄັດ, ສູງ = ຜ່ອນຜ່ານ)
  FACE_MATCH_THRESHOLD: 0.45,

  // Path ຂອງ face-api.js models
  MODELS_PATH: './models',

  // ຊື່ບໍລິສັດ / ຫ້ອງການ
  COMPANY_NAME: 'MS SPORT',

  // ລະຫັດຜ່ານ Admin (ປ່ຽນດ່ວນ!)
  ADMIN_PASSWORD: 'admin1234'
};
