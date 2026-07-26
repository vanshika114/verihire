import { Router } from "express";
import multer from "multer";
import { analyzeEmail, analyzeImage, analyzePdf, analyzeUrl } from "../controllers/analysis.controller.js";
import { validateBody, validateFile } from "../middleware/validation.middleware.js";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get("/", (_req, res) => {
    res.status(200).json({ success: true, message: "VeriHire AI backend is running", data: { service: "VeriHire AI", version: "1.0.0" } });
});
router.get("/health", (_req, res) => {
    res.status(200).json({ success: true, message: "healthy", data: { status: "ok" } });
});
router.post("/api/analyze/url", validateBody(["url"]), analyzeUrl);
router.post("/api/analyze/email", validateBody(["email"]), analyzeEmail);
router.post("/api/analyze/pdf", upload.single("file"), validateFile, analyzePdf);
router.post("/api/analyze/image", upload.single("file"), validateFile, analyzeImage);
router.post("/url", analyzeUrl);
export default router;
