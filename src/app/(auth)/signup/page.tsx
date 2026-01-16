import SignupForm from "@/components/SignupForm";
import { AlertCircle, Info, UserPlus } from "lucide-react";
import Link from "next/link";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-6 font-sans">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-4">
            <UserPlus className="text-purple-600 dark:text-purple-400 w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Bắt đầu ngay
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Gia nhập cộng đồng quản lý tài chính thông minh
          </p>
        </div>

        {/* HIỂN THỊ LỖI (Ví dụ: Email đã tồn tại) */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{decodeURIComponent(error)}</p>
          </div>
        )}

        {/* HIỂN THỊ THÔNG BÁO (Ít dùng ở signup nhưng cứ để cho đồng bộ) */}
        {message && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-sm animate-in fade-in slide-in-from-top-2">
            <Info className="w-4 h-4 shrink-0" />
            <p>{decodeURIComponent(message)}</p>
          </div>
        )}

        <SignupForm />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">
              Hoặc
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
