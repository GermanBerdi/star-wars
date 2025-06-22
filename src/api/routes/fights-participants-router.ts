import { Router, Request, Response } from "express";

import participantsService from "../../services/participants/participants-service";
import { INewParticipantReq } from "../../services/participants/participants-interfaces";

const router = Router({ mergeParams: true });

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const fightId = Number(req.params.fightId);  
    const { character_template_id, participant_name, is_alive, team_id } = req.body;
    if (!character_template_id) {
      res.status(400).json({ message: "character_template_id is required." });
      return;
    }
    if (!participant_name) {
      res.status(400).json({ message: "participant_name is required." });
      return;
    }
    
    const newParticipantReq: INewParticipantReq = {
      fightId,
      character_template_id,
      participant_name,
      is_alive: is_alive ?? true,
      team_id: team_id ?? null,
    };
    const participant = await participantsService.create(newParticipantReq);
    const response = {
      message: "Participant created",
      data: {
        participant,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    const errorMessage = `Error creating Participant: ${error}`;
    if (errorMessage.includes("Participant with name")) {
      res.status(400).json({ errorMessage });
      return;
    }
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const fightId = Number(req.params.fightId);
    const participants = await participantsService.getByFightId(fightId);
    const response = {
      message: "Fight participants list",
      data: {
        participants,
      },
    };
    res.json(response);
  } catch (error) {
    const errorMessage = `Error getting participants: ${error}`;
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

export default router;
