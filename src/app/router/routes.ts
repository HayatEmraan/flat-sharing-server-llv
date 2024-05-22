import { Router } from "express";
import { bookingRoutes } from "../modules/booking/booking.routes";
import flatRoutes from "../modules/flat/flat.routes";
import userRoutes from "../modules/user/user.routes";
import authRoutes from "../modules/auth/auth.routes";

const routes = Router();

const bulkRoutes = [
  {
    path: "/auth",
    routePath: authRoutes,
  },
  {
    path: "/profile",
    routePath: userRoutes,
  },
  {
    path: "/flats",
    routePath: flatRoutes,
  },
  {
    path: "/booking-applications",
    routePath: bookingRoutes.bookingApplication,
  },
  {
    path: "/booking-requests",
    routePath: bookingRoutes.bookingRequest,
  },
];

bulkRoutes.forEach((route) => routes.use(route.path, route.routePath));

export default routes;
