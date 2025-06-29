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
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting constitution modifiers: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const constitutionModifier = await abilityConstitutionService.getById(id);
    const response = {
      message: "Constitution modifier",
      data: {
        constitutionModifier,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting constitution modifier: ${error}`;
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

export default router;
