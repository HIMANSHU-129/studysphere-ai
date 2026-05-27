import { supabase } from "@/lib/supabase";

import { Subject } from "@/src/types/subject";


export async function createSubject(
  name: string,
  color: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("subjects")
    .insert([
      {
        name,
        color,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function fetchSubjects(): Promise<
  Subject[]
> {
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
}

export async function deleteSubject(
  id: string
) {
  const { error } = await supabase
    .from("subjects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}