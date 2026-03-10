import { promises as fs } from "fs";
import path from "path";
import { SessionAttempt } from "@/lib/types";

const filePath = path.join(process.cwd(), "data", "attempts.json");

async function ensure() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

export async function getAttempts(): Promise<SessionAttempt[]> {
  await ensure();
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as SessionAttempt[];
}

export async function saveAttempt(attempt: SessionAttempt) {
  const list = await getAttempts();
  list.unshift(attempt);
  await fs.writeFile(filePath, JSON.stringify(list.slice(0, 200), null, 2), "utf-8");
}
