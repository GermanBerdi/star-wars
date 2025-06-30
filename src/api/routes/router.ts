import { Router } from "express";

import healthRouter from "./health/health-router";
import abilitiesRouter from "./abilities/abilities-router";
import characterRouter from "./characters/characters-router";
import fightsRouter from "./fights/fights-router";
import starshipsRouter from "./starships/starships-route";

const router = Router();

router.use("/health", healthRouter);
router.use("/abilities", abilitiesRouter);
router.use("/characters", characterRouter);
router.use("/fights", fightsRouter);
router.use("/starships", starshipsRouter);

export default router;
