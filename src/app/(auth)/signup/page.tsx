"use client";

import { signup } from "../actions";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

// Component Button nhỏ để xử lý loading state mượt mà
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 py-3 text-sm font-semibold text-white dark:text-zinc-900 hover:opacity-90 transition-all disabled:opacity-50"
    >
      {pending ? "Đang khởi tạo..." : "Tạo tài khoản"}
      {!pending && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl"
      >
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

        <form action={signup} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="block w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-10 pr-4 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="block w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-10 pr-4 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
            <p className="text-[10px] text-zinc-500 mt-1 ml-1">
              * Mật khẩu cần ít nhất 6 ký tự
            </p>
          </div>

          <SubmitButton />
        </form>

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
      </motion.div>
    </div>
  );
}
