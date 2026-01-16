import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default async function TransactionList() {
  const supabase = await createClient();

  const { data: transactions } = await supabase
    .from("transactions")
    .select(
      `
      id,
      amount,
      note,
      date,
      categories (
        name,
        icon,
        type
      )
    `
    )
    .order("date", { ascending: false })
    .limit(15);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Giao dịch gần đây
        </h3>
      </div>

      <div className="grid gap-2">
        {transactions?.map((t) => {
          const category = Array.isArray(t.categories)
            ? t.categories[0]
            : t.categories;
          const isIncome = category?.type === "income";

          return (
            <div
              key={t.id}
              className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xs hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                {/* Icon Category với nền màu tương ứng */}
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl  ${
                    isIncome
                      ? "bg-emerald-50 dark:bg-emerald-500/10"
                      : "bg-zinc-50 dark:bg-zinc-800"
                  }`}
                >
                  {category?.icon || "💰"}
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50 truncate max-w-45 md:max-w-xs">
                    {t.note}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-sm font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                      {category?.name}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      {format(new Date(t.date), "HH:mm • dd/MM")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Số tiền với màu sắc phân biệt */}
              <div className="flex flex-col items-end">
                <div
                  className={`flex items-center gap-1 text-sm md:text-lg font-bold shrink-0 ml-2 ${
                    isIncome ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {isIncome ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4" />
                  )}
                  <span>
                    {isIncome ? "+" : "-"}
                    {t.amount.toLocaleString("vi-VN")}
                  </span>
                  <span className="text-xs font-medium ml-0.5">đ</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
