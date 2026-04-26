import { getUser } from "./auth.js";
import { listScores, getScoreUrl } from "./api.js";
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

async function loadScores() {
  try {
    const files = await listScores();
    const list = document.getElementById("files");

    list.innerHTML = ""; // reset

    if (!files || files.length === 0) {
      list.innerHTML = "<p>Keine Noten vorhanden.</p>";
      return;
    }

    files.forEach(f => {
      const btn = document.createElement("button");
      btn.textContent = f.name;

      btn.className =
        "block w-full text-left p-3 border-b hover:bg-gray-100";

      btn.onclick = async () => {
        try {
          const url = await getScoreUrl(f.name);
          document.getElementById("pdf-viewer").src = url;
        } catch (err) {
          console.error("Fehler beim Laden der Datei:", err);
          alert("Konnte Datei nicht laden");
        }
      };

      list.appendChild(btn);
    });

  } catch (err) {
    console.error("Fehler beim Laden der Noten:", err);
    document.getElementById("files").innerHTML =
      "<p>Fehler beim Laden der Noten.</p>";
  }
}

async function init() {
  const user = await checkAuth();
  if (!user) return;

  // optional Rollenprüfung:
  /*
  const role = await getRole();
  if (role !== "member" && role !== "board") {
    window.location.href = "/login.html";
    return;
  }
  */

  await loadScores();
}

// Warten bis DOM geladen ist
document.addEventListener("DOMContentLoaded", init);
