import { supabase } from "@/lib/supabase";

export const getDashboardStats = async () => {
  try {
    const { count: notesCount } = await supabase
      .from("notes")
      .select("*", {
        count: "exact",
        head: true,
      });

    const { count: subjectsCount } = await supabase
      .from("subjects")
      .select("*", {
        count: "exact",
        head: true,
      });

    return {
      notes: notesCount || 0,
      subjects: subjectsCount || 0,
      progress:
        Math.min(
          100,
          ((notesCount || 0) * 10) +
            ((subjectsCount || 0) * 5)
        ) || 0,
    };
  } catch (error) {
    console.log(error);

    return {
      notes: 0,
      subjects: 0,
      progress: 0,
    };
  }
};