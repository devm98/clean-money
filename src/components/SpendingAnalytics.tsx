"use client";

import { useMemo } from "react";
import { SpendingPieChart, SpendingLineChart } from "./SpendingCharts";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  parseISO,
} from "date-fns";

interface Props {
  transactions: any[];
}

export default function SpendingAnalytics({ transactions }: Props) {
  const pieData = useMemo(() => {
    const categoryMap: Record<string, number> = {};

    transactions.forEach((t) => {
      const category = Array.isArray(t.categories)
        ? t.categories[0]
        : t.categories;
      if (category?.type === "expense") {
        const catName = category.name;
        categoryMap[catName] = (categoryMap[catName] || 0) + Number(t.amount);
      }
    });

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const lineData = useMemo(() => {
    if (transactions.length === 0) return [];

    const refDate = parseISO(transactions[0]?.date || new Date().toISOString());
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(refDate),
      end: endOfMonth(refDate),
    });

    return daysInMonth.map((day) => {
      const dayStr = format(day, "yyyy-MM-dd");
      const dayTotal = transactions
        .filter((t) => t.date.startsWith(dayStr))
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

      return {
        name: format(day, "dd/MM"),
        spent: dayTotal,
      };
    });
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200">
        Không có dữ liệu chi tiêu trong tháng này.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SpendingPieChart data={pieData} />
      <SpendingLineChart data={lineData} />
    </div>
  );
}
