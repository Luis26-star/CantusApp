const role = await getRole();
if (role !== "admin") {
  document.getElementById("admin-section").style.display = "none";
}
