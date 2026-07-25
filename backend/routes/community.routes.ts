import { Router } from "express";

const router = Router();

router.get("/api/community", (_req, res) => {
  res.status(200).json({ success: true, message: "Community placeholder", data: [] });
});

export default router;
