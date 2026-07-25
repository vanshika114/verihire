import { Router } from "express";
import { listOffers } from "../controllers/offer.controller.js";

const router = Router();

router.get("/api/offers", listOffers);

export default router;
