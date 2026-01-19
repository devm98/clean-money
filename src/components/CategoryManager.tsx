"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { upsertCategory, deleteCategory } from "@/app/actions/category";

export default function CategoryManager({
  initialCategories,
}: {
  initialCategories: any[];
}) {
  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");
  const [editingCat, setEditingCat] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const filtered = initialCategories.filter((c) => c.type === activeTab);

  const handleOpenModal = (cat = { name: "", icon: "💰", type: activeTab }) => {
    setEditingCat(cat);
    setIsOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header & Tabs */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black">Danh mục</h1>
        <button
          onClick={() => handleOpenModal()}
          className="p-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl active:scale-90 transition-transform"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
        {["expense", "income"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t as any)}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === t ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-zinc-500"}`}
          >
            {t === "expense" ? "Chi tiêu" : "Thu nhập"}
          </button>
        ))}
      </div>

      {/* Grid Danh mục */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((cat) => (
            <motion.div
              layout
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl flex flex-col items-center gap-2"
            >
              <div className="text-3xl mb-1">{cat.icon}</div>
              <span className="font-bold text-sm truncate w-full text-center">
                {cat.name}
              </span>

              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenModal(cat)}
                  className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="p-1.5 bg-rose-50 text-rose-500 rounded-lg"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Sheet Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 z-60 rounded-t-[32px] p-6 pb-10 shadow-2xl"
            >
              <form
                action={async (fd) => {
                  await upsertCategory({
                    id: editingCat?.id,
                    name: fd.get("name") as string,
                    icon: fd.get("icon") as string,
                    type: fd.get("type") as any,
                  });
                  setIsOpen(false);
                }}
                className="space-y-5"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Thông tin danh mục</h2>
                  <X
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-400"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-20 space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400">
                      Icon
                    </label>
                    <input
                      name="icon"
                      defaultValue={editingCat?.icon}
                      className="w-full p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-2xl text-center outline-none"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400">
                      Tên danh mục
                    </label>
                    <input
                      name="name"
                      defaultValue={editingCat?.name}
                      autoFocus
                      className="w-full p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400">
                    Loại
                  </label>
                  <select
                    name="type"
                    defaultValue={editingCat?.type}
                    className="w-full p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl font-bold outline-none appearance-none"
                  >
                    <option value="expense">Chi tiêu</option>
                    <option value="income">Thu nhập</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-bold text-lg active:scale-95 transition-transform"
                >
                  Lưu danh mục
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
