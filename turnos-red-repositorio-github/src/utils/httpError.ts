export const httpError = (
  status: number,
  message: string,
  code: string,
  details: unknown[] = []
) => ({ status, message, code, details });
