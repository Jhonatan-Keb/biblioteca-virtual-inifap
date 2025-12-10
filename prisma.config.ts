import { defineConfig } from '@prisma/config'; // <--- Asegúrate de tener este import correcto

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // AGREGAMOS '?? ""' AL FINAL.
    // Esto le dice: "Si no encuentras la variable, usa un texto vacío en su lugar".
    url: process.env.DATABASE_URL ?? "", 
  },
});