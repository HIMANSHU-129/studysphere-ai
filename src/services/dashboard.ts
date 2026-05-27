import { supabase } from "@/lib/supabase";

export async function getDashboardStats() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { count: notesCount } =
    await supabase
      .from("notes")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

  const { count: subjectsCount } =
    await supabase
      .from("subjects")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

  const { data: recentNotes } =
    await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

  return {
    notesCount: notesCount || 0,
    subjectsCount:
      subjectsCount || 0,
    recentNotes:
      recentNotes || [],
  };
}