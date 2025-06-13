import { Router, Request, Response } from "express";
import { INewFight } from "../../db/fights/fights-interfaces";
import { getCharacterById } from "../../db/characters/characters-repo";
import { createFight, getAllFights } from "../../db/fights/fights-repo";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id1, id2 } = req.body;
    if (!id1 || !id2) {
      res.status(400).json({ message: "id1 and id2 are required." });
      return;
    }
    const character1 = await getCharacterById(id1);
    const character2 = await getCharacterById(id2);
    if (!character1) {
      res.status(400).json({ message: `Character with id ${id1} not found.` });
      return;
    }
    if (!character2) {
      res.status(400).json({ message: `Character with id ${id2} not found.` });
      return;
    }
    const newFight: INewFight = {
      character1_id: character1.id,
      character2_id: character2.id,
      character1_current_hp: character1.hp,
      character2_current_hp: character2.hp,
    };
    const fight = await createFight(newFight);
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
    const fights = await getAllFights();
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
