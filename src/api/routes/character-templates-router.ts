import { Router, Request, Response } from "express";

import characterTemplatesService from "../../services/character-templates/character-templates-service";
import { INewCharacterTemplateReq, IUpdateCharacterTemplateReq } from "../../services/character-templates/character-templates-interfaces";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { character_name, hp, strength, defense, speed } = req.body;
    if (!character_name) {
      res.status(400).json({ message: "character_name is required." });
      return;
    }
    const newCharacterTemplate: INewCharacterTemplateReq = {
      character_name,
      hp: hp ?? 0,
      strength: strength ?? 0,
      defense: defense ?? 0,
      speed: speed ?? 0,
    };
    const characterTemplateCreated = await characterTemplatesService.create(newCharacterTemplate);
    const response = {
      message: "Character template created",
      data: {
        characterCreated: characterTemplateCreated,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    const errorMessage = `Error creating character template: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { character_name, hp, strength, defense, speed } = req.body;
    const characterTemplateToUpdate: IUpdateCharacterTemplateReq = {
      id: Number(id),
      character_name,
      hp,
      strength,
      defense,
      speed,
    };
    const characterTemplateUpdated = await characterTemplatesService.update(characterTemplateToUpdate);
    const response = {
      message: "Character template updated",
      data: {
        charaterUpdated: characterTemplateUpdated,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error updating character template: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const characterTemplates = await characterTemplatesService.getAll();
    const response = {
      message: "Character templates list",
      data: {
        characters: characterTemplates,
      },
    };
    res.json(response);
  } catch (error) {
    const errorMessage = `Error getting character templates: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const characterTemplate = await characterTemplatesService.getById(id);
    if (!characterTemplate) {
      res.status(404).json({ error: "Character template not found" });
      return;
    }
    const response = {
      message: "Character template info",
      data: {
        character: characterTemplate,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting character template: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ errorMessage });
  }
});

export default router;
