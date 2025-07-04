import { Router } from "express";
import type { Request, Response } from "express";

import abilitiesService from "../../../services/abilities/abilities-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const charismaModifiers = await abilitiesService.charisma.getAll();
    const response = {
      message: "Charisma modifiers",
      data: {
        charismaModifiers,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting charisma modifiers: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const charismaModifier = await abilitiesService.charisma.getById(id);
    const response = {
      message: "Charisma modifier",
      data: {
        charismaModifier,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting charisma modifier: ${error}`;
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

export default router;
