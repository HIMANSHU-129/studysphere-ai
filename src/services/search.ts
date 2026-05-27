import { supabase } from "@/lib/supabase";

export const searchDashboard =
  async (query: string) => {
    if (!query.trim()) {
      return {
        notes: [],
        subjects: [],
      };
    }

    try {
      const { data: notes } =
        await supabase
          .from("notes")
          .select("*")
          .ilike(
            "title",
            `%${query}%`
          )
          .limit(5);

      const { data: subjects } =
        await supabase
          .from("subjects")
          .select("*")
          .ilike(
            "name",
            `%${query}%`
          )
          .limit(5);

      return {
        notes: notes || [],
        subjects: subjects || [],
      };
    } catch (error) {
      console.log(error);

      return {
        notes: [],
        subjects: [],
      };
    }
  };