import { Router } from "express";
import type { Request, Response } from "express";

import abilitiesService from "../../../services/abilities/abilities-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const strengthModifiers = await abilitiesService.strength.getAll();
    const response = {
      message: "Strength modifiers",
      data: {
        strengthModifiers,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting strength modifiers: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const strengthModifier = await abilitiesService.strength.getById(id);
    const response = {
      message: "Strength modifier",
      data: {
        strengthModifier,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting strength modifier: ${error}`;
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

export default router;
