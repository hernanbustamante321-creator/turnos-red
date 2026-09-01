import { Request, Response, NextFunction } from "express";
import * as service from "../services/medico.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { especialidad, disponible } = req.query;
    res.status(200).json(await service.getMedicos({
      especialidad: typeof especialidad === "string" ? especialidad : undefined,
      disponible: typeof disponible === "string" ? disponible : undefined
    }));
  } catch (e) { next(e); }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try { res.status(200).json(await service.getMedico(Number(req.params.id))); } catch (e) { next(e); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await service.createMedico(req.body)); } catch (e) { next(e); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try { res.status(200).json(await service.updateMedico(Number(req.params.id), req.body)); } catch (e) { next(e); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try { await service.deleteMedico(Number(req.params.id)); res.status(204).send(); } catch (e) { next(e); }
}
