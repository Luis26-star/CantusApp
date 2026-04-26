import { supabase } from "./supabase.js";
import { getUser } from "./auth.js";

/**
 * Alle Proben laden
 */
export async function getRehearsals() {
  try {
    const { data, error } = await supabase
      .from("rehearsals")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Fehler bei getRehearsals:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error in getRehearsals:", err);
    return [];
  }
}

/**
 * Teilnahme-Status setzen (z. B. "yes", "no", "maybe")
 */
export async function setRehearsalStatus(rehearsalId, status) {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("User nicht eingeloggt");
    }

    const { data, error } = await supabase
      .from("rehearsal_members")
      .upsert(
        {
          rehearsal_id: rehearsalId,
          member_id: user.id,
          status: status
        },
        {
          onConflict: "rehearsal_id,member_id" // verhindert Duplikate
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Fehler bei setRehearsalStatus:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error in setRehearsalStatus:", err);
    return null;
  }
}
