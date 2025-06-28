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
    res.json(response);
  } catch (error) {
    const errorMessage = `Error getting dexterity modifiers: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

export default router;
