/**
 * MNNM Car Spa — booking web app.
 *
 * GET  ?action=config  →  { ok, price, currency, slots: [...isoLike] }
 * POST { name, phone, slot, email? }  →  { ok } | { ok:false, error }
 *
 * Sheet layout (same spreadsheet, two tabs):
 *   • Bookings — row 1 headers, then appended rows:
 *       A: שם מלא   B: טלפון   C: תאריך הזמנה   D: תאריך ביצוע   E: מחיר
 *   • Config — col A is key, col B is value:
 *       price    | 15
 *       currency | ₪
 *       slot     | 2026-05-03T10:00
 *       slot     | 2026-05-03T11:00
 *       ...
 */

const SHEET_ID = '1ByBuprtoQacunmOLPq7md6-W25oZWuk5U1Z1DXZ81k8';
const BOOKINGS_TAB = 'Bookings';
const CONFIG_TAB = 'Config';
const TIMEZONE = 'Asia/Jerusalem';
const WASH_DURATION_MINUTES = 30;

function doGet(e) {
  try {
    if (e && e.parameter && e.parameter.action === 'config') {
      return jsonOut(Object.assign({ ok: true }, getPublicConfig()));
    }
    if (e && e.parameter && e.parameter.action === 'debug') {
      return jsonOut(getDebugDump());
    }
    return jsonOut({ ok: false, error: 'unknown_action' });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err && err.message || err) });
  }
}

function getDebugDump() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const out = {
    ok: true,
    spreadsheetName: ss.getName(),
    spreadsheetUrl: ss.getUrl(),
    allTabs: ss.getSheets().map(function (s) {
      return { name: s.getName(), lastRow: s.getLastRow(), lastCol: s.getLastColumn() };
    }),
  };
  const cfg = ss.getSheetByName(CONFIG_TAB);
  if (cfg) {
    const last = cfg.getLastRow();
    const values = cfg.getRange(1, 1, last, 2).getValues();
    out.configRows = values.map(function (r, i) {
      return { row: i + 1, key: r[0], normalized: toSlotString(r[1]) };
    });
  } else {
    out.configError = 'Config tab not found';
  }
  const bk = ss.getSheetByName(BOOKINGS_TAB);
  if (bk) {
    const last = bk.getLastRow();
    const lastCol = bk.getLastColumn();
    if (last > 0 && lastCol > 0) {
      out.bookingRows = bk.getRange(1, 1, last, Math.max(lastCol, 5)).getValues();
    } else {
      out.bookingRows = [];
    }
  } else {
    out.bookingsError = 'Bookings tab not found';
  }
  return out;
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    return jsonOut(handleBooking(body));
  } catch (err) {
    return jsonOut({ ok: false, error: String(err && err.message || err) });
  }
}

function getPublicConfig() {
  const cfg = readConfigTab();
  const taken = readBookedSlots();
  return {
    price: cfg.price,
    currency: cfg.currency,
    slots: cfg.slots.filter(function (s) { return !taken.has(s); }),
  };
}

function handleBooking(body) {
  const name = (body && body.name || '').toString().trim();
  const phone = (body && body.phone || '').toString().trim();
  const slot = (body && body.slot || '').toString().trim();
  const email = (body && body.email || '').toString().trim();

  if (!name || !phone || !slot) {
    return { ok: false, error: 'missing_fields' };
  }
  if (!isValidSlotString(slot)) {
    return { ok: false, error: 'bad_slot_format' };
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const cfg = readConfigTab();
    if (cfg.slots.indexOf(slot) === -1) {
      return { ok: false, error: 'slot_not_offered' };
    }
    const taken = readBookedSlots();
    if (taken.has(slot)) {
      return { ok: false, error: 'slot_taken' };
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(BOOKINGS_TAB);
    if (!sheet) throw new Error('Bookings tab not found');
    // Insert just under the header so newest bookings are on top.
    sheet.insertRowBefore(2);
    sheet.getRange(2, 1, 1, 5).setValues([[name, phone, new Date(), slot, cfg.price]]);

    if (email) {
      try {
        createCalendarInvite({ name: name, slot: slot, email: email });
      } catch (calErr) {
        // Booking succeeded; calendar invite is best-effort.
        console.warn('calendar invite failed', calErr);
      }
    }
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function createCalendarInvite(opts) {
  const start = parseSlot(opts.slot);
  const end = new Date(start.getTime() + WASH_DURATION_MINUTES * 60 * 1000);
  CalendarApp.getDefaultCalendar().createEvent(
    'מננם ספא רכב — ' + opts.name,
    start,
    end,
    {
      description: 'הדולב 4, חרב לאת',
      location: 'הדולב 4, חרב לאת',
      guests: opts.email,
      sendInvites: true,
    }
  );
}

function readConfigTab() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(CONFIG_TAB);
  if (!sheet) throw new Error('Config tab not found');
  const values = sheet.getRange(1, 1, sheet.getLastRow(), 2).getValues();
  let price = 15;
  let currency = '₪';
  const slots = [];
  for (let i = 0; i < values.length; i++) {
    const key = String(values[i][0] || '').trim().toLowerCase();
    const raw = values[i][1];
    if (!key) continue;
    if (key === 'price') {
      const n = Number(raw);
      if (!isNaN(n) && n > 0) price = n;
    } else if (key === 'currency') {
      const c = String(raw || '').trim();
      if (c) currency = c;
    } else if (key === 'slot') {
      const s = toSlotString(raw);
      if (s && isValidSlotString(s)) slots.push(s);
    }
  }
  return { price: price, currency: currency, slots: slots };
}

function readBookedSlots() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(BOOKINGS_TAB);
  if (!sheet) throw new Error('Bookings tab not found');
  const last = sheet.getLastRow();
  const taken = new Set();
  if (last < 2) return taken;
  const values = sheet.getRange(2, 4, last - 1, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    const s = toSlotString(values[i][0]);
    if (s) taken.add(s);
  }
  return taken;
}

function toSlotString(v) {
  // `instanceof Date` fails cross-realm in Apps Script for values returned by
  // SpreadsheetApp.getValues(). Use the toString tag which works regardless.
  if (v && typeof v === 'object' && Object.prototype.toString.call(v) === '[object Date]') {
    return Utilities.formatDate(v, TIMEZONE, "yyyy-MM-dd'T'HH:mm");
  }
  // Accept "2026-05-03 10:00" (space) as well as "2026-05-03T10:00".
  // Also accept seconds suffix ":00" → drop it.
  const raw = String(v == null ? '' : v).trim();
  const m = raw.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})(?::\d{2})?$/);
  return m ? m[1] + 'T' + m[2] : raw;
}

function isValidSlotString(s) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s);
}

function parseSlot(s) {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!m) throw new Error('bad slot format: ' + s);
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]));
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
