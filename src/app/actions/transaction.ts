"use server";
import { createClient } from "@/utils/supabase/server";
import { model } from "../lib/gemini";
import { revalidatePath } from "next/cache";

export async function processAndSaveTransaction(
  text: string,
  formData?: FormData,
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Unauthorized" };

    let aiResponse;
    const file = formData?.get("file") as File;

    // --- BƯỚC 1: GỬI DỮ LIỆU CHO AI ---
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const prompt = `
        Đây là ảnh hóa đơn hoặc danh sách đơn hàng.
        Hãy phân tích và trả về một MẢNG JSON các giao dịch.
        Mỗi phần tử gồm:
        - amount: (number) Tổng số tiền thực thanh toán, chỉ lấy số.
        - category_name: (string) Tên danh mục phù hợp (ví dụ: Ăn uống, Mua sắm, Điện tử).
        - note: (string) Tên sản phẩm hoặc cửa hàng.
        - type: (string) 'expense' hoặc 'income'.
        Chỉ trả về JSON thuần, không kèm dấu backticks hay Markdown.
      `;

      const result = await model.generateContent([
        prompt,
        {
          inlineData: { data: buffer.toString("base64"), mimeType: file.type },
        },
      ]);
      aiResponse = JSON.parse(result.response.text());
    } else {
      const prompt = `
      Phân tích chi tiêu: "${text}".
      Trả về JSON:
      {
        "amount": number,
        "category_name": string,
        "type": "income" | "expense",
        "note": string
      }
    `;
      const result = await model.generateContent(prompt);
      aiResponse = JSON.parse(result.response.text());
    }

    // Đảm bảo aiResponse luôn là một mảng để dễ xử lý loop
    const transactionsToSave = Array.isArray(aiResponse)
      ? aiResponse
      : [aiResponse];

    // --- BƯỚC 2: VALIDATION & LƯU DB ---
    const results = [];
    let hasHugeIncome = false;

    for (const item of transactionsToSave) {
      // Làm sạch số tiền: xóa mọi ký tự không phải số, ép về kiểu Number
      // Đây là bước quan trọng nhất để tránh lỗi 23502
      const rawAmount = item.amount?.toString().replace(/[^0-9]/g, "") || "0";
      const finalAmount = parseInt(rawAmount, 10);

      if (finalAmount <= 0) continue; // Bỏ qua nếu không có số tiền

      // 1. Tìm hoặc tạo Category
      let { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("name", item.category_name)
        .single();

      if (!category) {
        const { data: newCat } = await supabase
          .from("categories")
          .insert({
            name: item.category_name,
            type: item.type || "expense",
            icon: "📦",
          })
          .select()
          .single();
        category = newCat;
      }

      // 2. Lấy ví mặc định (Tiền mặt)
      const { data: wallet } = await supabase
        .from("wallets")
        .select("id")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (!wallet) continue;

      // 3. Insert Giao dịch
      const { error: insertError } = await supabase
        .from("transactions")
        .insert({
          user_id: user.id,
          amount: finalAmount,
          category_id: category?.id,
          wallet_id: wallet.id,
          note: item.note || "Giao dịch AI",
          date: new Date().toISOString(),
        });

      if (!insertError) {
        results.push(item);
        if (item.type === "income" && finalAmount >= 10000000)
          hasHugeIncome = true;
      }
    }

    revalidatePath("/");
    return {
      success: results.length > 0,
      count: results.length,
      isHugeIncome: hasHugeIncome,
    };
  } catch (error) {
    console.error("Critical Action Error:", error);
    return { success: false, error: "Lỗi hệ thống khi xử lý AI" };
  }
}

export async function getFilteredTransactions(filters: {
  text?: string;
  categoryId?: string;
  type?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("transactions")
    .select("*, categories!inner(*)")
    .order("date", { ascending: false });

  // Logic lọc động
  if (filters.text) {
    query = query.ilike("note", `%${filters.text}%`);
  }

  if (filters.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }

  if (filters.type) {
    query = query.eq("categories.type", filters.type);
  }

  const { data, error } = await query.limit(50);

  return { success: !error, data: data || [] };
}
