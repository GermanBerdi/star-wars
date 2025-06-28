import { Router } from "express";

import strengthRouter from "./abilities-strength-router";
import dexterityRouter from "./abilities-dexterity-router";
import constitutionRouter from "./abilities-constitution-router";

const router = Router();

router.use("/strength", strengthRouter);
router.use("/dexterity", dexterityRouter);
router.use("/constitution", constitutionRouter);

export default router;
