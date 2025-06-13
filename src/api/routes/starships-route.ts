import { Router, Request, Response } from "express";
import { getAllStarships } from "../../db/starships/starships-repo";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const starships = await getAllStarships();
    res.json(starships);
  } catch (error) {
    const errorMessage = `Error fetching starships: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

export default router;
