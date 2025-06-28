import { Router, Request, Response } from "express";

import abilityConstitutionService from "../../../services/abilities/ability-constitution-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const constitutionModifiers = await abilityConstitutionService.getAll();
    const response = {
      message: "Constitution modifiers",
      data: {
        constitutionModifiers,
      },
    };
    res.json(response);
  } catch (error) {
    const errorMessage = `Error getting constitution modifiers: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

export default router;
