"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import './TransactionList.css'; // Import the CSS file for styling

// Define the structure of a Transaction object
interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

export default function TransactionList() {
  // State to store the list of transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState('');
  // State to track the transaction being edited
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Function to fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data); // Update the transactions state with the fetched data
    } catch (error) {
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to handle deletion of a transaction
  const handleDelete = async (id: string) => {
    const response = await fetch('/api/transactions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }), // Send the transaction ID to delete
    });
    if (response.ok) {
      // Remove the deleted transaction from the list
      setTransactions(transactions.filter((t) => t._id !== id));
    }
  };

  // Function to handle editing a transaction
  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction); // Set the transaction to be edited
  };

  // Function to save the updated transaction
  const handleSave = async (updatedTransaction: Transaction) => {
    const response = await fetch('/api/transactions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: updatedTransaction._id, // Include the transaction ID
        amount: updatedTransaction.amount,
        date: updatedTransaction.date,
        description: updatedTransaction.description,
      }),
    });

    if (response.ok) {
      // Refresh the transaction list after successful update
      fetchTransactions();
      setEditingTransaction(null); // Close the edit modal
    } else {
      console.error('Failed to update transaction');
    }
  };

  // Display loading message while data is being fetched
  if (loading) return <p>Loading...</p>;
  // Display error message if there's an error
  if (error) return <p>{error}</p>;

  return (
    <div className="transaction-list-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>Rs. {transaction.amount}</td>
              <td>
                {/* Edit button */}
                <Button variant="outline" className="mr-2" onClick={() => handleEdit(transaction)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(transaction._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTransaction && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Transaction</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editingTransaction);
              }}
            >
              <div className="mb-4">
                <label>Date</label>
                <input
                  type="date"
                  value={editingTransaction.date}
                  onChange={(e) => setEditingTransaction({...editingTransaction, date: e.target.value,})}
                />
              </div>
              <div className="mb-4">
                <label>Description</label>
                <input
                  type="text"
                  value={editingTransaction.description}
                  onChange={(e) =>
                    setEditingTransaction({...editingTransaction,description: e.target.value,})}
                />
              </div>
              <div className="mb-4">
                <label>Amount</label>
                <input
                  type="number"
                  value={editingTransaction.amount}
                  onChange={(e) => setEditingTransaction({...editingTransaction,amount: parseFloat(e.target.value),})}
                />
              </div>
              <div className="edit-modal-actions">
                <Button type="button" variant="outline" onClick={() => setEditingTransaction(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="ml-2">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}