import { supabase } from "@/lib/supabase";

import { ChatMessage } from "@/src/types/chat";

export const saveChatMessage = async (
  userId: string,
  conversationId: string,
  chat: ChatMessage
) => {
  const { error } = await supabase
    .from("ai_chats")
    .insert({
      user_id: userId,
      conversation_id: conversationId,
      role: chat.role,
      message: chat.message,
    });

  if (error) {
    console.log("SAVE CHAT ERROR:", error);
  }
};

export const fetchChatMessages =
  async (conversationId: string) => {
    const { data, error } =
      await supabase
        .from("ai_chats")
        .select("*")
        .eq(
          "conversation_id",
          conversationId
        )
        .order("created_at", {
          ascending: true,
        });

    if (error) {
      console.log(
        "FETCH CHAT ERROR:",
        error
      );

      return [];
    }

    return data.map((item) => ({
      role: item.role,
      message: item.message,
    }));
  };

export const clearChatMessages =
  async (conversationId: string) => {
    const { error } = await supabase
      .from("ai_chats")
      .delete()
      .eq(
        "conversation_id",
        conversationId
      );

    if (error) {
      console.log(
        "DELETE CHAT ERROR:",
        error
      );
    }
  };