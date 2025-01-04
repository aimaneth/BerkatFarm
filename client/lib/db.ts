import { Collection, Db, MongoClient } from 'mongodb';
import clientPromise from './mongodb';

// Cache the database connection
let db: Db | null = null;

export async function getDb() {
  if (!db) {
    const client = await clientPromise;
    db = client.db('farm-management');
  }
  return db;
}

// Helper functions for collections
export async function getUsers(): Promise<Collection> {
  const db = await getDb();
  return db.collection('users');
}

export async function getLivestock(): Promise<Collection> {
  const db = await getDb();
  return db.collection('livestock');
}

export async function getTasks(): Promise<Collection> {
  const db = await getDb();
  return db.collection('tasks');
}

export async function getTransactions(): Promise<Collection> {
  const db = await getDb();
  return db.collection('transactions');
}

export async function getOrders(): Promise<Collection> {
  const db = await getDb();
  return db.collection('orders');
}

export async function getActivities(): Promise<Collection> {
  const db = await getDb();
  return db.collection('activities');
}

// Helper function to convert string ID to ObjectId
export function toObjectId(id: string) {
  const { ObjectId } = require('mongodb');
  return new ObjectId(id);
} 