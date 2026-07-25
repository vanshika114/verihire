import { Router } from "express";
import { getReports } from "../controllers/report.controller.js";

const router = Router();

router.get("/api/reports", getReports);

export default router;
