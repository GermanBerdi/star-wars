import { Router } from "express";
import characterTemplatesRouter from "./routes/character-templates-router";
import fightsRouter from "./routes/fights-router";
import healthRouter from "./routes/health-router";
import starshipsRouter from "./routes/starships-route";

const router = Router();

router.use("/health", healthRouter);
router.use("/character-templates", characterTemplatesRouter);
router.use("/fights", fightsRouter);
router.use("/starships", starshipsRouter);

export default router;
