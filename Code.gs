// ============================================================
//  Google Apps Script - ລະບົບສະແກນໃບໜ້າເຂົ້າວຽກ
//  ວາງ Code ນີ້ໃນ Google Apps Script ແລ້ວ Deploy ເປັນ Web App
// ============================================================

const SPREADSHEET_ID = 'YOUR_GOOGLE_SPREADSHEET_ID_HERE'; // ← ໃສ່ ID ຂອງ Google Sheet

function doGet(e) {
  const action = e.parameter.action;
  let result;
  try {
    if (action === 'getEmployees') {
      result = getEmployees();
    } else if (action === 'getAttendance') {
      result = getAttendance(e.parameter.date);
    } else if (action === 'ping') {
      result = { status: 'ok', message: 'Server is running' };
    } else {
      result = { status: 'error', message: 'Unknown action' };
    }
  } catch (err) {
    result = { status: 'error', message: err.toString() };
  }
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  let result;
  try {
    if (action === 'registerEmployee') {
      result = registerEmployee(data);
    } else if (action === 'logAttendance') {
      result = logAttendance(data);
    } else if (action === 'deleteEmployee') {
      result = deleteEmployee(data.employeeId);
    } else {
      result = { status: 'error', message: 'Unknown action' };
    }
  } catch (err) {
    result = { status: 'error', message: err.toString() };
  }
  const output = ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ========== ຟັງຊັ່ນຕ່າງໆ ==========

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === 'Employees') {
      sheet.appendRow(['ID', 'ຊື່-ນາມສະກຸນ', 'ພະແນກ', 'ຕຳແໜ່ງ', 'FaceDescriptor', 'ວັນທີລົງທະບຽນ']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#C62828').setFontColor('#FFFFFF');
    } else if (name === 'Attendance') {
      sheet.appendRow(['ລຳດັບ', 'ລະຫັດພະນັກງານ', 'ຊື່-ນາມສະກຸນ', 'ພະແນກ', 'ວັນທີ', 'ເວລາ', 'ສະຖານະ', 'Latitude', 'Longitude']);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#C62828').setFontColor('#FFFFFF');
    }
  }
  return sheet;
}

function registerEmployee(data) {
  const sheet = getSheet('Employees');
  const id = 'EMP-' + Date.now();
  const now = new Date();
  const dateStr = Utilities.formatDate(now, 'Asia/Vientiane', 'dd/MM/yyyy HH:mm:ss');
  sheet.appendRow([
    id,
    data.name,
    data.department,
    data.position || '-',
    JSON.stringify(data.faceDescriptor),
    dateStr
  ]);
  return { status: 'ok', employeeId: id, message: 'ລົງທະບຽນສຳເລັດ' };
}

function getEmployees() {
  const sheet = getSheet('Employees');
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return { status: 'ok', employees: [] };
  const employees = rows.slice(1).map(row => ({
    id: row[0],
    name: row[1],
    department: row[2],
    position: row[3],
    faceDescriptor: JSON.parse(row[4] || '[]'),
    registeredDate: row[5]
  }));
  return { status: 'ok', employees };
}

function logAttendance(data) {
  const sheet = getSheet('Attendance');
  const now = new Date();
  const dateStr = Utilities.formatDate(now, 'Asia/Vientiane', 'dd/MM/yyyy');
  const timeStr = Utilities.formatDate(now, 'Asia/Vientiane', 'HH:mm:ss');
  const lastRow = sheet.getLastRow();
  sheet.appendRow([
    lastRow,
    data.employeeId,
    data.name,
    data.department,
    dateStr,
    timeStr,
    data.status || 'IN',
    data.lat || '',
    data.lng || ''
  ]);

  // ສີພາຍໃຕ້ status
  const statusCell = sheet.getRange(sheet.getLastRow(), 7);
  if (data.status === 'IN') {
    statusCell.setBackground('#E8F5E9').setFontColor('#1B5E20');
  } else {
    statusCell.setBackground('#FFF3E0').setFontColor('#E65100');
  }

  return { status: 'ok', message: 'ບັນທຶກເຂົ້າວຽກສຳເລັດ' };
}

function getAttendance(date) {
  const sheet = getSheet('Attendance');
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return { status: 'ok', records: [] };
  let records = rows.slice(1).map(row => ({
    no: row[0],
    employeeId: row[1],
    name: row[2],
    department: row[3],
    date: row[4],
    time: row[5],
    status: row[6],
    lat: row[7],
    lng: row[8]
  }));
  if (date) {
    records = records.filter(r => r.date === date);
  }
  return { status: 'ok', records };
}

function deleteEmployee(id) {
  const sheet = getSheet('Employees');
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === id) {
      sheet.deleteRow(i + 1);
      return { status: 'ok', message: 'ລຶບພະນັກງານສຳເລັດ' };
    }
  }
  return { status: 'error', message: 'ບໍ່ພົບພະນັກງານ' };
}
