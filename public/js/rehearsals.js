import { getRehearsals, setRehearsalStatus } from "./api.js";
import { getRole } from "./roles.js";
import { supabase } from "./supabase.js";

async function createRehearsal() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;

  await supabase.from("rehearsals").insert({ title, date });

  location.reload();
}

function createCard(r) {
  const el = document.createElement("div");
  el.className = "bg-white p-4 rounded shadow";

  el.innerHTML = `
    <div class="font-bold text-lg">${r.title}</div>
    <div class="text-gray-500">${r.date}</div>
    <div class="mt-3">
      <button class="yes bg-cantus-success text-white px-3 py-1 rounded">✔</button>
      <button class="no bg-cantus-danger text-white px-3 py-1 rounded ml-2">✖</button>
    </div>
  `;

  el.querySelector(".yes").onclick = () => setRehearsalStatus(r.id, "yes");
  el.querySelector(".no").onclick = () => setRehearsalStatus(r.id, "no");

  return el;
}

async function init() {
  const role = await getRole();

  if (role === "board") {
    document.getElementById("admin-panel").classList.remove("hidden");
    document.getElementById("createBtn").onclick = createRehearsal;
  }

  const list = await getRehearsals();
  const cal = document.getElementById("calendar");

  list.forEach(r => cal.appendChild(createCard(r)));
}

init();
