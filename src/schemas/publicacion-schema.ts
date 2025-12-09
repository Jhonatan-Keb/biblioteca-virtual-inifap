import { z } from "zod";

export const publicacionSchema = z.object({
  titulo: z.string().min(1, "El título es requerido").max(500, "Máximo 500 caracteres"),
  tipo: z.enum(["tecnica", "cientifica", "video", "folleto", "desplegable", "libro"]),
  año: z.string().min(4, "Año inválido").max(6, "Año inválido"),
  descripcion: z.string().max(500, "Máximo 500 caracteres").optional(),
  imagenUrl: z.string().max(200, "Máximo 200 caracteres").optional(),
  archivoUrl: z.string().max(500, "Máximo 500 caracteres").optional(),
  liga: z.string().max(200, "Máximo 200 caracteres").optional(),
  mensaje: z.string().max(500, "Máximo 500 caracteres").optional(),
  publicacionot: z.string().max(500, "Máximo 500 caracteres").optional(),
  cuenta: z.number().min(0).default(0),
  muestra: z.boolean().default(true),
});
