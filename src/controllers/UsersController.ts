import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { compare, hash } from "bcryptjs";

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "Insira um nome válido." }),
      email: z.string().email({ message: "Insira um email válido" }),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });
    if (userWithSameEmail) {
      throw new AppError("Já existe um usuario com esse email!");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });
    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }

  async createByAdmin(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "Insira um nome válido." }),
      email: z.string().email({ message: "Insira um email válido" }),
      password: z.string().min(6),
      role: z.enum(["ADMIN", "TECHNICIAN"]),
      schedule: z.array(z.string()).optional(),
    });

    const { name, email, password, role, schedule } = bodySchema.parse(
      request.body,
    );

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });
    if (userWithSameEmail) {
      throw new AppError("Já existe um usuario com esse email!");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        schedule,
      },
    });
    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }

  async index(request: Request, response: Response) {
    const { role } = request.query;

    const users = await prisma.user.findMany({
      where: {
        role: role ? (role as any) : undefined,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        schedule: true,
        createdAt: true,
      },
    });

    return response.json(users);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new AppError("Usuário não encontrado", 404);

    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { id: user_id, role } = request.user as { id: string; role: string };

    if (role !== "ADMIN" && id !== user_id) {
      throw new AppError(
        "Você não tem permissão para editar este perfil.",
        403,
      );
    }

    const bodySchema = z.object({
      name: z.string().trim().min(3).optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
      old_password: z.string().optional(),
      role: z.enum(["ADMIN", "TECHNICIAN", "CUSTOMER"]).optional(),
      schedule: z.array(z.string()).optional(),
    });

    const {
      name,
      email,
      password,
      old_password,
      role: newRole,
      schedule,
    } = bodySchema.parse(request.body);

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError("Usuário não encontrado", 404);

    if (email && email !== user.email) {
      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) throw new AppError("Este e-mail já está em uso.");
    }

    const updateData: any = { name, email };

    if (password) {
      if (!old_password) throw new AppError("Informe a senha antiga.");

      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword)
        throw new AppError("A senha antiga está incorreta.");

      updateData.password = await hash(password, 8);
    }

    if (role === "ADMIN") {
      if (newRole) updateData.role = newRole;
      if (schedule) updateData.schedule = schedule;
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return response.json({ message: "Usuário atualizado com sucesso" });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const { id: user_id, role } = request.user as { id: string; role: string };

    if (role !== "ADMIN" && id !== user_id) {
      throw new AppError(
        "Você não tem permissão para excluir este perfil.",
        403,
      );
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new AppError("Usuário não existe", 404);
    }

    await prisma.user.delete({ where: { id } });

    return response.json({ message: "Usuario removido om sucesso" });
  }
}

export { UsersController };
