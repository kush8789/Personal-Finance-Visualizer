"use client"; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList/TransactionList';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <TransactionForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
          <MonthlyExpensesChart transactions={transactions} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Transaction List</h2>
        <TransactionList />
      </div>
    </main>
  );
}