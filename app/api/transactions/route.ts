import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

const getDb = async () => (await clientPromise).db('finance');
const jsonResponse = (data: any, status = 200) => NextResponse.json(data, { status });

export async function GET() {
  try {
    return jsonResponse(await (await getDb()).collection('transactions').find({}).toArray());
  } catch {
    return jsonResponse({ error: 'Failed to fetch transactions' }, 500);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.amount || !data.date || !data.description) return jsonResponse({ error: 'Invalid data' }, 400);
    
    return jsonResponse(await (await getDb()).collection('transactions').insertOne(data));
  } catch {
    return jsonResponse({ error: 'Failed to add transaction' }, 500);
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    return jsonResponse(await (await getDb()).collection('transactions').updateOne({ _id: new ObjectId(id) }, { $set: data }));
  } catch {
    return jsonResponse({ error: 'Failed to update transaction' }, 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    return jsonResponse(await (await getDb()).collection('transactions').deleteOne({ _id: new ObjectId(id) }));
  } catch {
    return jsonResponse({ error: 'Failed to delete transaction' }, 500);
  }
}
