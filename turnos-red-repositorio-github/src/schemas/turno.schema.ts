import { z } from "zod";

const especialidad = z
  .string()
  .trim()
  .regex(
    /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?:\s+[a-záéíóúüñ]+)*$/,
    "La especialidad debe estar en Title Case/PascalCase"
  );

export const turnoSchema = z.object({
  paciente: z.string().trim().min(2, "El paciente es obligatorio"),
  documento: z.string().trim().min(3, "El documento debe ser un string válido"),
  especialidad,
  fecha: z.string().regex(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "La fecha debe tener formato DD/MM/AAAA"),
  hora: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "La hora debe tener formato HH:MM"),
  confirmado: z.boolean(),
  medicoId: z.number().int().positive().optional()
});

export const turnoUpdateSchema = turnoSchema.partial();
export type TurnoInput = z.infer<typeof turnoSchema>;
