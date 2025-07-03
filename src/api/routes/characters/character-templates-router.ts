import { Router } from "express";
import type { Request, Response } from "express";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

import { validateCreateCharacterTemplate } from "./middlewares/character-templates-validation";

import type {
  INewCharacterTemplateReq,
  IRerollAbilitiesReq,
  IUpdateCharacterTemplateReq,
} from "../../../services/character-templates/character-templates-interfaces";

const router = Router();

router.post("/", validateCreateCharacterTemplate, async (req: Request, res: Response): Promise<void> => {
  try {
    const newCharacterTemplateReq: INewCharacterTemplateReq = {
      character_name: req.body.character_name,
      class_id: req.body.class_id,
      character_level: req.body.character_level,
      strength_id: req.body.strength_id,
      dexterity_id: req.body.dexterity_id,
      constitution_id: req.body.constitution_id,
      armor_type_id: req.body.armor_type_id,
      character_type: req.body.character_type,
      character_description: req.body.character_description,
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

router.post("/:id/reroll-abilities", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const rerolAbilitiesReq: IRerollAbilitiesReq = {
      id: Number(id),
      strength: req.body.strength === true,
      dexterity: req.body.dexterity === true,
      constitution: req.body.constitution === true,
    };
    const characterTemplate = await characterTemplatesService.rerollAbilities(rerolAbilitiesReq);
    const response = {
      message: "Character template abilities rerolled",
      data: {
        characterTemplate,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error rerolling abilities in character template: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateCharacterTemplateReq: IUpdateCharacterTemplateReq = {
      id: Number(id),
      character_name: req.body.character_name,
      class_id: req.body.class_id,
      character_level: req.body.character_level,
      strength_id: req.body.strength_id,
      dexterity_id: req.body.dexterity_id,
      constitution_id: req.body.constitution_id,
      armor_type_id: req.body.armor_type_id,
      hit_dices: req.body.hit_dices,
      character_type: req.body.character_type,
      character_description: req.body.character_description,
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
    res.status(200).json(response);
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
