import { Router, Request, Response } from "express";
import { INewCharacter } from "../../db/characters/characters-interfaces";
import { createCharacter, getAllCharacters } from "../../db/characters/characters-repo";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, hp, strength, defense, speed } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required." });
      return;
    }

    const newCharacter: INewCharacter = {
      name,
      hp: hp ?? 0,
      strength: strength ?? 0,
      defense: defense ?? 0,
      speed: speed ?? 0,
    };
    const result = await createCharacter(newCharacter);
    res.status(201).json(result);
  } catch (error) {
    const errorMessage = `Error creating character: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const characters = await getAllCharacters();
    res.json(characters);
  } catch (error) {
    const errorMessage = `Error fetching characters: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

export default router;
