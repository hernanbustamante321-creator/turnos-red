import { z } from "zod";

const especialidad = z
  .string()
  .trim()
  .regex(
    /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?:\s+[a-záéíóúüñ]+)*$/,
    "La especialidad debe estar en Title Case/PascalCase"
  );

export const medicoSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre es obligatorio"),
  especialidad,
  disponible: z.boolean()
});

export const medicoUpdateSchema = medicoSchema.partial();
export type MedicoInput = z.infer<typeof medicoSchema>;
