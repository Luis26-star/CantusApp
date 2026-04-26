import { uploadPdf } from "./api.js";
import { getUser } from "./auth.js";
// optional:
// import { getRole } from "./roles.js";

async function checkAuth() {
  const user = await getUser();
  if (!user) {
    window.location.href = "/login.html";
    return null;
  }
  return user;
}

async function init() {
  const user = await checkAuth();
  if (!user) return;

  // OPTIONAL: nur Vorstand darf uploaden
  /*
  const role = await getRole();
  if (role !== "board") {
    alert("Kein Zugriff");
    window.location.href = "/";
    return;
  }
  */

  const btn = document.getElementById("uploadBtn");
  const input = document.getElementById("pdf");
  const status = document.getElementById("status");

  btn.addEventListener("click", async () => {
    const file = input.files[0];

    if (!file) {
      status.textContent = "Bitte eine PDF auswählen.";
      return;
    }

    status.textContent = "Upload läuft...";

    const name = await uploadPdf("scores", file);

    if (name) {
      status.textContent = `Upload erfolgreich: ${name}`;
    } else {
      status.textContent = "Upload fehlgeschlagen.";
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
