/*
 * VE-Log – Rollenanzeige im Frontend
 *
 * Rollen:
 *   admin       -> alle Bereiche
 *   mitarbeiter -> Arbeitsbereiche, Formulare, eigene Nachweise
 *   gast        -> Dashboard, Formulare, Meine Nachweise, Einstellungen
 *
 * WICHTIG:
 * Diese Datei blendet Bereiche aus und steuert die Navigation.
 * Eine im Browser gespeicherte Rolle ist NICHT sicher gegen Manipulation.
 * Für vertrauliche Nachweise und echte Zugriffskontrolle ist ein Backend
 * mit serverseitiger Anmeldung und Berechtigungsprüfung erforderlich.
 */
(function () {
  "use strict";

  const LOGIN_PAGE = "login.html";
  const ROLE_KEY = "veLogUser";

  function readUser() {
    try {
      const raw = sessionStorage.getItem(ROLE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn("VE-Log: Benutzersitzung konnte nicht gelesen werden.", error);
      return null;
    }
  }

  function currentRole() {
    const user = readUser();
    return user && typeof user.role === "string" ? user.role : null;
  }

  function applyNavigation() {
    const role = currentRole();

    document.querySelectorAll(".nav a[data-roles]").forEach((link) => {
      const allowed = link.dataset.roles.split(",").map((item) => item.trim());
      link.hidden = !role || !allowed.includes(role);
    });

    document.querySelectorAll("[data-form-roles]").forEach((card) => {
      const allowed = card.dataset.formRoles.split(",").map((item) => item.trim());
      card.hidden = !role || !allowed.includes(role);
    });

    const user = readUser();
    const label = document.getElementById("currentUserLabel");
    if (label && user) {
      label.textContent = user.name ? `Angemeldet: ${user.name}` : "";
    }
  }

  function requirePage(allowedRoles) {
    const user = readUser();

    if (!user || !user.role) {
      window.location.replace(LOGIN_PAGE);
      return false;
    }

    if (!allowedRoles.includes(user.role)) {
      window.location.replace("dashboard.html");
      return false;
    }

    return true;
  }

  function logout() {
    sessionStorage.removeItem(ROLE_KEY);
    window.location.replace(LOGIN_PAGE);
  }

  window.VELogAuth = {
    getUser: readUser,
    getRole: currentRole,
    applyNavigation,
    requirePage,
    logout
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyNavigation();

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", logout);
    }
  });
})();
