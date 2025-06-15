import { Router, Request, Response } from "express";
import fightService from "../../services/fights/fights-service";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id1, id2 } = req.body;
    if (!id1 || !id2) {
      res.status(400).json({ message: "id1 and id2 are required." });
      return;
    }
    const fight = await fightService.create(id1, id2);
    const response = {
      message: "Fight created",
      data: {
        fight,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    const errorMessage = `Error creating Fight: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const fights = await fightService.listAll();
    const response = {
      message: "Fights list",
      data: {
        fights,
      },
    };
    res.json(response);
  } catch (error) {
    const errorMessage = `Error fetching fights: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

export default router;
