import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateBody = (schema: ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message
      }));
      return next({
        status: 400,
        message: "Error de validación en los datos ingresados",
        code: "VALIDATION_ERROR",
        details
      });
    }
    req.body = result.data;
    next();
  };
