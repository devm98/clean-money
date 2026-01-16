"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface Props {
  items: any[];
  onConfirm: (finalItems: any[]) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function PreviewModal({
  items,
  onConfirm,
  onCancel,
  loading,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-xl font-bold">Xác nhận giao dịch</h3>
          <button
            onClick={onCancel}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <X />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800"
            >
              <div className="flex-1">
                <input
                  className="bg-transparent font-bold text-zinc-900 dark:text-zinc-50 outline-none w-full"
                  defaultValue={item.note}
                  onChange={(e) => (item.note = e.target.value)}
                />
                <p className="text-sm text-zinc-500">{item.category_name}</p>
              </div>
              <div className="text-right">
                <input
                  className="bg-transparent font-bold text-purple-600 text-right outline-none w-24"
                  defaultValue={item.amount.toLocaleString()}
                  onChange={(e) => (item.amount = e.target.value)}
                />
                <span className="ml-1 text-xs">₫</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/30 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl font-medium text-zinc-600 hover:bg-zinc-100 transition-all"
          >
            Hủy
          </button>
          <button
            onClick={() => onConfirm(items)}
            disabled={loading}
            className="flex-1 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Đang lưu..."
            ) : (
              <>
                <Check className="w-4 h-4" /> Lưu tất cả
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
