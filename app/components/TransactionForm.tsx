"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TransactionForm() {
  const [formData, setFormData] = useState({ amount: "", date: "", description: "" });
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!formData.amount || !formData.date || !formData.description) return "All fields are required!";
    if (parseFloat(formData.amount) <= 0) return "Amount must be positive!";
    if (new Date(formData.date) > new Date()) return "Date cannot be in the future!";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) setFormData({ amount: "", date: "", description: "" });
    else setError("Failed to add transaction");
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
