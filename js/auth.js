async function sendMagicLink() {
  const email = document.getElementById("email").value;
  const status = document.getElementById("status");
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) {
    status.textContent = "Fehler: " + error.message;
  } else {
    status.textContent = "Login-Link wurde gesendet.";
  }
}
async function checkAuth() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "login.html";
  }
}
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}
async function getRole() {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  return data?.role;
}
