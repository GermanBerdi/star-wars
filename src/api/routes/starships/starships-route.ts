import { Router } from "express";
import type { Request, Response } from "express";

import { getAllStarships } from "../../../db/starships/starships-repo";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const starships = await getAllStarships();
    const response = {
      message: "Starships list",
      data: {
        starships,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error fetching starships: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

export default router;
