import { EventEmitter } from "node:events";

export const eventBus = new EventEmitter();

eventBus.on("turno:creado", (turno) => console.log("[EVENT] turno:creado", turno));
eventBus.on("turno:actualizado", (turno) => console.log("[EVENT] turno:actualizado", turno));
eventBus.on("turno:eliminado", (turno) => console.log("[EVENT] turno:eliminado", turno));
