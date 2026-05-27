import { supabase } from "@/lib/supabase";

export const createConversation = async (
  userId: string,
  title: string
) => {
  const { data, error } = await supabase
    .from("ai_conversations")
    .insert({
      user_id: userId,
      title,
    })
    .select()
    .single();

  if (error) {
    console.log(
      "CREATE CONVERSATION ERROR:",
      error
    );

    return null;
  }

  return data;
};

export const fetchConversations =
  async (userId: string) => {
    const { data, error } =
      await supabase
        .from("ai_conversations")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.log(
        "FETCH CONVERSATIONS ERROR:",
        error
      );

      return [];
    }

    return data;
  };

export const deleteConversation =
  async (conversationId: string) => {
    const { error } = await supabase
      .from("ai_conversations")
      .delete()
      .eq("id", conversationId);

    if (error) {
      console.log(
        "DELETE CONVERSATION ERROR:",
        error
      );
    }
  };