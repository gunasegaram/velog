// VE-Log – gemeinsamer Speicher- und PDF-Code für Arbeitsnachweis und Arbeitsnachweis LKW.
// Speichert den Nachweis und seine PDF in Firebase Realtime Database unter nachweise/<uid>/<id>.
'use strict';

const firebaseConfig = {
  apiKey: 'AIzaSyDXTAVTeddKxwOp_C_2Z4lPY9yI5bAm0KM',
  authDomain: 've-log.firebaseapp.com',
  databaseURL: 'https://ve-log-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 've-log',
  storageBucket: 've-log.firebasestorage.app',
  messagingSenderId: '749978080433',
  appId: '1:749978080433:web:8f64ef99a557fe2346be90'
};

const form = document.getElementById('nachweisForm');
const saveButton = document.getElementById('saveNachweis');
const statusElement = document.getElementById('nachweisStatus');
const type = document.body.dataset.nachweisTyp || (location.pathname.includes('lkw') ? 'arbeitsnachweis_lkw' : 'arbeitsnachweis');
const title = document.body.dataset.nachweisTitel || (type === 'arbeitsnachweis_lkw' ? 'Arbeitsnachweis LKW' : 'Arbeitsnachweis');
const NEW_RECORD = new URLSearchParams(location.search).get('new') === '1';
if (NEW_RECORD) history.replaceState(null, '', location.pathname);
let auth, db, DB, app, saving = false, connected = false;

function setStatus(message, error = false) {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.style.color = error ? '#8e2f2b' : '';
  statusElement.setAttribute('aria-live', 'polite');
}
function safeText(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '');
}
function collectData() {
  const data = {};
  for (const el of Array.from(form.elements)) {
    if (!el.name || el.disabled || ['button','submit','reset'].includes(el.type)) continue;
    if (el.type === 'radio') {
      if (el.checked) data[el.name] = el.value;
      else if (!(el.name in data)) data[el.name] = '';
    } else if (el.type === 'checkbox') {
      data[el.name] = Boolean(el.checked);
    } else if (el.type === 'file') {
      continue;
    } else {
      data[el.name] = el.value;
    }
  }
  return data;
}
function fieldLabel(el, key) {
  const label = el.labels && el.labels[0] ? el.labels[0].textContent.trim() : '';
  if (label) return label.replace(/\s+/g, ' ');
  const aria = el.getAttribute('aria-label');
  if (aria) return aria;
  return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
}
function collectLabels() {
  const labels = {};
  for (const el of Array.from(form.elements)) {
    if (el.name && !labels[el.name]) labels[el.name] = fieldLabel(el, el.name);
  }
  return labels;
}
function wrapText(text, font, size, maxWidth) {
  const words = safeText(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? line + ' ' + word : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !line) line = candidate;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}
async function createPdf(record) {
  // The same PDF format is used by „Meine Nachweise“: filename, mime, base64, sizeBytes.
  const { PDFDocument, StandardFonts, rgb } = await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle(record.titel || title);
  pdfDoc.setAuthor('VE-Log');
  pdfDoc.setSubject('Arbeitsnachweis');
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pageSize = [595.28, 841.89]; // A4
  const margin = 42, maxWidth = pageSize[0] - margin * 2;
  const data = record.daten || {};
  const labels = record.feldLabels || {};
  let page = pdfDoc.addPage(pageSize);
  let y = pageSize[1] - margin;
  const newPage = () => { page = pdfDoc.addPage(pageSize); y = pageSize[1] - margin; };
  const ensure = (height) => { if (y - height < margin) newPage(); };
  page.drawText(safeText(record.titel || title), { x: margin, y, size: 19, font: bold, color: rgb(0.56, 0.18, 0.17) });
  y -= 27;
  page.drawText('VE-LOG GmbH · Sperberweg 15 · 91056 Erlangen · Tel. 09131 / 7515-10', { x: margin, y, size: 8.5, font, color: rgb(0.3, 0.3, 0.3) });
  y -= 18;
  page.drawLine({ start: { x: margin, y }, end: { x: pageSize[0] - margin, y }, thickness: 0.8, color: rgb(0.75, 0.75, 0.75) });
  y -= 18;
  for (const [key, raw] of Object.entries(data)) {
    if (key.toLowerCase().includes('signature') || key.toLowerCase().includes('unterschrift')) continue;
    let value = raw;
    if (typeof value === 'boolean') value = value ? 'Ja' : 'Nein';
    if (value === '' || value === null || value === undefined) continue;
    const label = safeText(labels[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' '));
    const valueLines = wrapText(String(value), font, 9.5, maxWidth - 150);
    const rowHeight = Math.max(14, valueLines.length * 12 + 4);
    ensure(rowHeight);
    page.drawText(label.slice(0, 80), { x: margin, y, size: 9.5, font: bold, color: rgb(0.18, 0.2, 0.24) });
    valueLines.forEach((line, index) => page.drawText(line, { x: margin + 150, y: y - index * 12, size: 9.5, font, color: rgb(0.12, 0.12, 0.12) }));
    y -= rowHeight;
    page.drawLine({ start: { x: margin, y: y + 2 }, end: { x: pageSize[0] - margin, y: y + 2 }, thickness: 0.25, color: rgb(0.88, 0.88, 0.88) });
  }
  const signatures = [
    ['Unterschrift VE-Log GmbH', data.signatureVELogData || data.unterschriftVELog],
    ['Unterschrift Empfänger', data.signatureEmpfaengerData || data.unterschriftEmpfaenger]
  ].filter(([, value]) => typeof value === 'string' && value.startsWith('data:image/png;base64,'));
  if (signatures.length) {
    ensure(150);
    if (y < margin + 150) newPage();
    y -= 12;
    page.drawText('Unterschriften', { x: margin, y, size: 11, font: bold, color: rgb(0.18, 0.2, 0.24) });
    y -= 18;
    const boxWidth = (maxWidth - 18) / 2;
    for (let i = 0; i < signatures.length; i++) {
      const [label, dataUrl] = signatures[i];
      const base64 = dataUrl.split(',')[1];
      const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const image = await pdfDoc.embedPng(bytes);
      const dims = image.scale(Math.min(boxWidth / image.width, 82 / image.height));
      const x = margin + i * (boxWidth + 18);
      page.drawImage(image, { x, y: y - dims.height, width: dims.width, height: dims.height });
      page.drawLine({ start: { x, y: y - 86 }, end: { x: x + boxWidth, y: y - 86 }, thickness: 0.6, color: rgb(0.15, 0.15, 0.15) });
      page.drawText(label, { x, y: y - 100, size: 8.5, font, color: rgb(0.2, 0.2, 0.2) });
    }
  }
  const bytes = await pdfDoc.save({ useObjectStreams: true });
  if (bytes.length > 512 * 1024) throw new Error('Die PDF ist größer als 512 KB. Bitte entferne sehr lange Texte oder zeichne die Unterschrift kleiner.');
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  const day = String(record.datum || data.datum || '').replace(/[^0-9-]/g, '').slice(0, 10);
  return { filename: 'VE-Log-' + (type === 'arbeitsnachweis_lkw' ? 'arbeitsnachweis-lkw' : 'arbeitsnachweis') + (day ? '-' + day : '') + '.pdf', mime: 'application/pdf', base64: btoa(binary), sizeBytes: bytes.length };
}
function makeId() {
  return 'nachweis_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
}
async function saveRecord() {
  if (saving) return;
  if (!form.reportValidity()) return;
  if (!auth?.currentUser) { setStatus('Bitte zuerst anmelden. Danach kannst du den Nachweis speichern.', true); return; }
  if (!connected) { setStatus('Keine Verbindung zu Firebase. Bitte Internetverbindung prüfen und erneut versuchen.', true); return; }
  saving = true; saveButton.disabled = true; setStatus('Nachweis und PDF werden erstellt und gespeichert …');
  try {
    const user = auth.currentUser;
    const data = collectData();
    const existingId = NEW_RECORD ? null : new URLSearchParams(location.search).get('id');
    const id = existingId || makeId();
    const record = {
      id, uid: user.uid, typ: type, titel: title,
      datum: String(data.datum || new Date().toISOString().slice(0, 10)),
      status: 'entwurf', daten: data, feldLabels: collectLabels(),
      createdAt: Date.now(), updatedAt: Date.now(),
      erstelltVon: user.email || user.uid
    };
    const pdf = await createPdf(record);
    record.pdf = { ...pdf, generatedAt: Date.now() };
    const ref = DB.ref(db, 'nachweise/' + user.uid + '/' + id);
    // Existing ID is updated; otherwise create a new record.
    if (existingId) {
      const snapshot = await DB.get(ref);
      const previous = snapshot.val();
      if (previous && previous.status !== 'entwurf') throw new Error('Dieser Nachweis wurde bereits eingereicht und kann nicht überschrieben werden. Bitte starte einen neuen Nachweis.');
      if (previous) record.createdAt = previous.createdAt || record.createdAt;
    }
    await DB.set(ref, record);
    history.replaceState(null, '', location.pathname + '?id=' + encodeURIComponent(id));
    setStatus('Gespeichert! Formular und PDF liegen jetzt unter „Meine Nachweise“.');
  } catch (error) {
    console.error('VE-Log Nachweis speichern:', error);
    const message = /permission_denied|permission denied/i.test(String(error?.message || error))
      ? 'Firebase hat das Speichern abgelehnt. Bitte die Realtime-Database-Regeln und die Anmeldung prüfen.'
      : (error?.message || 'Speichern fehlgeschlagen. Bitte erneut versuchen.');
    setStatus(message, true);
  } finally {
    saving = false;
    saveButton.disabled = !auth?.currentUser || !connected;
  }
}

saveButton?.addEventListener('click', saveRecord);

(async function init() {
  try {
    setStatus('Firebase wird verbunden …');
    const [App, Auth, Database] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js')
    ]);
    app = App.getApps().length ? App.getApp() : App.initializeApp(firebaseConfig);
    auth = Auth.getAuth(app);
    DB = Database;
    db = DB.getDatabase(app);
    DB.onValue(DB.ref(db, '.info/connected'), snapshot => {
      connected = snapshot.val() === true;
      saveButton.disabled = !auth?.currentUser || !connected || saving;
      if (!connected) setStatus('Warte auf Firebase-Verbindung …');
      else if (auth?.currentUser) setStatus('Bereit. Formular ausfüllen und auf „Speichern“ klicken.');
    }, error => setStatus(error.message || 'Firebase-Verbindung fehlgeschlagen.', true));
    Auth.onAuthStateChanged(auth, user => {
      saveButton.disabled = !user || !connected || saving;
      if (!user) setStatus('Nicht angemeldet. Bitte zuerst über index.html anmelden.', true);
      else if (connected) setStatus('Angemeldet. Formular ausfüllen und auf „Speichern“ klicken.');
    });
  } catch (error) {
    console.error('VE-Log Initialisierung:', error);
    saveButton.disabled = true;
    setStatus('Speicherfunktion konnte nicht geladen werden. Öffne die Seite über deine Website (HTTPS) und prüfe die Internetverbindung.', true);
  }
})();
