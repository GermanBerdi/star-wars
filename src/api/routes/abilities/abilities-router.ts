import { Router } from "express";

import strengthRouter from "./ability-strength-router";
import dexterityRouter from "./ability-dexterity-router";
import constitutionRouter from "./ability-constitution-router";

const router = Router();

router.use("/strength", strengthRouter);
router.use("/dexterity", dexterityRouter);
router.use("/constitution", constitutionRouter);

export default router;
