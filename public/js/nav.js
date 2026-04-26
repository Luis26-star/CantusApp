import { getRole } from "./roles.js";
import { logout } from "./auth.js";

async function initNav() {
  const res = await fetch("/partials/nav.html");
  document.getElementById("nav").innerHTML = await res.text();

  document.getElementById("logoutBtn")
    ?.addEventListener("click", logout);

  const role = await getRole();
  if (role) {
    const el = document.getElementById("role");
    if (el) {
      el.textContent = role === "board" ? "Vorstand" : "Mitglied";
    }
  }
}

initNav();
