import { Router } from "express";

import armorTypesRouter from "./character-armor-types-router";
import classesRouter from "./character-classes-router";
import templatesRouter from "./character-templates-router";
import thac0sRouter from "./character-thac0s-router";

const router = Router();

router.use("/armor-types", armorTypesRouter);
router.use("/classes", classesRouter);
router.use("/templates", templatesRouter);
router.use("/thac0s", thac0sRouter);

export default router;
