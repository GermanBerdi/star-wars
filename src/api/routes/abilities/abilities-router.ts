import { Router } from "express";

import strengthRouter from "./ability-strength-router";
import dexterityRouter from "./ability-dexterity-router";
import constitutionRouter from "./ability-constitution-router";
import intelligenceRouter from "./ability-intelligence-router";
import wisdomRouter from "./ability-wisdom-router";
import charismaRouter from "./ability-charisma-router";

const router = Router();

router.use("/strength", strengthRouter);
router.use("/dexterity", dexterityRouter);
router.use("/constitution", constitutionRouter);
router.use("/intelligence", intelligenceRouter);
router.use("/wisdom", wisdomRouter);
router.use("/charisma", charismaRouter);

export default router;
