import { Router } from "express";
import { ServicesController } from "@/controllers/ServicesController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const servicesRoutes = Router();
const servicesController = new ServicesController();

servicesRoutes.get("/", ensureAuthenticated, servicesController.index);

servicesRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  servicesController.create,
);

servicesRoutes.put(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN"]),
  servicesController.update,
);

export { servicesRoutes };
