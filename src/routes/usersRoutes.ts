import { Router } from "express";
import { UsersController } from "@/controllers/UsersController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

import { AvatarUserController } from "@/controllers/AvatarUserController";

const avatarUserController = new AvatarUserController();

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

usersRoutes.post(
  "/admin",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  usersController.createByAdmin,
);

usersRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  usersController.index,
);

usersRoutes.get("/:id", ensureAuthenticated, usersController.show);

usersRoutes.put("/:id", ensureAuthenticated, usersController.update);

usersRoutes.delete("/:id", ensureAuthenticated, usersController.delete);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,

  avatarUserController.update,
);

export { usersRoutes };
