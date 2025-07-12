import { Router } from "express";
import type { Request, Response } from "express";

import fightsService from "../../../services/fights/fights-service";

import { validateCreateFight } from "./middlewares/fights-validation";

import type { INewFightReq, IUpdateFightReq } from "../../../services/fights/fights-interfaces";

const router = Router();

router.post("/", validateCreateFight, async (req: Request, res: Response): Promise<void> => {
  try {
    const { fight_name, available_teams } = req.body;
    const newFightReq: INewFightReq = {
      fight_name,
      available_teams,
    };
    const fight = await fightsService.create(newFightReq);
    const response = {
      message: "Fight created",
      data: {
        fight,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    const errorMessage = `Error creating fight: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.post("/:id/set-participants-order", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const fight = await fightsService.setParticipantsOrder(id);
    const response = {
      message: "Fight updated",
      data: {
        fight,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error setting participants-order: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { fight_name, available_teams, turn, pending_participants, fight_status, winner_id } = req.body;
    const updateFightReq: IUpdateFightReq = {
      id,
      fight_name,
      available_teams,
      turn,
      pending_participants,
      fight_status,
      winner_id,
    };
    const fight = await fightsService.update(updateFightReq);
    const response = {
      message: "Fight updated",
      data: {
        fight,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error updating fight: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const fights = await fightsService.getAll();
    const response = {
      message: "Fights list",
      data: {
        fights,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting fights: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const fight = await fightsService.getById(id);
    const response = {
      message: "Fight info",
      data: {
        fight,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting fight: ${error}`;
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await fightsService.remove(id);
    const response = {
      message: "Fight deleted",
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error deleting fight: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

export default router;
