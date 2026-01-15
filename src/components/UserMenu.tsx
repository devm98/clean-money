"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, ChevronDown } from "lucide-react";
import { signout } from "@/app/(auth)/actions";

export default function UserMenu({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
          <User className="w-4 h-4" />
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop để đóng menu khi click ra ngoài */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xl z-20 overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 truncate">
                  Đang đăng nhập bằng
                </p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                  {email}
                </p>
              </div>

              <button
                onClick={() => signout()}
                className="w-full flex items-center gap-2 p-4 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
