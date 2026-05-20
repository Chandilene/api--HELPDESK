import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class ServicesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(4, { message: "Nome do serviço é obrigatório" }),
      price: z.number().positive("O preço deve ser um valor positivo"),
    });

    const { name, price } = bodySchema.parse(request.body);

    const service = await prisma.service.create({
      data: { name, price },
    });

    return response.status(201).json(service);
  }

  async index(request: Request, response: Response) {
    const { role } = request.user as { role: string };

    let whereClause = {};

    if (role !== "ADMIN") {
      whereClause = { isActive: true };
    }

    const services = await prisma.service.findMany({
      where: whereClause,
      orderBy: {
        name: "asc",
      },
    });

    return response.json(services);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(4, { message: "Nome do serviço é obrigatório" })
        .optional(),
      price: z
        .number()
        .positive("O preço deve ser um valor positivo")
        .optional(),
      isActive: z.boolean().optional(),
    });

    const { name, price, isActive } = bodySchema.parse(request.body);

    const updateService = await prisma.service.update({
      where: { id },
      data: {
        name,
        price,
        isActive,
      },
    });

    return response.json(updateService);
  }
}

export { ServicesController };
