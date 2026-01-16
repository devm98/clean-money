"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { signup } from "@/app/(auth)/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 py-3 text-sm font-semibold text-white dark:text-zinc-900 hover:opacity-90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Đang khởi tạo tài khoản...
        </>
      ) : (
        <>
          Tạo tài khoản
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}

export default function SignupForm() {
  return (
    <motion.form
      action={signup}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-5"
    >
      {/* Email Input */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
          Email
        </label>
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-purple-500 transition-colors" />
          <input
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="block w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-10 pr-4 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
          Mật khẩu
        </label>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-purple-500 transition-colors" />
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            className="block w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-10 pr-4 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>
        <p className="text-[10px] text-zinc-500 mt-1 ml-1 italic">
          * Mật khẩu cần tối thiểu 6 ký tự để bảo mật.
        </p>
      </div>

      {/* Nút Submit tách biệt để dùng được useFormStatus */}
      <SubmitButton />
    </motion.form>
  );
}
