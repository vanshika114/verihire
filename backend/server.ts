import "dotenv/config"; // Must be configured BEFORE importing controllers/services!

import express from "express";
import cors from "cors";
import morgan from "morgan";

import analysisRoutes from "./routes/analysis.routes.js";
import authRoutes from "./routes/auth.routes.js";
import communityRoutes from "./routes/community.routes.js";
import offerRoutes from "./routes/offer.routes.js";
import reportRoutes from "./routes/report.routes.js";
import { globalErrorHandler, notFoundHandler } from "./middleware/error.middleware.js";

console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

const app = express();
const port = Number(process.env.PORT ?? 5000);

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(analysisRoutes);
app.use(authRoutes);
app.use(communityRoutes);
app.use(offerRoutes);
app.use(reportRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`VeriHire AI backend listening on port ${port}`);
});

export default app;