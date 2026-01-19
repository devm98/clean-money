"use client";

import { useEffect, useState } from "react";
import { getAIInsights } from "@/app/actions/ai-analytics";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";

export default function AIInsights({ transactions }: { transactions: any[] }) {
  const [insights, setInsights] = useState<any[]>([]);

  useEffect(() => {
    const summary = transactions.reduce((acc: any, t) => {
      const cat = t.categories?.name || "Khác";
      acc[cat] = (acc[cat] || 0) + t.amount;
      return acc;
    }, {});

    getAIInsights(Object.entries(summary)).then((res) => {
      if (res.success) setInsights(res.data);
    });
  }, [transactions]);

  const getIcon = (type: string) => {
    if (type === "trend") return <TrendingUp className="text-blue-500" />;
    if (type === "prediction") return <Sparkles className="text-purple-500" />;
    return <AlertCircle className="text-rose-500" />;
  };

  return (
    <div className="grid gap-4">
      {insights.map((insight, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm"
        >
          <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
            {getIcon(insight.type)}
          </div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {insight.text}
          </p>
        </div>
      ))}
    </div>
  );
}
