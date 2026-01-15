import AIInput from "@/components/AIInput";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <main className="w-full max-w-4xl flex flex-col gap-12 text-center sm:text-left">
        <header className="space-y-2">
          <h2 className="text-zinc-500 font-medium">Chào Minh,</h2>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Hôm nay bạn đã chi tiêu gì?
          </h1>
        </header>

        {/* Input chính của App */}
        <AIInput />

        {/* Khu vực danh sách giao dịch gần đây sẽ ở đây */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50 pointer-events-none">
          <div className="h-32 bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 rounded-xl flex items-center justify-center">
            Recent Activity placeholder
          </div>
          <div className="h-32 bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 rounded-xl flex items-center justify-center">
            Budget Analytics placeholder
          </div>
        </section>
      </main>
    </div>
  );
}
