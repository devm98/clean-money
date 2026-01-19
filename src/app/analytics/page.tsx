import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { startOfMonth, endOfMonth, parse, format } from "date-fns";
import SpendingAnalytics from "@/components/SpendingAnalytics";
import AIInsights from "@/components/AIInsights";
import MonthPicker from "@/components/MonthPicker";

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const currentMonth = params.month || format(new Date(), "yyyy-MM");
  const referenceDate = parse(currentMonth, "yyyy-MM", new Date());

  const start = startOfMonth(referenceDate).toISOString();
  const end = endOfMonth(referenceDate).toISOString();

  const { data: monthTransactions } = await supabase
    .from("transactions")
    .select("*, categories(*)")
    .gte("date", start)
    .lte("date", end)
    .order("date", { ascending: false });

  return (
    <main className="max-w-2xl mx-auto p-6 pb-24 space-y-8">
      <header className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Phân tích chi tiêu
          </h1>
          <p className="text-zinc-500 text-sm italic">
            Dữ liệu dựa trên các giao dịch đã ghi nhận
          </p>
        </div>

        <MonthPicker />
      </header>

      <Suspense
        key={`insights-${currentMonth}`}
        fallback={<div className="h-32 bg-zinc-50 animate-pulse rounded-3xl" />}
      >
        <AIInsights transactions={monthTransactions || []} />
      </Suspense>

      <div className="space-y-6">
        <Suspense
          fallback={
            <div className="h-75 w-full bg-zinc-100 animate-pulse rounded-3xl" />
          }
        >
          <SpendingAnalytics transactions={monthTransactions || []} />
        </Suspense>
      </div>
    </main>
  );
}
