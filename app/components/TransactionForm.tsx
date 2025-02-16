"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TransactionForm() {
  // State to manage form data
  const [formData, setFormData] = useState({ amount: "", date: "", description: "" });
  // State to manage error messages
  const [error, setError] = useState("");

  // Function to validate the form
  const validateForm = () => {
    if (!formData.amount || !formData.date || !formData.description) {
      return "All fields are required!";
    }
    if (parseFloat(formData.amount) <= 0) {
      return "Amount must be positive!";
    }
    if (new Date(formData.date) > new Date()) {
      return "Date cannot be in the future!";
    }
    return "";
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      // Send the form data to the API
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(formData.amount), // Ensure amount is a number
          date: formData.date,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      // Clear the form and error message on success
      setFormData({ amount: "", date: "", description: "" });
      setError("");
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError("Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(["amount", "date", "description"] as (keyof typeof formData)[]).map((field) => (
        <div key={field}>
          <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
          <Input
            type={field === "amount" ? "number" : field === "date" ? "date" : "text"}
            id={field}
            value={formData[field]}
            onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
            required
          />
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}