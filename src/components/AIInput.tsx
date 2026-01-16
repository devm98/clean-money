"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Camera } from "lucide-react";
import { processAndSaveTransaction } from "@/app/actions/transaction";
import { useFinancialStore } from "@/store/useFinancialStore";
import confetti from "canvas-confetti";

export default function AIInput() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "success">("idle");
  const { setMood } = useFinancialStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async (text: string, file?: File) => {
    setStatus("busy");

    const formData = new FormData();
    if (file) formData.append("file", file);

    const result = await processAndSaveTransaction(text, formData);

    if (result.success) {
      if (result.isHugeIncome) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#34d399", "#fbbf24"],
        });

        setMood("celebrating");
        setTimeout(() => setMood("normal"), 3000);
      }
      setStatus("success");
      setInput("");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("idle");
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcess("", file);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>

      <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center p-4 gap-3">
          {/* Nút chọn ảnh/Camera */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={onFileChange}
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-zinc-400 hover:text-purple-500 transition-colors"
            disabled={status === "busy"}
          >
            <Camera className="w-5 h-5" />
          </motion.button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleProcess(input)}
            placeholder="Sáng nay ăn phở 50k hoặc quét hóa đơn..."
            className="flex-1 bg-transparent outline-none text-lg text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400"
            disabled={status === "busy"}
          />

          <AnimatePresence mode="wait">
            {status === "busy" ? (
              <motion.div
                key="loading"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
              </motion.div>
            ) : (
              <motion.button
                key="send"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleProcess(input)}
                className="p-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ opacity: 0 }}
              className="h-1 bg-green-500"
            />
          )}
        </AnimatePresence>
      </div>

      <p className="mt-3 text-center text-xs text-zinc-500 italic">
        Thử nói: &quot;Lương tháng này 20 triệu&quot; hoặc nhấn icon máy ảnh để
        quét hóa đơn 📸
      </p>
    </motion.div>
  );
}
