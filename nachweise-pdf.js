'use strict';

// Maximale PDF-Größe: 512 KB.
export const MAX_PDF_BYTES = 512 * 1024;

export const EMAIL_EMPFAENGER = 'technik@ve-log.de';

const PDF_SCRIPT =
  'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';

let pdfLibrary;

export const fieldLabels = {
  name: 'Name',
  datum: 'Datum',
  stunden: 'Stunden',
  abwesenheitVon: 'Abwesenheit von',
  abwesenheitBis: 'Abwesenheit bis',
  abwesenheitStunden: 'Abwesenheitsstunden',
  arbeitsbeginn: 'Arbeitsbeginn',
  pause: 'Pause (Minuten)',
  arbeitsende: 'Arbeitsende',
  arbeitsstunden: 'Arbeitsstunden',
  firma: 'Firma',
  kilometer: 'Kilometer',
  fahrstunden: 'Fahrstunden',
  bv: 'BV',
  kostenstelle: 'Kostenstelle',
  gesamtstunden: 'Gesamtstunden',
  bemerkungen: 'Bemerkungen',
  tag0: 'Montag',
  tag1: 'Dienstag',
  tag2: 'Mittwoch',
  tag3: 'Donnerstag',
  tag4: 'Freitag',
  tag5: 'Samstag',
  tag6: 'Sonntag',
  tag7: 'Sonn-/Feiertag'
};

export function labelFor(key, labels = {}) {
  if (Object.hasOwn(labels, key)) {
    return labels[key];
  }

  if (Object.hasOwn(fieldLabels, key)) {
    return fieldLabels[key];
  }

  const match =
    /^(zeit|taetigkeit|stundenZeile)_(\d+)$/.exec(key);

  if (match) {
    const names = {
      zeit: 'Uhrzeit von-bis',
      taetigkeit: 'Ausgeführte Arbeiten',
      stundenZeile: 'Arbeitsstunden'
    };

    return names[match[1]] + ' - Zeile ' + match[2];
  }

  return key.replace(/_/g, ' ');
}

export function collectFieldLabels(elements) {
  const labels = Object.create(null);

  for (const el of elements) {
    const key = el.name || el.id;

    const raw =
      el.getAttribute('aria-label') ||
      el.labels?.[0]?.textContent?.trim();

    labels[key] = Object.hasOwn(fieldLabels, key)
      ? fieldLabels[key]
      : raw || labelFor(key);
  }

  return labels;
}

function loadLibrary() {
  if (window.PDFLib?.PDFDocument) {
    return Promise.resolve(window.PDFLib);
  }

  if (!pdfLibrary) {
    pdfLibrary = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      let done = false;

      const finish = error => {
        if (done) return;

        done = true;
        clearTimeout(timer);

        script.onload = null;
        script.onerror = null;

        if (error) {
          script.remove();
          reject(error);
        } else {
          resolve(window.PDFLib);
        }
      };

      const timer = setTimeout(() => {
        finish(
          new Error(
            'Die PDF-Bibliothek antwortet nicht. ' +
            'Bitte erneut versuchen.'
          )
        );
      }, 20000);

      script.src = PDF_SCRIPT;

      script.onload = () => {
        finish(
          window.PDFLib?.PDFDocument
            ? null
            : new Error(
                'Die PDF-Bibliothek konnte nicht gestartet werden.'
              )
        );
      };

      script.onerror = () => {
        finish(
          new Error(
            'Die PDF-Bibliothek konnte nicht geladen werden. ' +
            'Prüfe deine Internetverbindung.'
          )
        );
      };

      document.head.append(script);
    }).catch(error => {
      pdfLibrary = null;
      throw error;
    });
  }

  return pdfLibrary;
}

function safeText(value) {
  return String(value)
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...');
}

function flatten(data, labels, prefix = '', depth = 0) {
  if (depth > 8) {
    throw new Error(
      'Die Formulardaten sind zu tief verschachtelt.'
    );
  }

  const rows = [];

  for (const [key, value] of Object.entries(data || {})) {
    const title = prefix + labelFor(key, labels);

    if (value && typeof value === 'object') {
      rows.push(
        ...flatten(value, {}, title + ' / ', depth + 1)
      );
    } else {
      let text;

      if (value == null || value === '') {
        text = '-';
      } else if (typeof value === 'boolean') {
        text = value ? 'Ja' : 'Nein';
      } else {
        text = String(value);
      }

      rows.push([title, text]);
    }
  }

  return rows;
}

export async function createPdf({
  titel = 'Nachweis',
  typ = 'nachweis',
  daten = {},
  feldLabels = {}
}) {
  if (JSON.stringify(daten).length > 150000) {
    throw new Error(
      'Die Formulardaten sind zu groß für diese PDF-Funktion.'
    );
  }

  const {
    PDFDocument,
    StandardFonts,
    rgb
  } = await loadLibrary();

  const doc = await PDFDocument.create();

  const normal = await doc.embedFont(
    StandardFonts.Helvetica
  );

  const bold = await doc.embedFont(
    StandardFonts.HelveticaBold
  );

  doc.setTitle(safeText(titel));
  doc.setAuthor('VE-Log');
  doc.setSubject('Gespeicherter Formularnachweis');

  const mm = 72 / 25.4;
  const width = 210 * mm;
  const height = 297 * mm;

  const ink = rgb(35 / 255, 50 / 255, 71 / 255);
  const muted = rgb(90 / 255, 95 / 255, 108 / 255);

  let page = doc.addPage([width, height]);
  let y = 36;

  function split(text, font, size, maxWidth) {
    const lines = [];

    for (const paragraph of safeText(text).split(/\r?\n/)) {
      if (!paragraph) {
        lines.push('');
        continue;
      }

      let line = '';

      for (const char of paragraph) {
        const tooWide =
          line &&
          font.widthOfTextAtSize(line + char, size) >
            maxWidth * mm;

        if (tooWide) {
          const space = line.lastIndexOf(' ');

          if (space > 0) {
            lines.push(line.slice(0, space));
            line = line.slice(space + 1) + char;
          } else {
            lines.push(line);
            line = char;
          }
        } else {
          line += char;
        }
      }

      lines.push(line);
    }

    return lines;
  }

  function draw(text, x, top, font, size, color) {
    page.drawText(text, {
      x: x * mm,
      y: height - top * mm,
      font,
      size,
      color
    });
  }

  function newPageIfNeeded() {
    if (y > 276) {
      page = doc.addPage([width, height]);
      y = 20;
    }
  }

  draw(
    'VE-Log',
    16,
    17,
    bold,
    17,
    rgb(142 / 255, 47 / 255, 43 / 255)
  );

  for (const line of split(titel, bold, 12, 178)) {
    newPageIfNeeded();
    draw(line, 16, y, bold, 12, ink);
    y += 6;
  }

  y += 5;

  for (const [label, value] of flatten(daten, feldLabels)) {
    const imagePattern =
      /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/;

    if (imagePattern.test(value)) {
      if (value.length > 700000) {
        throw new Error(
          'Ein gespeichertes Bild ist zu groß für die PDF.'
        );
      }

      const image = value.startsWith('data:image/png')
        ? await doc.embedPng(value)
        : await doc.embedJpg(value);

      const scale = Math.min(
        (119 * mm) / image.width,
        (50 * mm) / image.height
      );

      const imageHeight = image.height * scale / mm;

      if (y + imageHeight > 276) {
        page = doc.addPage([width, height]);
        y = 20;
      }

      for (const line of split(label, bold, 9, 52)) {
        draw(line, 16, y, bold, 9, muted);
        y += 5;
      }

      page.drawImage(image, {
        x: 74 * mm,
        y: height - (y + imageHeight) * mm,
        width: image.width * scale,
        height: image.height * scale
      });

      y += imageHeight + 8;
      continue;
    }

    let labels;
    let values;

    try {
      labels = split(label, bold, 9, 52);
      values = split(value, normal, 10, 119);
    } catch {
      throw new Error(
        'Ein Text enthält Zeichen, die die PDF-Schrift ' +
        'nicht unterstützt. Deutsche Umlaute sind möglich; ' +
        'entferne bitte Emojis oder andere Sonderzeichen.'
      );
    }

    const length = Math.max(
      labels.length,
      values.length
    );

    for (let i = 0; i < length; i++) {
      newPageIfNeeded();

      if (labels[i]) {
        draw(labels[i], 16, y, bold, 9, muted);
      }

      if (values[i]) {
        draw(values[i], 74, y, normal, 10, ink);
      }

      y += 5;
    }

    page.drawLine({
      start: {
        x: 16 * mm,
        y: height - (y - 2) * mm
      },
      end: {
        x: 194 * mm,
        y: height - (y - 2) * mm
      },
      thickness: 0.3,
      color: rgb(0.9, 0.91, 0.93)
    });

    y += 4;
  }

  const pages = doc.getPages();

  for (let i = 0; i < pages.length; i++) {
    page = pages[i];

    draw(
      'VE-Log | ' + safeText(titel).slice(0, 70),
      16,
      289,
      normal,
      8,
      muted
    );

    const counter =
      'Seite ' + (i + 1) + ' / ' + pages.length;

    page.drawText(counter, {
      x:
        194 * mm -
        normal.widthOfTextAtSize(counter, 8),
      y: height - 289 * mm,
      font: normal,
      size: 8,
      color: muted
    });
  }

  const bytes = await doc.save();

  if (bytes.length > MAX_PDF_BYTES) {
    throw new Error(
      'Die PDF ist größer als 512 KB. ' +
      'Bitte kürze sehr lange Texte.'
    );
  }

  let binary = '';

  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, i + 8192)
    );
  }

  const part =
    String(typ)
      .replace(/[^A-Za-z0-9_-]/g, '_')
      .slice(0, 60) || 'nachweis';

  const date = String(daten.datum || '')
    .replace(/[^0-9-]/g, '')
    .slice(0, 10);

  return {
    filename:
      'VE-Log-' +
      part +
      (date ? '-' + date : '') +
      '.pdf',
    mime: 'application/pdf',
    base64: btoa(binary),
    sizeBytes: bytes.length
  };
}

export function pdfFile(pdf) {
  const maxBase64Length =
    Math.ceil(MAX_PDF_BYTES / 3) * 4;

  if (
    !pdf ||
    pdf.mime !== 'application/pdf' ||
    typeof pdf.base64 !== 'string' ||
    pdf.base64.length > maxBase64Length ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(pdf.base64)
  ) {
    throw new Error(
      'Keine gültige gespeicherte PDF vorhanden.'
    );
  }

  const binary = atob(pdf.base64);

  if (
    !binary.startsWith('%PDF-') ||
    binary.length > MAX_PDF_BYTES
  ) {
    throw new Error(
      'Die gespeicherte Datei ist keine gültige PDF.'
    );
  }

  const bytes = Uint8Array.from(
    binary,
    ch => ch.charCodeAt(0)
  );

  const filename = String(
    pdf.filename || 'VE-Log-Nachweis.pdf'
  )
    .replace(/[^A-Za-z0-9_.-]/g, '_')
    .slice(0, 150);

  return new File([bytes], filename, {
    type: 'application/pdf'
  });
}

export function downloadPdf(pdf) {
  const file = pdfFile(pdf);
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');

  a.href = url;
  a.download = file.name;

  document.body.append(a);
  a.click();
  a.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60000);
}

export function openPdf(pdf) {
  const url = URL.createObjectURL(pdfFile(pdf));
  const tab = window.open(url, '_blank');

  if (!tab) {
    URL.revokeObjectURL(url);

    throw new Error(
      'Der Browser blockiert die PDF-Ansicht. ' +
      'Erlaube Pop-ups oder lade die PDF herunter.'
    );
  }

  tab.opener = null;

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 300000);
}

export function supportsPdfSharing(pdf) {
  try {
    return (
      typeof navigator.share === 'function' &&
      typeof navigator.canShare === 'function' &&
      navigator.canShare({
        files: [pdfFile(pdf)]
      })
    );
  } catch {
    return false;
  }
}

export function sharePdf(pdf, titel) {
  return navigator.share({
    files: [pdfFile(pdf)],
    title: titel || 'VE-Log Nachweis'
  });
}

export function emailWithDownload(pdf, titel) {
  downloadPdf(pdf);

  const subject = titel || 'VE-Log Nachweis';

  const body =
    'Guten Tag,\r\n\r\n' +
    'anbei mein Nachweis als PDF.\r\n\r\n' +
    'Viele Grüße';

  window.location.href =
    'mailto:' +
    EMAIL_EMPFAENGER +
    '?subject=' +
    encodeURIComponent(subject) +
    '&body=' +
    encodeURIComponent(body);
}
