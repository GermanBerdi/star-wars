import { Router } from "express";
import type { Request, Response } from "express";

import abilitiesService from "../../../services/abilities/abilities-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const wisdomModifiers = await abilitiesService.wisdom.getAll();
    const response = {
      message: "Wisdom modifiers",
      data: {
        wisdomModifiers,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting wisdom modifiers: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const wisdomModifier = await abilitiesService.wisdom.getById(id);
    const response = {
      message: "Wisdom modifier",
      data: {
        wisdomModifier,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting wisdom modifier: ${error}`;
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

export default router;
