import { Router } from "express";
const router = Router();

import { DashboardController } from "../controller/DashboardController";

router.post('/obtener/', DashboardController.obtenerDashboard);

export default router;