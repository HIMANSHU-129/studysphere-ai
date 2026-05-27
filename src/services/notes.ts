import { supabase } from "@/lib/supabase";

import { Note } from "@/src/types/note";

export async function createNote(
  title: string,
  content: string,
  subjectId: string | null
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        title,
        content,
        user_id: user.id,
        subject_id: subjectId,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function fetchNotes(): Promise<
  Note[]
> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
}

export async function deleteNote(
  id: string
) {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id);

  if (error) throw error;
}