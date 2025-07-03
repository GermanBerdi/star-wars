import { Router } from "express";
import type { Request, Response } from "express";

import thac0sService from "../../../services/thac0s/thac0s-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const thac0s = await thac0sService.getAll();
    const response = {
      message: "Touch armor class 0 list",
      data: {
        thac0s,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting thac0s: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

export default router;
