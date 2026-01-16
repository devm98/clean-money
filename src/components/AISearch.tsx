"use client";

import { useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { smartSearch } from "@/app/actions/search";

export default function AISearch({
  onResults,
}: {
  onResults: (res: any) => void;
}) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    const res = await smartSearch(query);
    onResults(res);
    setIsSearching(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          {isSearching ? (
            <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
          ) : (
            <Search className="w-4 h-4 text-zinc-400" />
          )}
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Hỏi AI: 'Tháng này tiêu bao nhiêu Shopee?'"
          className="w-full bg-zinc-100 dark:bg-zinc-800/50 border-none rounded-2xl py-3 pl-11 pr-4 text-[16px] focus:ring-2 focus:ring-purple-500/50 transition-all outline-none"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-4 flex items-center"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        )}
      </div>
    </div>
  );
}
