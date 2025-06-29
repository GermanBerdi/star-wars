import { Router, Request, Response } from "express";

import abilityDexterityService from "../../../services/abilities/ability-dexterity-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const dexterityModifiers = await abilityDexterityService.getAll();
    const response = {
      message: "Dexterity modifiers",
      data: {
        dexterityModifiers,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting dexterity modifiers: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const dexterityModifier = await abilityDexterityService.getById(id);
    const response = {
      message: "Dexterity modifier",
      data: {
        dexterityModifier,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting dexterity modifier: ${error}`;
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

export default router;
