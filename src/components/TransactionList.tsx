"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { getFilteredTransactions } from "@/app/actions/transaction";
import SearchFilters from "./SearchFilters";

export default function TransactionList({
  initialData,
  categories,
}: {
  initialData: any[];
  categories: any[];
}) {
  const [displayData, setDisplayData] = useState(initialData);
  const [isSearching, setIsSearching] = useState(false);

  const handleFilter = async (filters: any) => {
    setIsSearching(true);
    const res = await getFilteredTransactions(filters);
    if (res.success) setDisplayData(res.data);
    setIsSearching(false);
  };

  return (
    <div className="space-y-6">
      <div className="px-2">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Giao dịch
          </h3>
          {isSearching && (
            <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
          )}
        </div>

        <SearchFilters categories={categories} onFilter={handleFilter} />
      </div>

      <div className="grid gap-2">
        {displayData.length > 0 ? (
          displayData.map((t) => {
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
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl  ${
                      isIncome
                        ? "bg-emerald-50 dark:bg-emerald-500/10"
                        : "bg-zinc-50 dark:bg-zinc-800"
                    }`}
                  >
                    {category?.icon || "💰"}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50 truncate max-w-45 md:max-w-xs text-sm md:text-base">
                      {t.note}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 whitespace-nowrap">
                        {category?.name}
                      </span>
                      <span className="text-[10px] md:text-xs text-zinc-400 font-medium whitespace-nowrap">
                        {format(new Date(t.date), "HH:mm • dd/MM")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 ml-2">
                  <div
                    className={`flex items-center gap-1 text-sm md:text-lg font-bold ${
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
                    <span className="text-[10px] md:text-xs font-medium ml-0.5">
                      đ
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center text-zinc-500 text-sm italic bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
            Không tìm thấy dữ liệu phù hợp...
          </div>
        )}
      </div>
    </div>
  );
}
