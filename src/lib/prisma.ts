import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaClientSingleton = () => {
  // 1. Crear el pool de conexión usando tus credenciales del .env
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  
  // 2. Crear el adaptador de Prisma para Postgres
  const adapter = new PrismaPg(pool);

  // 3. Instanciar Prisma usando el adaptador
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;