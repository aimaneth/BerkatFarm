import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create users
    const users = await Promise.all([
      prisma.user.upsert({
        where: { email: 'manager@berkatfarm.com' },
        update: {},
        create: {
          name: 'Farm Manager',
          email: 'manager@berkatfarm.com',
          role: 'MANAGER',
        },
      }),
      prisma.user.upsert({
        where: { email: 'accountant@berkatfarm.com' },
        update: {},
        create: {
          name: 'Farm Accountant',
          email: 'accountant@berkatfarm.com',
          role: 'ACCOUNTANT',
        },
      }),
      prisma.user.upsert({
        where: { email: 'supervisor@berkatfarm.com' },
        update: {},
        create: {
          name: 'Farm Supervisor',
          email: 'supervisor@berkatfarm.com',
          role: 'SUPERVISOR',
        },
      }),
    ]);

    // Create livestock
    const livestock = await Promise.all([
      ...Array(150).fill(null).map(() =>
        prisma.livestock.create({
          data: {
            type: 'Cattle',
            status: 'ACTIVE',
          },
        })
      ),
      ...Array(300).fill(null).map(() =>
        prisma.livestock.create({
          data: {
            type: 'Sheep',
            status: 'ACTIVE',
          },
        })
      ),
      ...Array(200).fill(null).map(() =>
        prisma.livestock.create({
          data: {
            type: 'Goat',
            status: 'ACTIVE',
          },
        })
      ),
    ]);

    // Create tasks
    const tasks = await Promise.all([
      ...Array(32).fill(null).map((_, index) =>
        prisma.task.create({
          data: {
            title: `Task ${index + 1}`,
            description: `Description for task ${index + 1}`,
            status: 'COMPLETED',
          },
        })
      ),
      ...Array(13).fill(null).map((_, index) =>
        prisma.task.create({
          data: {
            title: `Pending Task ${index + 1}`,
            description: `Description for pending task ${index + 1}`,
            status: 'PENDING',
          },
        })
      ),
    ]);

    // Create transactions (last 6 months of revenue)
    const now = new Date();
    const transactions = await Promise.all(
      Array(6).fill(null).map((_, index) => {
        const month = new Date(now.getFullYear(), now.getMonth() - index, 1);
        return prisma.transaction.create({
          data: {
            type: 'INCOME',
            amount: 45000 + Math.floor(Math.random() * 20000),
            month,
          },
        });
      })
    );

    // Create some pending orders
    const orders = await Promise.all(
      Array(23).fill(null).map((_, index) =>
        prisma.order.create({
          data: {
            status: 'PENDING',
          },
        })
      )
    );

    // Create some recent activities
    const activities = await Promise.all([
      prisma.activity.create({
        data: {
          type: 'LIVESTOCK',
          description: 'Added 50 new cattle to the farm',
        },
      }),
      prisma.activity.create({
        data: {
          type: 'TASK',
          description: 'Completed vaccination for all sheep',
        },
      }),
      prisma.activity.create({
        data: {
          type: 'ORDER',
          description: 'New order received for dairy products',
        },
      }),
      prisma.activity.create({
        data: {
          type: 'TRANSACTION',
          description: 'Monthly revenue report generated',
        },
      }),
      prisma.activity.create({
        data: {
          type: 'USER',
          description: 'New staff member joined the team',
        },
      }),
    ]);

    console.log('Seed data created successfully');
    console.log(`Created ${users.length} users`);
    console.log(`Created ${livestock.length} livestock`);
    console.log(`Created ${tasks.length} tasks`);
    console.log(`Created ${transactions.length} transactions`);
    console.log(`Created ${orders.length} orders`);
    console.log(`Created ${activities.length} activities`);

  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 