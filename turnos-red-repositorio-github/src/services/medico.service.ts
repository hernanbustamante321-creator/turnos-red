import { Medico } from "../models/medico.js";
import { MedicoInput } from "../schemas/medico.schema.js";
import { readJson, writeJson } from "../utils/jsonStore.js";
import { httpError } from "../utils/httpError.js";

const FILE = "medicos.json";

async function all(): Promise<Medico[]> {
  return readJson<Medico[]>(FILE, []);
}

export async function getMedicos(filters: { especialidad?: string; disponible?: string }) {
  let medicos = await all();
  if (filters.especialidad) {
    medicos = medicos.filter(m => m.especialidad.toLowerCase() === filters.especialidad!.toLowerCase());
  }
  if (filters.disponible !== undefined) {
    if (!["true", "false"].includes(filters.disponible)) {
      throw httpError(400, "disponible debe ser true o false", "INVALID_QUERY", []);
    }
    medicos = medicos.filter(m => m.disponible === (filters.disponible === "true"));
  }
  return medicos;
}

export async function getMedico(id: number) {
  const medico = (await all()).find(m => m.id === id);
  if (!medico) throw httpError(404, "Médico no encontrado", "NOT_FOUND", []);
  return medico;
}

export async function createMedico(input: MedicoInput) {
  const medicos = await all();
  const id = medicos.length ? Math.max(...medicos.map(m => m.id)) + 1 : 1;
  const medico: Medico = { id, ...input };
  medicos.push(medico);
  await writeJson(FILE, medicos);
  return medico;
}

export async function updateMedico(id: number, input: Partial<MedicoInput>) {
  const medicos = await all();
  const index = medicos.findIndex(m => m.id === id);
  if (index === -1) throw httpError(404, "Médico no encontrado", "NOT_FOUND", []);
  medicos[index] = { ...medicos[index], ...input };
  await writeJson(FILE, medicos);
  return medicos[index];
}

export async function deleteMedico(id: number) {
  const medicos = await all();
  const index = medicos.findIndex(m => m.id === id);
  if (index === -1) throw httpError(404, "Médico no encontrado", "NOT_FOUND", []);
  medicos.splice(index, 1);
  await writeJson(FILE, medicos);
}
