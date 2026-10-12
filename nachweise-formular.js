'use strict';

const firebaseConfig = {
  apiKey: 'AIzaSyDXTAVTeddKxwOp_C_2Z4lPY9yI5bAm0KM',
  authDomain: 've-log.firebaseapp.com',
  databaseURL:
    'https://ve-log-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 've-log',
  storageBucket: 've-log.firebasestorage.app',
  messagingSenderId: '749978080433',
  appId: '1:749978080433:web:8f64ef99a557fe2346be90'
};

const form = document.getElementById('nachweisForm');
const button = document.getElementById('saveNachweis');
const status = document.getElementById('nachweisStatus');

const typ = document.body.dataset.nachweisTyp;
const titel = document.body.dataset.nachweisTitel || 'Nachweis';

let recordId = new URLSearchParams(location.search).get('id');
let busy = false;
let ready = false;
let activeUid = null;
let session = 0;

function message(text, error = false) {
  status.textContent = text;
  status.style.color = error ? '#8e2f2b' : '';
}

function fields() {
  return [...form.elements].filter(el =>
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) &&
    !['button', 'submit', 'reset', 'file', 'password'].includes(el.type) &&
    (el.name || el.id)
  );
}

function collect() {
  const data = {};

  for (const el of fields()) {
    const key = el.name || el.id;

    if (
      /[.#$\[\]\/]/.test(key) ||
      ['__proto__', 'constructor', 'prototype'].includes(key)
    ) {
      throw new Error(
        'Ein Formularfeld hat einen ungültigen Namen.'
      );
    }

    if (el.type === 'radio') {
      if (el.checked) data[key] = el.value;
    } else if (el.type === 'checkbox') {
      data[key] = el.checked;
    } else if (el.type === 'number') {
      data[key] = el.value === '' ? '' : el.valueAsNumber;
    } else {
      data[key] = el.value;
    }
  }

  return data;
}

function restore(data) {
  for (const el of fields()) {
    const key = el.name || el.id;

    if (!Object.hasOwn(data, key)) continue;

    if (el.type === 'checkbox') {
      el.checked = data[key] === true;
    } else if (el.type === 'radio') {
      el.checked = String(data[key]) === el.value;
    } else {
      el.value = data[key] ?? '';
    }
  }
}

function errorMessage(error) {
  if (
    /permission.denied/i.test(
      error?.code || error?.message || ''
    )
  ) {
    return (
      'Firebase verweigert den Zugriff. ' +
      'Die Datenbankregeln müssen deinem angemeldeten Konto ' +
      'den Zugriff auf nachweise/' + activeUid + ' erlauben.'
    );
  }

  return (
    error?.message ||
    'Speichern fehlgeschlagen. Bitte prüfe deine Internetverbindung.'
  );
}

async function start() {
  if (!form || !button || !status || !typ) {
    throw new Error(
      'Formular, Speicherbutton, Statusanzeige oder Formularart fehlt.'
    );
  }

  button.disabled = true;

  if (
    recordId &&
    !/^[A-Za-z0-9_-]{1,128}$/.test(recordId)
  ) {
    message('Ungültige Nachweis-ID im Link.', true);
    return;
  }

  const [App, Auth, DB] = await Promise.all([
    import(
      'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'
    ),
    import(
      'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'
    ),
    import(
      'https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js'
    )
  ]);

  const app = App.getApps().length
    ? App.getApp()
    : App.initializeApp(firebaseConfig);

  const auth = Auth.getAuth(app);
  const db = DB.getDatabase(app);

  Auth.onAuthStateChanged(
    auth,
    async user => {
      const current = ++session;

      ready = false;
      button.disabled = true;

      if (activeUid && activeUid !== user?.uid) {
        activeUid = null;

        fields().forEach(el => {
          el.disabled = true;
        });

        message(
          'Die Anmeldung wurde geändert. Bitte lade die Seite neu.',
          true
        );
        return;
      }

      activeUid = user?.uid || null;

      if (!user) {
        message(
          'Bitte melde dich zuerst über das Dashboard an. ' +
          'Öffne danach dieses Formular erneut.'
        );
        return;
      }

      try {
        if (recordId) {
          message('Nachweis wird geladen …');

          const snapshot = await DB.get(
            DB.ref(
              db,
              `nachweise/${user.uid}/${recordId}`
            )
          );

          if (current !== session) return;

          if (!snapshot.exists()) {
            throw new Error(
              'Dieser Nachweis wurde nicht gefunden.'
            );
          }

          const record = snapshot.val();

          if (record.typ !== typ) {
            throw new Error(
              'Der Link gehört zu einer anderen Formularart.'
            );
          }

          restore(record.daten || {});

          if (record.status !== 'entwurf') {
            fields().forEach(el => {
              el.disabled = true;
            });

            message(
              'Dieser Nachweis kann nur angesehen und gedruckt werden.'
            );
            return;
          }
        }

        ready = true;
        button.disabled = busy;

        message(
          recordId
            ? 'Nachweis geladen. Du kannst ihn bearbeiten und erneut speichern.'
            : 'Bereit zum Speichern.'
        );
      } catch (error) {
        if (current === session) {
          message(errorMessage(error), true);
        }
      }
    },
    error => {
      message(errorMessage(error), true);
    }
  );

  async function save() {
    if (
      busy ||
      !ready ||
      !auth.currentUser ||
      !form.reportValidity()
    ) {
      return;
    }

    busy = true;
    button.disabled = true;

    const user = auth.currentUser;
    const current = session;
    const oldText = button.textContent;

    button.textContent = 'Wird gespeichert …';

    message(
      'Speichern läuft. Bitte lasse die Seite geöffnet, ' +
      'bis die Bestätigung erscheint.'
    );

    try {
      const daten = collect();

      // Erneutes Speichern verwendet dieselbe Nachweis-ID.
      if (!recordId) {
        recordId = DB.push(
          DB.ref(db, `nachweise/${user.uid}`)
        ).key;
      }

      const target = DB.ref(
        db,
        `nachweise/${user.uid}/${recordId}`
      );

      const result = await DB.runTransaction(
        target,
        existing => {
          if (
            existing &&
            (
              existing.typ !== typ ||
              existing.status !== 'entwurf'
            )
          ) {
            return;
          }

          return {
            ...(existing || {}),
            typ,
            titel,
            datum: daten.datum || '',
            status: 'entwurf',
            createdAt:
              existing?.createdAt ?? DB.serverTimestamp(),
            updatedAt: DB.serverTimestamp(),
            daten
          };
        },
        { applyLocally: false }
      );

      if (!result.committed) {
        throw new Error(
          'Der Nachweis wurde inzwischen eingereicht oder geändert ' +
          'und kann nicht gespeichert werden.'
        );
      }

      if (current !== session) return;

      const url = new URL(location.href);
      url.searchParams.set('id', recordId);

      history.replaceState(null, '', url);

      message(
        'Nachweis erfolgreich gespeichert. ' +
        'Du findest ihn unter „Meine Nachweise“. ' +
        'E-Mail-Versand ist noch nicht eingerichtet.'
      );
    } catch (error) {
      if (current === session) {
        message(errorMessage(error), true);
      }
    } finally {
      busy = false;
      button.textContent = oldText;
      button.disabled = !ready;
    }
  }

  button.addEventListener('click', save);

  form.addEventListener('submit', event => {
    event.preventDefault();
    save();
  });
}

start().catch(error => {
  if (button) button.disabled = true;

  if (status) {
    message(
      'Die Speicherfunktion konnte nicht geladen werden: ' +
      errorMessage(error),
      true
    );
  }

  console.error('VE-Log Speicherfunktion:', error);
});
