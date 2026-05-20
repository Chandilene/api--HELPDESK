import { Router } from "express";
import { TicketsController } from "@/controllers/TicketsController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const ticketsRoutes = Router();
const ticketsController = new TicketsController();

ticketsRoutes.get("/", ensureAuthenticated, ticketsController.index);
ticketsRoutes.get("/:id", ensureAuthenticated, ticketsController.showDetails);

ticketsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["CUSTOMER"]),
  ticketsController.create,
);

ticketsRoutes.patch(
  "/:id/status",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN", "TECHNICIAN"]),
  ticketsController.updateStatus,
);

ticketsRoutes.post(
  "/:id/services",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN", "TECHNICIAN"]),
  ticketsController.addService,
);

ticketsRoutes.delete(
  "/services/:ticketServiceId",
  ensureAuthenticated,
  verifyUserAuthorization(["ADMIN", "TECHNICIAN"]),
  ticketsController.delete,
);

export { ticketsRoutes };
