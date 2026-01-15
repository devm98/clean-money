import { createClient } from "@/utils/supabase/server";
import { SpendingPieChart, SpendingLineChart } from "./SpendingCharts";

export default async function SpendingAnalytics() {
  const supabase = await createClient();

  // 1. Lấy dữ liệu 30 ngày gần đây
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: transactions } = await supabase
    .from("transactions")
    .select(
      `
      amount,
      date,
      categories!inner(name, type)
    `
    )
    .eq("categories.type", "expense")
    .gte("date", thirtyDaysAgo.toISOString());

  if (!transactions) return null;

  // 2. Xử lý dữ liệu cho Pie Chart (Theo Category)
  const categoryMap: Record<string, number> = {};
  transactions.forEach((t) => {
    const catName = Array.isArray(t.categories)
      ? t.categories[0].name
      : t.categories.name;
    categoryMap[catName] = (categoryMap[catName] || 0) + Number(t.amount);
  });
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  // 3. Xử lý dữ liệu cho Line Chart (Theo Ngày - 7 ngày gần nhất)
  const last7Days = [...Array(7)]
    .map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    })
    .reverse();

  const lineData = last7Days.map((date) => {
    const dayTotal = transactions
      .filter((t) => t.date.startsWith(date))
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
    return { name: date.split("-").slice(2).join("/"), spent: dayTotal };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SpendingPieChart data={pieData} />
      <SpendingLineChart data={lineData} />
    </div>
  );
}
