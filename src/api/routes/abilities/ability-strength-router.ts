import { Router, Request, Response } from "express";

import abilityStrengthService from "../../../services/abilities/ability-strength-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const strengthModifiers = await abilityStrengthService.getAll();
    const response = {
      message: "Strength modifiers",
      data: {
        strengthModifiers,
      },
    };
    res.json(response);
  } catch (error) {
    const errorMessage = `Error getting strength modifiers: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

export default router;
