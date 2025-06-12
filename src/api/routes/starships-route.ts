import { Router, Request, Response } from "express";
import { getAllStarships } from "../../db/startships/starships-repo";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const starships = await getAllStarships();
    res.json(starships);
  } catch (error) {
    console.error("Error fetching starships:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
