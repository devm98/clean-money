"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface Props {
  onFilter: (filters: {
    text: string;
    categoryId?: string;
    type?: string;
  }) => void;
  categories: any[];
}

export default function SearchFilters({ onFilter, categories }: Props) {
  const [text, setText] = useState("");
  const [catId, setCatId] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilter({ text, categoryId: catId, type });
    }, 300);
    return () => clearTimeout(timer);
  }, [text, catId, type]);

  return (
    <div className="space-y-3">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tìm theo nội dung..."
          className="w-full bg-zinc-100 dark:bg-zinc-800/50 border-none rounded-2xl py-3 pl-11 pr-4 text-[16px] outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
        {text && (
          <X
            onClick={() => setText("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 cursor-pointer"
          />
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {/* Lọc nhanh theo Loại */}
        <select
          onChange={(e) => setType(e.target.value)}
          className="bg-zinc-100 dark:bg-zinc-800/50 border-none rounded-xl px-3 py-2 text-xs font-bold outline-none"
        >
          <option value="">Tất cả loại</option>
          <option value="expense">Chi tiêu</option>
          <option value="income">Thu nhập</option>
        </select>

        {/* Lọc nhanh theo Danh mục */}
        <select
          onChange={(e) => setCatId(e.target.value)}
          className="bg-zinc-100 dark:bg-zinc-800/50 border-none rounded-xl px-3 py-2 text-xs font-bold outline-none"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
