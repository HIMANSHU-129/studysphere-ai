import { supabase } from "@/lib/supabase";

export const getRecentNotes =
  async () => {
    try {
      const { data, error } =
        await supabase
          .from("notes")
          .select("*")
          .order("created_at", {
            ascending: false,
          })
          .limit(5);

      if (error) {
        console.log(error);

        return [];
      }

      return data || [];
    } catch (error) {
      console.log(error);

      return [];
    }
  };