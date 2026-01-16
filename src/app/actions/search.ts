"use server";

import { model } from "../lib/gemini";
import { createClient } from "@/utils/supabase/server";

export async function smartSearch(query: string) {
  try {
    const supabase = await createClient();
    const today = new Date("2026-01-16"); // Cung cấp ngữ cảnh thời gian hiện tại cho AI

    const prompt = `
      Bạn là trợ lý dữ liệu. Dựa trên câu hỏi: "${query}", hãy trích xuất các bộ lọc sau dưới dạng JSON:
      - startDate: (string, ISO format)
      - endDate: (string, ISO format)
      - category_name: (string hoặc null)
      - searchTerm: (string hoặc null, dùng để tìm trong ghi chú/note)
      - type: ('expense' | 'income' | null)

      Ngữ cảnh: Hôm nay là ${today.toISOString()}. "Tháng trước" nghĩa là từ 01/12/2025 đến 31/12/2025.
      Chỉ trả về JSON thuần.
    `;

    const result = await model.generateContent(prompt);
    const filters = JSON.parse(
      result.response.text().replace(/```json|```/g, "")
    );

    // Thực hiện truy vấn Supabase với các filter từ AI
    let dbQuery = supabase
      .from("transactions")
      .select("*, categories!inner(*)")
      .order("date", { ascending: false });

    if (filters.startDate) dbQuery = dbQuery.gte("date", filters.startDate);
    if (filters.endDate) dbQuery = dbQuery.lte("date", filters.endDate);
    if (filters.category_name)
      dbQuery = dbQuery.ilike("categories.name", `%${filters.category_name}%`);
    if (filters.searchTerm)
      dbQuery = dbQuery.ilike("note", `%${filters.searchTerm}%`);
    if (filters.type) dbQuery = dbQuery.eq("categories.type", filters.type);

    const { data, error } = await dbQuery;

    // Tính tổng số tiền ngay tại đây để AI trả lời
    const total =
      data?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

    return {
      success: true,
      data,
      summary: `Bạn đã chi ${total.toLocaleString()}đ cho yêu cầu này.`,
      filters, // Trả về để debug nếu cần
    };
  } catch (error) {
    return { success: false, error: "Không tìm thấy kết quả phù hợp" };
  }
}
