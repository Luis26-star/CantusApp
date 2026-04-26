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

  console.log("User:", user.email);
  console.log("Role:", role);

  // -------------------------
  // 🏠 DASHBOARD
  // -------------------------
  if (path.includes("dashboard")) {

    document.getElementById("userEmail")?.textContent = user.email;
    document.getElementById("role")?.textContent = role;

    if (role === "board") {
      document.getElementById("adminSection")?.classList.remove("hidden");
    }

    // 🔧 CUSTOM: Dashboard Logik
    // 👉 hier kannst du eigene Funktionen starten

    // 🔧 CUSTOM HTML: Inhalte dynamisch einfügen
    const custom = document.getElementById("customDashboard");
    if (custom) {
      custom.innerHTML += `
        <!-- 👉 HIER kannst du später HTML erweitern -->
      `;
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

    // 🔧 CUSTOM: Events laden

    // 🔧 CUSTOM HTML
    const eventList = document.getElementById("eventList");
    if (eventList) {
      eventList.innerHTML += `
        <!-- 👉 HIER kommen später Events rein -->
      `;
    }
  }

  // -------------------------
  // 👤 PROFILE
  // -------------------------
  if (path.includes("profile")) {

    document.getElementById("email")?.textContent = user.email;

    // 🔧 CUSTOM HTML
    const profile = document.getElementById("profileData");
    if (profile) {
      profile.innerHTML += `
        <!-- 👉 HIER Profilfelder ergänzen -->
      `;
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

    // 🔧 CUSTOM HTML
    const sepa = document.getElementById("sepaContent");
    if (sepa) {
      sepa.innerHTML += `
        <!-- 👉 HIER SEPA-Formulare einfügen -->
      `;
    }
  }

}

init();
