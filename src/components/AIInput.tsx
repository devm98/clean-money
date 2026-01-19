"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Camera, Calendar } from "lucide-react";
import { processAndSaveTransaction } from "@/app/actions/transaction";
import { useFinancialStore } from "@/store/useFinancialStore";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { format, isSameDay } from "date-fns";
import DatePickerSheet from "./DatePickerSheet";

export default function AIInput() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "success">("idle");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { setMood } = useFinancialStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async (text: string, file?: File) => {
    if (!text && !file) return;
    setStatus("busy");

    const formData = new FormData();
    if (file) formData.append("file", file);
    // Gửi kèm ngày đã chọn để AI ưu tiên sử dụng
    formData.append("selectedDate", selectedDate.toISOString());

    const result = await processAndSaveTransaction(text, formData);

    if (result.success) {
      if (result.isHugeIncome) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        setMood("celebrating");
        setTimeout(() => setMood("normal"), 3000);
      }
      setStatus("success");
      setInput("");
      setTimeout(() => setStatus("idle"), 2000);
      router.refresh();
    } else {
      setStatus("idle");
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-1">
      {/* Hiệu ứng phát sáng khi focus */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-md opacity-0 transition-opacity duration-500 focus-within:opacity-100" />

      <div className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex items-center p-2 gap-2">
          {/* Custom Date Display (Thay thế input date mặc định) */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDatePickerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400"
          >
            <Calendar size={14} />
            <span className="text-[11px] font-extrabold uppercase tracking-tight">
              {isSameDay(selectedDate, new Date())
                ? "Hôm nay"
                : format(selectedDate, "dd/MM")}
            </span>
          </motion.button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleProcess(input)}
            placeholder="Sáng nay ăn phở 50k..."
            className="flex-1 bg-transparent outline-none text-base md:text-lg text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 py-1"
            disabled={status === "busy"}
          />

          {/* Action Group: Camera bên phải */}
          <div className="flex items-center gap-1">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleProcess("", file);
              }}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-zinc-400 hover:text-purple-500 transition-colors"
              disabled={status === "busy"}
            >
              <Camera size={22} />
            </button>

            <AnimatePresence mode="wait">
              {status === "busy" ? (
                <div className="p-2">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                </div>
              ) : (
                <motion.button
                  key="send"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleProcess(input)}
                  className={`p-2.5 rounded-xl transition-all ${
                    input.trim()
                      ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900"
                      : "bg-zinc-50 dark:bg-zinc-800 text-zinc-300"
                  }`}
                >
                  <Send size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Success Indicator */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ opacity: 0 }}
              className="h-0.5 bg-emerald-500"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Date Picker Sheet Component */}
      <DatePickerSheet
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </div>
  );
}
