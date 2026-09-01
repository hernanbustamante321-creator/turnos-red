import { NextFunction, Request, Response } from "express";

export interface ApiError {
  status?: number;
  message?: string;
  code?: string;
  details?: unknown[];
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status ?? 500;
  res.status(status).json({
    status,
    message: err.message ?? "Error interno del servidor",
    code: err.code ?? "INTERNAL_ERROR",
    details: err.details ?? []
  });
};
