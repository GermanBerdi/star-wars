import { Router, Request, Response } from "express";
import { INewCharacterReq, IUpdateCharacterReq } from "../../services/characters/characters-interfaces";
import characterService from "../../services/characters/characters-service";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, hp, strength, defense, speed } = req.body;
    if (!name) {
      res.status(400).json({ message: "Name is required." });
      return;
    }
    const newCharacter: INewCharacterReq = {
      name,
      hp: hp ?? 0,
      strength: strength ?? 0,
      defense: defense ?? 0,
      speed: speed ?? 0,
    };
    const characterCreated = await characterService.create(newCharacter);
    const response = {
      message: "Character created",
      data: {
        characterCreated,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    const errorMessage = `Error creating character: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, hp, strength, defense, speed } = req.body;
    const characterToUpdate: IUpdateCharacterReq = {
      id: Number(id),
      name,
      hp,
      strength,
      defense,
      speed,
    };
    const charaterUpdated = await characterService.update(characterToUpdate);
    const response = {
      message: "Character updated",
      data: {
        charaterUpdated,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error updating character: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const characters = await characterService.getAll();
    const response = {
      message: "Characters list",
      data: {
        characters,
      },
    };
    res.json(response);
  } catch (error) {
    const errorMessage = `Error getting characters: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const character = await characterService.getById(id);
    if (!character) {
      res.status(404).json({ error: "Character not found" });
      return;
    }
    const response = {
      message: "Character info",
      data: {
        character,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting character: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

export default router;
