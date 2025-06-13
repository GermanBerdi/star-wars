import { Router } from "express";
import charactersRouter from "./routes/characters-router";
import fightsRouter from "./routes/fights-router";
import healthRouter from "./routes/health-router";
import starshipsRouter from "./routes/starships-route";

const router = Router();

router.use("/health", healthRouter);
router.use("/characters", charactersRouter);
router.use("/fights", fightsRouter);
router.use("/starships", starshipsRouter);

export default router;
