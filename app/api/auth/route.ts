import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const scrypt = promisify(scryptCallback);
type User = { email: string; role: "student" | "teacher"; salt: string; passwordHash: string };
const dataDirectory = path.join(process.cwd(), ".data");
const usersFile = path.join(dataDirectory, "users.json");

async function readUsers(): Promise<User[]> {
  try {
    const users: unknown = JSON.parse(await readFile(usersFile, "utf8"));
    return Array.isArray(users) ? users as User[] : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function saveUsers(users: User[]) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(usersFile, JSON.stringify(users, null, 2), "utf8");
}

export async function POST(request: Request) {
  let body: { action?: string; email?: string; password?: string; role?: string };
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 }); }
  const email = body.email?.trim().toLowerCase();
  const password = body.password;
  if (!email || !password) return NextResponse.json({ error: "Email dan kata sandi wajib diisi." }, { status: 400 });
  const users = await readUsers();

  if (body.action === "signup") {
    if (password.length < 8) return NextResponse.json({ error: "Kata sandi minimal 8 karakter." }, { status: 400 });
    if (users.some((user) => user.email === email)) return NextResponse.json({ error: "Email ini sudah terdaftar. Silakan masuk." }, { status: 409 });
    const salt = randomBytes(16).toString("hex");
    const passwordHash = (await scrypt(password, salt, 64) as Buffer).toString("hex");
    const role = body.role === "teacher" ? "teacher" : "student";
    users.push({ email, role, salt, passwordHash });
    await saveUsers(users);
    return NextResponse.json({ email, role });
  }

  if (body.action === "login") {
    const user = users.find((item) => item.email === email);
    if (!user) return NextResponse.json({ error: "Email atau kata sandi kurang tepat. Coba lagi." }, { status: 401 });
    const candidate = await scrypt(password, user.salt, 64) as Buffer;
    const savedHash = Buffer.from(user.passwordHash, "hex");
    if (candidate.length !== savedHash.length || !timingSafeEqual(candidate, savedHash)) {
      return NextResponse.json({ error: "Email atau kata sandi kurang tepat. Coba lagi." }, { status: 401 });
    }
    return NextResponse.json({ email, role: user.role });
  }
  return NextResponse.json({ error: "Aksi tidak dikenal." }, { status: 400 });
}
