import { Router } from "express";

import healthRouter from "./routes/health-router";
import abilitiesRouter from "./routes/abilities/abilities-router";
import armorTypesRouter from "./routes/armor-types-router";
import characterRouter from "./routes/character/character-router";
import fightsRouter from "./routes/fights-router";
import starshipsRouter from "./routes/starships-route";
import thac0sRouter from "./routes/thac0s-router";

const router = Router();

router.use("/health", healthRouter);
router.use("/abilities", abilitiesRouter);
router.use("/armor-types", armorTypesRouter);
router.use("/character", characterRouter);
router.use("/fights", fightsRouter);
router.use("/starships", starshipsRouter);
router.use("/thac0s", thac0sRouter);

export default router;
