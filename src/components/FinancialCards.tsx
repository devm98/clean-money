import { createClient } from "@/utils/supabase/server";
import { Wallet, ArrowDownCircle } from "lucide-react";

export default async function FinancialCards() {
  const supabase = await createClient();

  // 1. Lấy thông tin User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 2. Tính tổng số dư ví
  const { data: wallets } = await supabase
    .from("wallets")
    .select("balance")
    .eq("user_id", user.id);

  const totalBalance =
    wallets?.reduce((acc, curr) => acc + Number(curr.balance), 0) || 0;

  // 3. Tính tổng chi tiêu tháng này
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: monthlyExpenses } = await supabase
    .from("transactions")
    .select(
      `
      amount,
      categories!inner(type)
    `
    )
    .eq("user_id", user.id)
    .eq("categories.type", "expense")
    .gte("date", startOfMonth.toISOString());

  const totalSpent =
    monthlyExpenses?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Card: Số dư ví */}
      <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
          <Wallet className="w-4 h-4" />
          <span>Tổng số dư</span>
        </div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {totalBalance.toLocaleString("vi-VN")}{" "}
          <span className="text-sm font-normal">₫</span>
        </div>
      </div>

      {/* Card: Chi tiêu tháng này */}
      <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
          <ArrowDownCircle className="w-4 h-4 text-red-500" />
          <span>Chi tiêu tháng này</span>
        </div>
        <div className="text-2xl font-bold text-red-500">
          -{totalSpent.toLocaleString("vi-VN")}{" "}
          <span className="text-sm font-normal text-zinc-900 dark:text-zinc-50">
            ₫
          </span>
        </div>
      </div>
    </div>
  );
}
