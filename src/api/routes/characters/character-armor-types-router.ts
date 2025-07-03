import { Router } from "express";
import type { Request, Response } from "express";

import armorTypesService from "../../../services/armor-types/armor-types-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const characterTemplates = await armorTypesService.getAll();
    const response = {
      message: "Armor types list",
      data: {
        characterTemplates,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting armor types: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

export default router;
