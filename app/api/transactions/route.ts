import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

// Helper function to get the database instance
const getDb = async () => (await clientPromise).db('finance');

// Helper function to create a JSON response
const jsonResponse = <T>(data: T, status = 200) => NextResponse.json(data, { status });

// Define the structure of a transaction
interface Transaction {
  _id?: ObjectId;
  amount: number;
  date: string;
  description: string;
}

// GET: Fetch all transactions
export async function GET() {
  try {
    const transactions = await (await getDb())
      .collection<Transaction>('transactions')
      .find({})
      .toArray();
    return jsonResponse(transactions);
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return jsonResponse({ error: 'Failed to fetch transactions' }, 500);
  }
}

// POST: Add a new transaction
export async function POST(request: Request) {
  try {
    const data: Partial<Transaction> = await request.json();

    // Validate the request body
    if (!data.amount || !data.date || !data.description) {
      return jsonResponse({ error: 'Invalid data: amount, date, and description are required' }, 400);
    }

    // Insert the new transaction
    const result = await (await getDb())
      .collection<Transaction>('transactions')
      .insertOne(data as Transaction);
    return jsonResponse(result);
  } catch (error) {
    console.error('Failed to add transaction:', error);
    return jsonResponse({ error: 'Failed to add transaction' }, 500);
  }
}

// PUT: Update an existing transaction
export async function PUT(request: Request) {
  try {
    const { id, ...data }: { id: string } & Partial<Transaction> = await request.json();

    // Validate the request body
    if (!id || !ObjectId.isValid(id)) {
      return jsonResponse({ error: 'Invalid transaction ID' }, 400);
    }

    // Update the transaction
    const result = await (await getDb())
      .collection<Transaction>('transactions')
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
    return jsonResponse(result);
  } catch (error) {
    console.error('Failed to update transaction:', error);
    return jsonResponse({ error: 'Failed to update transaction' }, 500);
  }
}

// DELETE: Delete a transaction
export async function DELETE(request: Request) {
  try {
    const { id }: { id: string } = await request.json();

    // Validate the request body
    if (!id || !ObjectId.isValid(id)) {
      return jsonResponse({ error: 'Invalid transaction ID' }, 400);
    }

    // Delete the transaction
    const result = await (await getDb())
      .collection<Transaction>('transactions')
      .deleteOne({ _id: new ObjectId(id) });
    return jsonResponse(result);
  } catch (error) {
    console.error('Failed to delete transaction:', error);
    return jsonResponse({ error: 'Failed to delete transaction' }, 500);
  }
}