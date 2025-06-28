import { Router } from "express";

import classesRouter from "./character-classes-router";
import templatesRouter from "./character-templates-router";

const router = Router();

router.use("/classes", classesRouter);
router.use("/templates", templatesRouter);

export default router;
