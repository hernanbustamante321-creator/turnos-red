import { promises as fs } from "node:fs";
import path from "node:path";

export async function readJson<T>(fileName: string, fallback: T): Promise<T> {
  const dir = process.env.DATA_DIR ?? "./data";
  const file = path.resolve(dir, fileName);
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

export async function writeJson<T>(fileName: string, data: T): Promise<void> {
  const dir = process.env.DATA_DIR ?? "./data";
  const file = path.resolve(dir, fileName);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}
