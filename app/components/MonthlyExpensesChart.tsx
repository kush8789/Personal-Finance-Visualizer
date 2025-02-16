"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Define the structure of a Transaction object
interface Transaction {
  date: string;
  amount: number;
}

// Define the structure of the chart data
interface ChartData {
  month: string;
  amount: number;
}

export default function MonthlyExpensesChart({ transactions }: { transactions: Transaction[] }) {
  // Process transactions to group by month and calculate total amounts
  const chartData: ChartData[] = Object.entries(
    transactions.reduce((acc, { date, amount }) => {
      const key = new Date(date).toLocaleString("default", { year: "numeric", month: "short" });
      acc[key] = (acc[key] || 0) + Number(amount); // Ensure amount is treated as a number
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()); // Sort by date

  // If there's no data, display a message
  if (chartData.length === 0) {
    return <p className="text-center text-gray-500">No transaction data available.</p>;
  }

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