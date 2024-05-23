import { Router } from "express";
import flatRoutes from "../modules/flat/flat.routes";
import userRoutes from "../modules/user/user.routes";
import authRoutes from "../modules/auth/auth.routes";
import bookingRoutes from "../modules/booking/booking.routes";

const routes = Router();

const bulkRoutes = [
  {
    path: "/auth",
    routePath: authRoutes,
  },
  {
    path: "/user",
    routePath: userRoutes,
  },
  {
    path: "/flats",
    routePath: flatRoutes,
  },
  {
    path: "/booking",
    routePath: bookingRoutes,
  },
];

bulkRoutes.forEach((route) => routes.use(route.path, route.routePath));

export default routes;
