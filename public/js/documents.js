import { supabase } from "./supabase.js";

async function loadFiles(bucket) {
  const { data } = await supabase.storage.from(bucket).list();
  const container = document.getElementById("files");

  container.innerHTML = "";

  data.forEach(f => {
    const btn = document.createElement("button");
    btn.textContent = f.name;
    btn.className = "block p-2 border w-full text-left";

    btn.onclick = async () => {
      const { data } = supabase.storage.from(bucket).getPublicUrl(f.name);
      document.getElementById("viewer").src = data.publicUrl;
    };

    container.appendChild(btn);
  });
}

document.querySelectorAll(".cat").forEach(btn => {
  btn.onclick = () => loadFiles(btn.dataset.bucket);
});
