"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format, subDays, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { X } from "lucide-react";

export default function DatePickerSheet({
  isOpen,
  onClose,
  selectedDate,
  onSelect,
}: any) {
  const days = [...Array(12)].map((_, i) => subDays(new Date(), i));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-99"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 z-100 rounded-t-[32px] p-6 pb-10"
          >
            <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mb-6" />

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Chọn ngày</h3>
              <X className="text-zinc-400" onClick={onClose} />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {days.map((date) => {
                const active = isSameDay(date, selectedDate);
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => {
                      onSelect(date);
                      onClose();
                    }}
                    className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                      active
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold mb-1">
                      {format(date, "EEE", { locale: vi })}
                    </span>
                    <span className="text-lg font-black">
                      {format(date, "dd")}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
