"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight, Sparkles, X } from "lucide-react";
import AISearch from "./AISearch";

export default function TransactionList({
  initialData,
}: {
  initialData: any[];
}) {
  // 1. State quản lý kết quả tìm kiếm
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  // Dữ liệu thực tế: Ưu tiên kết quả tìm kiếm, nếu không có thì dùng data gốc
  const displayData = searchResults || initialData;

  const handleSearchResults = (res: any) => {
    if (res.success) {
      setSearchResults(res.data);
      setSummary(res.summary);
    } else {
      setSearchResults(null);
      setSummary(null);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setSummary(null);
  };

  return (
    <div className="space-y-6">
      {/* KHU VỰC TÌM KIẾM */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {searchResults ? "Kết quả tìm kiếm" : "Giao dịch gần đây"}
          </h3>
          {searchResults && (
            <button
              onClick={clearSearch}
              className="text-xs font-semibold text-purple-600 flex items-center gap-1 hover:underline"
            >
              <X className="w-3 h-3" /> Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Tích hợp AISearch vào đây */}
        <AISearch onResults={handleSearchResults} />
      </div>

      {/* HIỂN THỊ TÓM TẮT CỦA AI */}
      {summary && (
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-5 h-5 text-purple-500 shrink-0" />
          <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
            {summary}
          </p>
        </div>
      )}

      {/* DANH SÁCH HIỂN THỊ */}
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
