import { Router, Request, Response } from "express";

import characterTemplatesService from "../../services/character-templates/character-templates-service";
import {
  INewCharacterTemplateReq,
  IUpdateCharacterTemplateReq,
} from "../../services/character-templates/character-templates-interfaces";
import { CharacterType } from "../../services/character-templates/character-templates-enums";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { character_name, strength, defense, speed, hp, character_type, character_description } = req.body;
    if (!character_name) {
      res.status(400).json({ message: "character_name is required." });
      return;
    }
    const newCharacterTemplateReq: INewCharacterTemplateReq = {
      character_name,
      strength: strength ?? 0,
      defense: defense ?? 0,
      speed: speed ?? 0,
      hp: hp ?? 0,
      character_type: character_type ?? CharacterType.COMMON,
      character_description: character_description ?? null,
    };
    const characterTemplate = await characterTemplatesService.create(newCharacterTemplateReq);
    const response = {
      message: "Character template created",
      data: {
        characterTemplate,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    const errorMessage = `Error creating character template: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { character_name, hp, strength, defense, speed, character_type, character_description } = req.body;
    const updateCharacterTemplateReq: IUpdateCharacterTemplateReq = {
      id: Number(id),
      character_name,
      strength,
      defense,
      speed,
      hp,
      character_type,
      character_description,
    };
    const characterTemplate = await characterTemplatesService.update(updateCharacterTemplateReq);
    const response = {
      message: "Character template updated",
      data: {
        characterTemplate,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error updating character template: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const characterTemplates = await characterTemplatesService.getAll();
    const response = {
      message: "Character templates list",
      data: {
        characterTemplates,
      },
    };
    res.json(response);
  } catch (error) {
    const errorMessage = `Error getting character templates: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const characterTemplate = await characterTemplatesService.getById(id);
    const response = {
      message: "Character template info",
      data: {
        characterTemplate,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting character template: ${error}`;
    if (errorMessage.includes("not found")) {
      res.status(404).json({ errorMessage });
      return;
    }
    res.status(500).json({ errorMessage });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await characterTemplatesService.remove(id);
    const response = {
      message: "Character template deleted",
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error deleting character template: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

export default router;
