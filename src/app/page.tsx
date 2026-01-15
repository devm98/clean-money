import { Suspense } from "react";
import AIInput from "@/components/AIInput";
import TransactionList from "@/components/TransactionList";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-black px-6 py-12">
      <main className="w-full max-w-2xl flex flex-col gap-10">
        {/* Header Section */}
        <header className="space-y-2">
          <h2 className="text-zinc-500 font-medium">Chào Minh,</h2>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Hôm nay bạn chi tiêu gì?
          </h1>
        </header>

        {/* AI Input Section - Thanh nhập liệu "chill" */}
        <section>
          <AIInput />
        </section>

        {/* Transactions Section - Danh sách giao dịch */}
        <section className="flex flex-col gap-4">
          <Suspense fallback={<TransactionListSkeleton />}>
            <TransactionList />
          </Suspense>
        </section>
      </main>
    </div>
  );
}

// Loading state cho danh sách
function TransactionListSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-20 w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl"
        />
      ))}
    </div>
  );
}
