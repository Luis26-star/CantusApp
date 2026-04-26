import { supabase } from "./supabase.js";

// 🔧 Projekte laden
export async function loadProjectsUI() {
  const container = document.getElementById("projectList");

  if (!container) return;

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Fehler beim Laden:", error);
    container.innerHTML = "Fehler beim Laden der Projekte";
    return;
  }

  container.innerHTML = "";

  projects.forEach(p => {
    const el = document.createElement("div");
    el.className = "p-4 bg-gray-50 border rounded";

    el.innerHTML = `
      <div class="font-bold text-xl">${p.title}</div>
      <div>Status: ${p.status || "-"}</div>
      <div>Start: ${p.start_date || "-"}</div>
      <div>Ende: ${p.end_date || "-"}</div>
    `;

    container.appendChild(el);
  });
}
