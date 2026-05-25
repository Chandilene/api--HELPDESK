import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class AvatarUserController {
  async update(request: Request, response: Response) {
    const user_id = request.user?.id;
    const { avatar } = request.body;

    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (avatar === undefined) {
      throw new AppError("A imagem em formato Base64 não foi fornecida.", 400);
    }

    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar",
        401,
      );
    }

    await prisma.user.update({
      where: { id: user_id },
      data: { avatar: avatar },
    });

    return response.json({ avatar: avatar });
  }
}

export { AvatarUserController };
