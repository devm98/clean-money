import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full">{children}</div>
    </div>
  );
}
