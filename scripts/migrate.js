require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg'); // <--- Importamos el adaptador
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// 1. Configurar la conexión usando el adaptador (OBLIGATORIO en Prisma 7 sin URL en schema)
const connectionString = process.env.DATABASE_URL;

// Este pool es para Prisma
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Conectando...');
  
  console.log('Migrando datos...');

  // --- LÓGICA DE MIGRACIÓN ---
  
  // 1. Crear usuario admin por defecto
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@biblioteca.com' },
    update: {},
    create: {
      email: 'admin@biblioteca.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
    },
  });

  console.log('Usuario admin verificado/creado');

  // 2. Conexión secundaria para leer las tablas viejas
  // (Podríamos reusar el pool de arriba, pero mantenemos tu lógica separada para evitar conflictos de lectura/escritura)
  const oldDbPool = new Pool({
    user: 'hoshiko_kuro',
    password: 'KuroHoshiko12!',
    host: 'localhost',
    database: 'biblioteca_virtual',
    port: 5432,
  });

  // Migrar pub_tecnicas
  console.log('Leyendo publicaciones técnicas...');
  const tecnicasResult = await oldDbPool.query('SELECT * FROM "public"."pub_tecnicas"');
  
  for (const row of tecnicasResult.rows) {
    const existe = await prisma.publicacion.findFirst({
        where: { titulo: row.publicacion }
    });

    if (!existe) {
        await prisma.publicacion.create({
          data: {
            titulo: row.publicacion,
            tipo: 'tecnica',
            imagenUrl: row.imagen,
            cuenta: row.cuenta,
            muestra: row.muestra == 1 || row.muestra === '1' || row.muestra === true,
            liga: row.liga,
            año: row.ano ? row.ano.toString() : null,
            descripcion: row.mensaje,
          },
        });
    }
  }

  // Migrar pub_cientificas
  console.log('Leyendo publicaciones científicas...');
  const cientificasResult = await oldDbPool.query('SELECT * FROM "public"."pub_cientificas"');

  for (const row of cientificasResult.rows) {
      const existe = await prisma.publicacion.findFirst({
        where: { titulo: row.publicacion }
      });

      if (!existe) {
        await prisma.publicacion.create({
          data: {
            titulo: row.publicacion,
            tipo: 'cientifica',
            liga: row.liga,
            muestra: row.muestra == 1 || row.muestra === '1' || row.muestra === true,
            cuenta: row.cuenta,
            año: row.ano ? row.ano.toString() : null,
            descripcion: row.mensaje,
            publicacionot: row.publicacionot,
          },
        });
    }
  }

  await oldDbPool.end();
  console.log('Migración completada exitosamente!');
}

main()
  .catch((e) => {
    console.error('Error durante la migración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });