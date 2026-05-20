import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { DiskStorage } from "@/providers/DiskStorage";

class AvatarUserController {
  async update(request: Request, response: Response) {
    const user_id = request.user?.id;
    const avatarFileName = request.file?.filename;

    const diskStorage = new DiskStorage();

    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar",
        401,
      );
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFileName!);

    await prisma.user.update({
      where: { id: user_id },
      data: { avatar: filename },
    });

    return response.json({ avatar: filename });
  }
}

export { AvatarUserController };
