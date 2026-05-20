import { Router } from "express";
import { sessionsRoutes } from "./sessionsRoutes";
import { usersRoutes } from "./usersRoutes";
import { servicesRoutes } from "./servicesRoutes";
import { ticketsRoutes } from "./ticketsRoutes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/services", servicesRoutes);
routes.use("/tickets", ticketsRoutes);

export { routes };
