import { Router } from "express";
import type { Request, Response } from "express";

import actionService from "../../../services/actions/actions-service";

import type { IPerformActionReq } from "../../../services/actions/actions-interfaces";

const router = Router({ mergeParams: true });

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const fightId = Number(req.params.fightId);
    const { actorParticipantId, targetParticipantId } = req.body;
    const performActionReq: IPerformActionReq = {
      fightId,
      actorParticipantId,
      targetParticipantId,
    };
    const actionPerformed = await actionService.performAction(performActionReq);
    const response = {
      message: "Action performed",
      data: {
        actionPerformed,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error performing action: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

export default router;
