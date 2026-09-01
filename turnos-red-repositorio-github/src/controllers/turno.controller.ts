import { Request, Response, NextFunction } from "express";
import * as service from "../services/turno.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { especialidad, fecha, medicoId } = req.query;
    res.status(200).json(await service.getTurnos({
      especialidad: typeof especialidad === "string" ? especialidad : undefined,
      fecha: typeof fecha === "string" ? fecha : undefined,
      medicoId: typeof medicoId === "string" ? medicoId : undefined
    }));
  } catch (e) { next(e); }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try { res.status(200).json(await service.getTurno(Number(req.params.id))); } catch (e) { next(e); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await service.createTurno(req.body)); } catch (e) { next(e); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try { res.status(200).json(await service.updateTurno(Number(req.params.id), req.body)); } catch (e) { next(e); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try { await service.deleteTurno(Number(req.params.id)); res.status(204).send(); } catch (e) { next(e); }
}
