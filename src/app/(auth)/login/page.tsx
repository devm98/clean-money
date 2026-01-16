import { login } from "../actions";
import { AlertCircle, Info } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  // Await searchParams trong Next.js 15
  const { error, message } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-6">
      <div className="w-full max-w-sm space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Chào mừng trở lại
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Đăng nhập để quản lý tài chính thông minh
          </p>
        </div>

        {/* HIỂN THỊ LỖI NẾU CÓ */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* HIỂN THỊ THÔNG BÁO THÀNH CÔNG (VD: Sau khi đăng ký) */}
        {message && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-sm animate-in fade-in slide-in-from-top-2">
            <Info className="w-4 h-4 shrink-0" />
            <p>{message}</p>
          </div>
        )}

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="block w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              required
              className="block w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
          <button
            formAction={login}
            className="w-full rounded-xl bg-zinc-900 dark:bg-zinc-50 py-3 text-sm font-semibold text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Chưa có tài khoản?{" "}
          <a
            href="/signup"
            className="text-purple-600 font-medium hover:underline"
          >
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}
