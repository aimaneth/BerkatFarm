import { PrismaClient as PrismaPostgres } from '@prisma/client';
import { PrismaClient as PrismaMongo } from '../prisma/generated/auth';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaPostgres | undefined;
  authPrisma: PrismaMongo | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaPostgres({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

export const authPrisma = globalForPrisma.authPrisma ?? new PrismaMongo({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
  globalForPrisma.authPrisma = authPrisma;
} 