const config = {
  auth: {
    clientId: "DEINE-CLIENT-ID",
    authority: "https://login.microsoftonline.com/organizations",
    redirectUri: window.location.origin + window.location.pathname
  },
  cache: {
    cacheLocation: "sessionStorage"
  }
};

const graphScopes = ["User.Read"];
const directoryScopes = ["User.ReadBasic.All"];

const msalApp = new msal.PublicClientApplication(config);

let account = null;

const status = document.querySelector("#status");
const portal = document.querySelector("#portal");

function setStatus(message) {
  status.textContent = message;
}

async function getToken(scopes) {
  const request = { scopes, account };

  try {
    return await msalApp.acquireTokenSilent(request);
  } catch (error) {
    if (error instanceof msal.InteractionRequiredAuthError) {
      await msalApp.acquireTokenRedirect(request);
      return null;
    }
    throw error;
  }
}

async function graphGet(path, scopes) {
  const token = await getToken(scopes);
  if (!token) return null;

  const response = await fetch(
    "https://graph.microsoft.com/v1.0/" + path,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(
      `Microsoft Graph meldet HTTP ${response.status}`
    );
  }

  return response.json();
}

async function initialize() {
  await msalApp.initialize();

  const result = await msalApp.handleRedirectPromise();
  account = result?.account
    ?? msalApp.getActiveAccount()
    ?? msalApp.getAllAccounts()[0]
    ?? null;

  if (account) {
    msalApp.setActiveAccount(account);
    portal.hidden = false;
    document.querySelector("#logout").hidden = false;
    document.querySelector("#login").hidden = true;
    setStatus(`Angemeldet: ${account.username}`);
  }
}

document.querySelector("#login").addEventListener("click", async () => {
  await msalApp.loginRedirect({
    scopes: graphScopes
  });
});

document.querySelector("#logout").addEventListener("click", () => {
  msalApp.logoutRedirect({ account });
});

document.querySelector("#find").addEventListener("click", async () => {
  const term = document.querySelector("#search").value.trim();
  const list = document.querySelector("#users");
  list.replaceChildren();

  if (term.length < 2) {
    setStatus("Bitte mindestens zwei Zeichen eingeben.");
    return;
  }

  try {
    const filter = encodeURIComponent(
      `startsWith(displayName,'${term.replace(/'/g, "''")}')`
    );

    const data = await graphGet(
      `users?$select=id,displayName,mail&$top=10&$filter=${filter}`,
      directoryScopes
    );

    if (!data) return;

    for (const user of data.value ?? []) {
      const li = document.createElement("li");
      const button = document.createElement("button");

      button.textContent =
        `${user.displayName} (${user.mail ?? "Keine E-Mail"})`;

      button.addEventListener("click", () => {
        showUser(user);
      });

      li.append(button);
      list.append(li);
    }

    if (!list.childElementCount) {
      setStatus("Keine passenden Benutzer gefunden.");
    } else {
      setStatus("Suchergebnisse geladen.");
    }
  } catch (error) {
    setStatus("Suche fehlgeschlagen: " + error.message);
  }
});

function showUser(user) {
  const details = document.querySelector("#details");
  details.replaceChildren();

  const heading = document.createElement("h3");
  heading.textContent = user.displayName;

  const email = document.createElement("p");
  email.textContent = user.mail ?? "Keine E-Mail-Adresse hinterlegt";

  details.append(heading, email);
}

initialize().catch(error => {
  setStatus("Initialisierung fehlgeschlagen: " + error.message);
});
