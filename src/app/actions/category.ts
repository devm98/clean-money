"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function upsertCategory(data: {
  id?: string;
  name: string;
  icon: string;
  type: "expense" | "income";
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  console.log("Dữ liệu gửi lên Supabase:", data); // Kiểm tra xem id có bị undefined không

  const { error, data: result } = await supabase
    .from("categories")
    .upsert({
      ...(data.id && { id: data.id }),
      name: data.name,
      icon: data.icon,
      type: data.type,
      user_id: user.id,
    })
    .select(); // Thêm .select() để trả về dữ liệu sau khi update

  if (error) {
    console.error(
      "Supabase Error Detail:",
      error.message,
      error.details,
      error.hint,
    );
    return { success: false, error: error.message };
  }

  revalidatePath("/categories");
  return { success: true, data: result };
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  console.log("error", error);
  if (!error) revalidatePath("/categories");
  return { success: !error, error };
}
