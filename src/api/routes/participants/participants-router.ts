import { Router } from "express";
import type { Request, Response } from "express";

import participantsService from "../../../services/participants/participants-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const participants = await participantsService.getAll();
    const response = {
      message: "Participants list",
      data: {
        participants,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting participants: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const participant = await participantsService.getById(id);
    const response = {
      message: "Participant info",
      data: {
        participant,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting participant: ${error}`;
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

export default router;
