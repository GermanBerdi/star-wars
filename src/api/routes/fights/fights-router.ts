import { Router } from "express";

import fightsMainRouter from "./fights-main-router";
import fightsParticipantsRouter from "./fights-participants-router";
//import fightsActionsRouter from "./fights-actions-router";

const router = Router();

router.use("/", fightsMainRouter);
router.use("/:fightId/participants", fightsParticipantsRouter);
//router.use("/:fightId/actions", fightsActionsRouter);

export default router;
