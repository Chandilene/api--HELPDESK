import { authConfig } from "@/configs/auth";
import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import z from "zod";

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new AppError("Email ou senha inválido", 401);
    }

    const verifyPassword = await compare(password, user.password);
    if (!verifyPassword) {
      throw new AppError("Email ou senha inválido", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ role: user.role ?? "CUSTOMER" }, String(secret), {
      subject: String(user.id),
      expiresIn: String(expiresIn),
    });

    const { password: hashedPassword, ...userWithoutPassword } = user;

    return response.json({ token, user: userWithoutPassword });
  }
}

export { SessionsController };
