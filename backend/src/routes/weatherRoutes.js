import { Router } from "express";
import { fetchForecast, getSearchHistory } from "../controllers/weatherController.js";

const router = Router();

router.get("/forecast", fetchForecast);
router.get("/history", getSearchHistory);

export default router;
