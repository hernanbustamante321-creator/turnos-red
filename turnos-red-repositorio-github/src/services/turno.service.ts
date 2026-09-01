import { Turno } from "../models/turno.js";
import { TurnoInput } from "../schemas/turno.schema.js";
import { eventBus } from "../events/eventBus.js";
import { readJson, writeJson } from "../utils/jsonStore.js";
import { httpError } from "../utils/httpError.js";

const FILE = "turnos.json";

async function all(): Promise<Turno[]> {
  return readJson<Turno[]>(FILE, []);
}

export async function getTurnos(filters: {
  especialidad?: string;
  fecha?: string;
  medicoId?: string;
}) {
  let turnos = await all();
  if (filters.especialidad) {
    turnos = turnos.filter(t => t.especialidad.toLowerCase() === filters.especialidad!.toLowerCase());
  }
  if (filters.fecha) {
    turnos = turnos.filter(t => t.fecha === filters.fecha);
  }
  if (filters.medicoId) {
    const id = Number(filters.medicoId);
    if (Number.isNaN(id)) {
      throw httpError(400, "medicoId debe ser numérico", "INVALID_QUERY", []);
    }
    turnos = turnos.filter(t => t.medicoId === id);
  }
  return turnos;
}

export async function getTurno(id: number) {
  const turno = (await all()).find(t => t.id === id);
  if (!turno) throw httpError(404, "Turno no encontrado", "NOT_FOUND", []);
  return turno;
}

export async function createTurno(input: TurnoInput) {
  const turnos = await all();
  const id = turnos.length ? Math.max(...turnos.map(t => t.id)) + 1 : 1;
  const turno: Turno = { id, ...input };
  turnos.push(turno);
  await writeJson(FILE, turnos);
  eventBus.emit("turno:creado", turno);
  return turno;
}

export async function updateTurno(id: number, input: Partial<TurnoInput>) {
  const turnos = await all();
  const index = turnos.findIndex(t => t.id === id);
  if (index === -1) throw httpError(404, "Turno no encontrado", "NOT_FOUND", []);
  turnos[index] = { ...turnos[index], ...input };
  await writeJson(FILE, turnos);
  eventBus.emit("turno:actualizado", turnos[index]);
  return turnos[index];
}

export async function deleteTurno(id: number) {
  const turnos = await all();
  const index = turnos.findIndex(t => t.id === id);
  if (index === -1) throw httpError(404, "Turno no encontrado", "NOT_FOUND", []);
  const [deleted] = turnos.splice(index, 1);
  await writeJson(FILE, turnos);
  eventBus.emit("turno:eliminado", deleted);
}
