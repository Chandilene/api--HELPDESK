import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";

function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user || !role.includes(request.user.role)) {
      throw new AppError("Não autorizado!", 401);
    }

    next();
  };
}

export { verifyUserAuthorization };
