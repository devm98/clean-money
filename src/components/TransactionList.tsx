import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";

interface TransactionWithCategory {
  id: string;
  amount: number;
  note: string;
  date: string;
  categories:
    | {
        name: string;
        icon: string;
      }
    | { name: string; icon: string }[]; // Chấp nhận cả object và array
}

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
      categories (name, icon)
    `
    )
    .order("date", { ascending: false })
    .limit(10);

  console.log({ transactions });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Giao dịch gần đây
      </h3>
      <div className="grid gap-3">
        {transactions?.map((t: TransactionWithCategory) => (
          <div
            key={t.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl">
                {Array.isArray(t.categories)
                  ? t.categories[0]?.icon
                  : t.categories.icon || "💰"}
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {t.note ||
                    (Array.isArray(t.categories)
                      ? t.categories[0]?.name
                      : t.categories.name)}
                </p>
                <p className="text-xs text-zinc-500">
                  {format(new Date(t.date), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
            </div>
            <div
              className={`font-bold ${
                t.amount < 0 ? "text-red-500" : "text-emerald-500"
              }`}
            >
              {t.amount.toLocaleString("vi-VN")} đ
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
