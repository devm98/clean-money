import { Suspense } from "react";
import AIInput from "@/components/AIInput";
import TransactionList from "@/components/TransactionList";
import FinancialCards from "@/components/FinancialCards";
import MoodWrapper from "@/components/MoodWrapper"; // Import Wrapper mới

export default function Home() {
  return (
    <MoodWrapper>
      <div className="flex flex-col items-center px-6 py-12">
        <main className="w-full max-w-2xl flex flex-col gap-8">
          <header className="space-y-1">
            <h2 className="text-zinc-500 font-medium">Chào Minh,</h2>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Hôm nay bạn chi tiêu gì?
            </h1>
          </header>

          <AIInput />

          <Suspense
            fallback={
              <div className="h-32 w-full bg-zinc-100 animate-pulse rounded-3xl" />
            }
          >
            <FinancialCards />
          </Suspense>

          <section className="flex flex-col gap-4 mt-4">
            <Suspense
              fallback={
                <div className="h-20 w-full bg-white animate-pulse rounded-2xl" />
              }
            >
              <TransactionList />
            </Suspense>
          </section>
        </main>
      </div>
    </MoodWrapper>
  );
}
