
/*
 * VE-Log – Rollen- und Navigationsverwaltung
 *
 * Rollen:
 * admin       -> alle Bereiche
 * superadmin  -> alle Bereiche
 * mitarbeiter -> Dashboard, Formulare, Nachweise, Urlaub
 * gast        -> Dashboard, Formulare, Nachweise, Einstellungen
 *
 * Hinweis:
 * Die Rollenprüfung im Frontend ist keine sichere serverseitige
 * Zugriffskontrolle. Für vertrauliche Daten ist ein Backend nötig.
 */

(function () {
  "use strict";

  const LOGIN_PAGE = "./login.html";
  const DASHBOARD_PAGE = "./dashboard.html";
  const ROLE_KEY = "veLogUser";

  const VALID_ROLES = ["admin", "mitarbeiter", "gast"];

  // Benutzer aus der aktuellen Sitzung lesen
  function readUser() {
    try {
      const raw = sessionStorage.getItem(ROLE_KEY);

      if (!raw) {
        return null;
      }

      const user = JSON.parse(raw);

      if (!user || typeof user !== "object") {
        return null;
      }

      if (typeof user.role !== "string") {
        return null;
      }

      const role = user.role.trim().toLowerCase();

      if (!VALID_ROLES.includes(role)) {
        return null;
      }

      return {
        ...user,
        role: role
      };
    } catch (error) {
      console.warn(
        "VE-Log: Sitzung konnte nicht gelesen werden.",
        error
      );

      return null;
    }
  }

  // Aktuelle Rolle zurückgeben
  function currentRole() {
    const user = readUser();
    return user ? user.role : null;
  }

  // Prüfen, ob die Rolle einen Bereich sehen darf
  function hasRoleAccess(allowedRoles, role) {
    if (!role || !Array.isArray(allowedRoles)) {
      return false;
    }

    const allowed = allowedRoles.map(function (item) {
      return String(item).trim().toLowerCase();
    });

    return allowed.includes(role);
  }

  // Navigation und Formular-Kacheln filtern
  function applyNavigation() {
    const user = readUser();
    const role = user ? user.role : null;

    // Hauptnavigation
    document.querySelectorAll(".nav a[data-roles]").forEach(
      function (link) {
        const allowedRoles = link.dataset.roles.split(",");

        link.hidden = !hasRoleAccess(allowedRoles, role);
      }
    );

    // Formular-Kacheln
    document.querySelectorAll("[data-form-roles]").forEach(
      function (card) {
        const allowedRoles = card.dataset.formRoles.split(",");

        card.hidden = !hasRoleAccess(allowedRoles, role);
      }
    );

    // Angemeldeten Benutzer anzeigen
    const userLabel = document.getElementById("currentUserLabel");

    if (userLabel) {
      userLabel.textContent = user
        ? "Angemeldet: " + (user.name || user.role)
        : "";
    }
  }

  // Geschützte Seiten absichern
  function requirePage(allowedRoles) {
    const user = readUser();

    // Keine gültige Sitzung: zur Anmeldung
    if (!user) {
      window.location.replace(
        new URL(LOGIN_PAGE, window.location.href).href
      );

      return false;
    }

    // Rolle nicht für diese Seite zugelassen
    if (!hasRoleAccess(allowedRoles, user.role)) {
      window.location.replace(
        new URL(DASHBOARD_PAGE, window.location.href).href
      );

      return false;
    }

    return true;
  }

  // Abmelden
  function logout() {
    sessionStorage.removeItem(ROLE_KEY);

    window.location.replace(
      new URL(LOGIN_PAGE, window.location.href).href
    );
  }

  // Öffentliche Funktionen für die einzelnen HTML-Seiten
  window.VELogAuth = {
    getUser: readUser,
    getRole: currentRole,
    applyNavigation: applyNavigation,
    requirePage: requirePage,
    logout: logout
  };

  // Initialisierung unabhängig davon, wann das Script geladen wurde
  function initialize() {
    applyNavigation();

    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton && !logoutButton.dataset.logoutInitialized) {
      logoutButton.dataset.logoutInitialized = "true";
      logoutButton.addEventListener("click", logout);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
