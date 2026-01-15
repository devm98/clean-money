"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { processAndSaveTransaction } from "@/app/actions/transaction";

export default function AIInput() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "success">("idle");

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setStatus("busy");

    const result = await processAndSaveTransaction(input);

    if (result.success) {
      setStatus("success");
      setInput("");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("idle");
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Hiệu ứng Glow nền */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>

      <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center p-4 gap-3">
          <motion.div
            animate={status === "busy" ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-purple-500" />
          </motion.div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Sáng nay ăn phở 50k..."
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
                onClick={handleSubmit}
                className="p-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Thanh Progress chạy ngầm khi Success */}
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
        Thử nói: &quot;Lương tháng này 20 triệu&quot; hoặc &quot;Mua cafe hết
        45k bằng thẻ Tech&quot;
      </p>
    </motion.div>
  );
}
