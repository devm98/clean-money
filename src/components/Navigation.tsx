"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Tag, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Trang chủ", href: "/", icon: Home },
  // { name: "Ví tiền", href: "/wallets", icon: Wallet },
  { name: "Danh mục", href: "/categories", icon: Tag },
  // { name: "Phân tích", href: "/analytics", icon: PieChart },
];

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className="fixed z-50
      bottom-0 left-0 right-0 px-4 pb-6 pt-2
      md:top-0 md:bottom-0 md:left-0 md:right-auto md:w-24 md:h-screen md:px-0 md:py-8
      flex justify-center items-center"
    >
      <div
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl
        flex flex-row items-center justify-around p-2 rounded-3xl w-full max-w-lg
        md:flex-col md:h-full md:w-16 md:rounded-[40px] md:justify-start md:gap-8"
      >
        {/* Logo hoặc Avatar (Chỉ hiện trên PC) */}
        <div className="hidden md:flex mb-4 p-2">
          <div className="w-10 h-10 bg-linear-to-tr from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative p-3 group"
              title={item.name}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-zinc-900 dark:bg-zinc-100 rounded-2xl"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <Icon
                size={22}
                className={`relative z-10 transition-colors duration-300 ${
                  isActive
                    ? "text-white dark:text-zinc-900"
                    : "text-zinc-400 group-hover:text-zinc-600"
                }`}
              />
            </Link>
          );
        })}

        <div className="hidden md:flex mt-auto pb-4">
          <button className="p-3 text-zinc-400 hover:text-rose-500 transition-colors">
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
