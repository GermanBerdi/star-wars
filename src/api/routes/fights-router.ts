import { Router, Request, Response } from "express";

import fightsService from "../../services/fights/fights-service";
import { INewFightReq } from "../../services/fights/fights-interfaces";
import fightsParticipantsRouter from "./fights-participants-router";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { fight_name } = req.body;
    if (!fight_name) {
      res.status(400).json({ message: "fight_name is required." });
      return;
    }
    const newFightReq: INewFightReq = {
      fight_name,
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
    const errorMessage = `Error creating Fight: ${error}`;
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
    res.json(response);
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

router.use("/:fightId/participants", fightsParticipantsRouter);

export default router;
