"use client";

import { motion } from "framer-motion";
import { useFinancialStore } from "@/store/useFinancialStore";
import { ReactNode } from "react";

export default function MoodWrapper({ children }: { children: ReactNode }) {
  const { mood } = useFinancialStore();

  return (
    <motion.div
      animate={{
        backgroundColor: mood === "celebrating" ? "#ecfdf5" : "#fafafa",
      }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full transition-colors bg-zinc-50"
    >
      {children}
    </motion.div>
  );
}
