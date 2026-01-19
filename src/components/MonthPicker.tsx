"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { format, addMonths } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MonthPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentMonthParam =
    searchParams.get("month") || format(new Date(), "yyyy-MM");
  const selectedDate = new Date(`${currentMonthParam}-01`);

  const changeMonth = (offset: number) => {
    const newDate = addMonths(selectedDate, offset);
    const newParam = format(newDate, "yyyy-MM");
    router.push(`/analytics?month=${newParam}`);
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
      <button
        onClick={() => changeMonth(-1)}
        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-zinc-400 block leading-none">
          {format(selectedDate, "yyyy")}
        </span>
        <span className="text-lg font-black text-zinc-900 dark:text-zinc-50 capitalize">
          Tháng {format(selectedDate, "MM", { locale: vi })}
        </span>
      </div>

      <button
        onClick={() => changeMonth(1)}
        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
