import { getUser } from "./auth.js";
import { getRole } from "./roles.js";

async function init() {
  const path = window.location.pathname;

  const user = await getUser();

  // 🔒 Login prüfen
  if (!user && !path.includes("login")) {
    window.location.href = "/login.html";
    return;
  }

  if (path.includes("login")) return;

  const role = await getRole();

  console.log("User:", user?.email);
  console.log("Role:", role);

  // -------------------------
  // 🏠 DASHBOARD
  // -------------------------
  if (path.includes("dashboard")) {

    document.getElementById("userEmail")?.textContent = user?.email || "";
    document.getElementById("role")?.textContent = role || "";

    if (role === "board") {
      document.getElementById("adminSection")?.classList.remove("hidden");
    }

    const custom = document.getElementById("customDashboard");
    if (custom) {
      custom.innerHTML += `<!-- eigener Code hier -->`;
    }
  }

  // -------------------------
  // 📅 EVENTS
  // -------------------------
  if (path.includes("events")) {

    if (role !== "board") {
      alert("Kein Zugriff!");
      window.location.href = "/dashboard.html";
      return;
    }

    const dummyEvents = [
      { title: "Chorprobe", date: "10.05.2026" },
      { title: "Generalprobe", date: "15.05.2026" },
      { title: "Sommerkonzert", date: "01.06.2026" }
    ];

    const list = document.getElementById("eventList");

    if (list) {
      list.innerHTML = "";

      dummyEvents.forEach(ev => {
        const item = document.createElement("div");
        item.className = "p-4 mb-4 border rounded bg-gray-50 shadow";

        item.innerHTML = `
          <div class="text-xl font-bold">${ev.title}</div>
          <div class="text-gray-600 mb-2">📅 ${ev.date}</div>

          <button class="px-3 py-2 mr-2 bg-green-500 text-white rounded">
            ✅ Ich komme
          </button>

          <button class="px-3 py-2 bg-red-500 text-white rounded">
            ❌ Ich komme nicht
          </button>
        `;

        list.appendChild(item);
      });
    }

    const form = document.getElementById("eventForm");

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();

        const title = document.getElementById("title")?.value.trim();
        const date = document.getElementById("date")?.value.trim();

        const regex = /^\d{2}\.\d{2}\.\d{4}$/;

        if (!title) {
          alert("Bitte Titel eingeben");
          return;
        }

        if (!regex.test(date)) {
          alert("Bitte Datum im Format TT.MM.JJJJ eingeben");
          return;
        }

        alert(`Event gespeichert:\n${title} am ${date}`);
      };
    }
  }

  // -------------------------
  // 👤 PROFILE
  // -------------------------
  if (path.includes("profile")) {

    document.getElementById("email")?.textContent = user?.email || "";

    const profile = document.getElementById("profileData");
    if (profile) {
      profile.innerHTML += `<!-- Profil erweitern -->`;
    }
  }

  // -------------------------
  // 💳 SEPA
  // -------------------------
  if (path.includes("sepa")) {

    if (role !== "board") {
      alert("Nur Vorstand erlaubt");
      window.location.href = "/dashboard.html";
      return;
    }

    const sepa = document.getElementById("sepaContent");
    if (sepa) {
      sepa.innerHTML += `<!-- SEPA Inhalte -->`;
    }
  }
}

init();
