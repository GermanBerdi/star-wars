import { Router } from "express";

import healthRouter from "./routes/health-router";
import abilitiesRouter from "./routes/abilities/abilities-router";
import armorTypesRouter from "./routes/armor-types-router";
import characterTemplatesRouter from "./routes/character-templates-router";
import fightsRouter from "./routes/fights-router";
import starshipsRouter from "./routes/starships-route";

const router = Router();

router.use("/health", healthRouter);
router.use("/abilities", abilitiesRouter);
router.use("/armor-types", armorTypesRouter);
router.use("/character-templates", characterTemplatesRouter);
router.use("/fights", fightsRouter);
router.use("/starships", starshipsRouter);

export default router;
