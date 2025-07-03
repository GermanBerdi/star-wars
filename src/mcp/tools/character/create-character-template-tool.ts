import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

import { CharacterType } from "../../../services/character-templates/character-templates-enums";

import type { INewCharacterTemplateReq } from "../../../services/character-templates/character-templates-interfaces";

const toolName = "combat-system_characterTemplates_create";

const description =
  "Creates a new character template for AD&D 2nd edition combat system. The system automatically calculates all derived stats (AC, HP, THAC0, hit dice) based on the provided parameters. Use the List tools to explore available classes, armor types, and ability scores before creating your character.";

const paramsSchema = {
  character_name: z
    .string()
    .describe("The name of the character template (e.g., 'Aragorn', 'Fire Mage', 'Orc Soldier', 'Goblin Warrior')"),
  class_id: z
    .number()
    .describe(
      "Character class ID. Use 'List Character Classes' to see available classes (warrior, priest, rogue, wizard groups)",
    ),
  character_level: z
    .number()
    .min(1)
    .describe("Character level (1+) - affects hit dice, hit points, and THAC0 calculations"),
  strength_id: z
    .string()
    .optional()
    .describe(
      "Strength attribute ID (optional). If not provided, will be rolled randomly. Use 'List Strength Abilities' to see available values and their combat modifiers",
    ),
  dexterity_id: z
    .number()
    .optional()
    .describe(
      "Dexterity attribute ID (optional). If not provided, will be rolled randomly. Use 'List Dexterity Abilities' to see available values and their AC/missile bonuses",
    ),
  constitution_id: z
    .number()
    .optional()
    .describe(
      "Constitution attribute ID (optional). If not provided, will be rolled randomly. Use 'List Constitution Abilities' to see available values and their HP modifiers",
    ),
  armor_type_id: z
    .number()
    .describe("Armor type ID. Use 'List Armor Types' to see all available armor options with their armor class values"),
  character_type: z
    .nativeEnum(CharacterType)
    .default(CharacterType.COMMON)
    .describe(
      "Character type: 'unique' for named heroes/villains (single use), 'common' for reusable templates like soldiers, goblins, etc.",
    ),
  character_description: z
    .string()
    .optional()
    .describe("Optional description or lore about the character, combat notes, or tactical information"),
};

const cb: ToolCallback<typeof paramsSchema> = async ({
  character_name,
  class_id,
  character_level,
  strength_id,
  dexterity_id,
  constitution_id,
  armor_type_id,
  character_type,
  character_description,
}: INewCharacterTemplateReq) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const newCharacterTemplate: INewCharacterTemplateReq = {
      character_name,
      class_id,
      character_level,
      strength_id,
      dexterity_id,
      constitution_id,
      armor_type_id,
      character_type,
      character_description,
    };
    const characterTemplateCreated = await characterTemplatesService.create(newCharacterTemplate);
    const contentData = {
      message: "Character template created",
      data: {
        characterTemplateCreated,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error creating character template: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const createCharacterTemplateTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
