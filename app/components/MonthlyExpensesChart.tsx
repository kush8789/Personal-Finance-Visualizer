"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyExpensesChart({ transactions }: { transactions: { date: string; amount: number }[] }) {
  const chartData = Object.entries(
    transactions.reduce((acc, { date, amount }) => {
      const key = new Date(date).toLocaleString("default", { year: "numeric", month: "short" });
      acc[key] = (acc[key] || 0) + Number(amount); // Ensure amount is treated as a number
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()); // Sorting by date

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
