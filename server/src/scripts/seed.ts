import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/farm-management';

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    // Create users
    const hashedPassword = await hash('password123', 12);
    const users = await Promise.all([
      db.collection('users').updateOne(
        { email: 'manager@FarmSoul.com' },
        {
          $set: {
            name: 'Farm Manager',
            email: 'manager@FarmSoul.com',
            password: hashedPassword,
            role: 'MANAGER',
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        { upsert: true }
      ),
      db.collection('users').updateOne(
        { email: 'accountant@FarmSoul.com' },
        {
          $set: {
            name: 'Farm Accountant',
            email: 'accountant@FarmSoul.com',
            password: hashedPassword,
            role: 'ACCOUNTANT',
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        { upsert: true }
      ),
      db.collection('users').updateOne(
        { email: 'supervisor@FarmSoul.com' },
        {
          $set: {
            name: 'Farm Supervisor',
            email: 'supervisor@FarmSoul.com',
            password: hashedPassword,
            role: 'SUPERVISOR',
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        { upsert: true }
      ),
    ]);

    // Create livestock
    await db.collection('livestock').deleteMany({});
    const livestock = await Promise.all([
      ...Array(150).fill(null).map(() =>
        db.collection('livestock').insertOne({
          type: 'Cattle',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ),
      ...Array(300).fill(null).map(() =>
        db.collection('livestock').insertOne({
          type: 'Sheep',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ),
      ...Array(200).fill(null).map(() =>
        db.collection('livestock').insertOne({
          type: 'Goat',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ),
    ]);

    // Get user IDs for task assignment
    const userDocs = await db.collection('users').find().toArray();
    const managerId = userDocs.find(u => u.role === 'MANAGER')?._id;
    const supervisorId = userDocs.find(u => u.role === 'SUPERVISOR')?._id;

    // Create tasks
    await db.collection('tasks').deleteMany({});
    const tasks = await Promise.all([
      ...Array(32).fill(null).map((_, index) =>
        db.collection('tasks').insertOne({
          title: `Task ${index + 1}`,
          description: `Description for task ${index + 1}`,
          status: 'COMPLETED',
          assignedTo: managerId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ),
      ...Array(13).fill(null).map((_, index) =>
        db.collection('tasks').insertOne({
          title: `Pending Task ${index + 1}`,
          description: `Description for pending task ${index + 1}`,
          status: 'PENDING',
          assignedTo: supervisorId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ),
    ]);

    // Create transactions
    await db.collection('transactions').deleteMany({});
    const now = new Date();
    const transactions = await Promise.all(
      Array(6).fill(null).map((_, index) => {
        const month = new Date(now.getFullYear(), now.getMonth() - index, 1);
        return db.collection('transactions').insertOne({
          type: 'INCOME',
          amount: 45000 + Math.floor(Math.random() * 20000),
          month,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      })
    );

    // Create orders
    await db.collection('orders').deleteMany({});
    const orders = await Promise.all(
      Array(23).fill(null).map(() =>
        db.collection('orders').insertOne({
          status: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      )
    );

    // Create activities
    await db.collection('activities').deleteMany({});
    const activities = await Promise.all([
      db.collection('activities').insertOne({
        type: 'LIVESTOCK',
        description: 'Added 50 new cattle to the farm',
        createdAt: new Date(),
        updatedAt: new Date()
      }),
      db.collection('activities').insertOne({
        type: 'TASK',
        description: 'Completed vaccination for all sheep',
        createdAt: new Date(),
        updatedAt: new Date()
      }),
      db.collection('activities').insertOne({
        type: 'ORDER',
        description: 'New order received for dairy products',
        createdAt: new Date(),
        updatedAt: new Date()
      }),
      db.collection('activities').insertOne({
        type: 'TRANSACTION',
        description: 'Monthly revenue report generated',
        createdAt: new Date(),
        updatedAt: new Date()
      }),
      db.collection('activities').insertOne({
        type: 'USER',
        description: 'New staff member joined the team',
        createdAt: new Date(),
        updatedAt: new Date()
      }),
    ]);

    console.log('Seed data created successfully');
    console.log(`Created/Updated ${users.length} users`);
    console.log(`Created ${livestock.length} livestock`);
    console.log(`Created ${tasks.length} tasks`);
    console.log(`Created ${transactions.length} transactions`);
    console.log(`Created ${orders.length} orders`);
    console.log(`Created ${activities.length} activities`);

  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main(); 