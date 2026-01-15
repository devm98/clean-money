"use server";
import { createClient } from "@/utils/supabase/server";
import { model } from "../lib/gemini";
import { revalidatePath } from "next/cache";

export async function processAndSaveTransaction(userInput: string) {
  const supabase = await createClient();
  try {
    // 1. Lấy thông tin User hiện tại (Giả định bạn đã setup Auth)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Chưa đăng nhập");

    // 2. AI bóc tách dữ liệu theo Schema
    const prompt = `
      Phân tích chi tiêu: "${userInput}".
      Trả về JSON:
      {
        "amount": number,
        "category_name": string,
        "type": "income" | "expense",
        "note": string
      }
    `;

    const aiResult = await model.generateContent(prompt);
    const parsedData = JSON.parse(aiResult.response.text());

    // 3. Xử lý Category (Tìm hoặc tạo mới)
    let { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("name", parsedData.category_name)
      .eq("type", parsedData.type)
      .single();

    if (!category) {
      const { data: newCat } = await supabase
        .from("categories")
        .insert({
          name: parsedData.category_name,
          type: parsedData.type,
          icon: "💰",
        })
        .select()
        .single();
      category = newCat;
    }

    // 4. Lấy Ví mặc định (Ví đầu tiên của user)
    let { data: wallet } = await supabase
      .from("wallets")
      .select("id")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    // Nếu chưa có ví, tạo một ví "Tiền mặt" mặc định
    if (!wallet) {
      const { data: newWallet } = await supabase
        .from("wallets")
        .insert({ user_id: user.id, name: "Tiền mặt", balance: 0 })
        .select()
        .single();
      wallet = newWallet;
    }

    // 5. Lưu Giao dịch vào DB theo đúng Schema của bạn
    const { error: insertError } = await supabase.from("transactions").insert({
      user_id: user.id,
      wallet_id: wallet?.id,
      category_id: category?.id,
      amount: parsedData.amount,
      note: parsedData.note,
      metadata: { ai_raw: userInput, confidence: "high" },
    });

    if (insertError) throw insertError;

    revalidatePath("/");
    return { success: true, message: "Đã ghi nhận giao dịch!" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Có lỗi xảy ra khi xử lý AI." };
  }
}
