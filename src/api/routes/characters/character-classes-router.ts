import { Router } from "express";
import type { Request, Response } from "express";

import characterClassesService from "../../../services/character-classes/character-classes-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const characterClasses = await characterClassesService.getAll();
    const response = {
      message: "Character classes list",
      data: {
        characterClasses,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting character classes: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

export default router;
