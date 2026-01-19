"use server";

import { startOfWeek, subWeeks } from "date-fns";
import { model } from "../lib/gemini";

export async function getAIInsights(spendingData: any[]) {
  try {
    const prompt = `
      Dựa trên dữ liệu chi tiêu tháng này: ${JSON.stringify(spendingData)}
      Hãy phân tích và trả về 3 ý chính (dưới 20 từ mỗi ý):
      1. Xu hướng chính (Bạn đang tiêu nhiều vào đâu?).
      2. Dự báo (Với tốc độ này, cuối tháng sẽ tiêu bao nhiêu?).
      3. Cảnh báo (Có khoản nào bất thường không?).
      Trả về định dạng JSON: { "insights": [{ "type": "trend" | "prediction" | "warning", "text": string }] }
    `;

    const result = await model.generateContent(prompt);
    const response = JSON.parse(result.response.text());
    return { success: true, data: response.insights };
  } catch (error) {
    console.log(error);
    return { success: false, error: "AI đang bận phân tích..." };
  }
}

export async function getEnhancedAIInsights(transactions: any[]) {
  try {
    const now = new Date();
    const thisWeekStart = startOfWeek(now);
    const lastWeekStart = startOfWeek(subWeeks(now, 1));

    // Phân loại dữ liệu theo tuần
    const thisWeekData = transactions.filter(
      (t) => new Date(t.date) >= thisWeekStart,
    );
    const lastWeekData = transactions.filter((t) => {
      const d = new Date(t.date);
      return d >= lastWeekStart && d < thisWeekStart;
    });

    const prompt = `
      Bạn là một trợ lý tài chính cá nhân. Dựa trên dữ liệu chi tiêu:
      - Tuần này: ${JSON.stringify(thisWeekData)}
      - Tuần trước: ${JSON.stringify(lastWeekData)}

      Hãy phân tích và trả về JSON với 3 nhận xét:
      1. So sánh tổng chi tiêu giữa 2 tuần.
      2. Cảnh báo nếu có hạng mục nào tăng đột biến (ví dụ: tuần trước ăn uống 500k, tuần này đã 1tr).
      3. Dự báo mức chi tiêu cho tuần tới.

      Yêu cầu:
      - Ngôn ngữ: Tiếng Việt, súc tích (dưới 15 từ/câu).
      - Định dạng: { "insights": [{ "type": "trend" | "prediction" | "warning", "text": string }] }
    `;

    const result = await model.generateContent(prompt);
    const response = JSON.parse(
      result.response.text().replace(/```json|```/g, ""),
    );
    return { success: true, data: response.insights };
  } catch (error) {
    return { success: false, error: "AI đang phân tích..." };
  }
}
