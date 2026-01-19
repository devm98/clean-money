"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
];

export function SpendingPieChart({ data }: { data: any[] }) {
  return (
    <div className="h-75 w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
      <h3 className="text-sm font-medium text-zinc-500 mb-4">
        Phân bổ chi tiêu
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingLineChart({ data }: { data: any[] }) {
  return (
    <div className="h-75 w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
      <h3 className="text-sm font-medium text-zinc-500 mb-4">
        Biến động chi tiêu
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e4e4e7"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#71717a" }}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey="spent"
            stroke="#8b5cf6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSpent)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
