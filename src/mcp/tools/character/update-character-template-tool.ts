import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

import { CharacterType } from "../../../services/character-templates/character-templates-enums";

import type { IUpdateCharacterTemplateReq } from "../../../services/character-templates/character-templates-interfaces";

const toolName = "combat-system_character_templates_update";

const description =
  "Updates an existing character template for AD&D 2nd edition combat system. The system automatically recalculates all derived stats (AC, HP, THAC0, hit dice) based on the updated parameters. Only provided fields will be updated, others remain unchanged.";

const paramsSchema = {
  id: z.number().describe("Unique identifier of the character template to update"),
  character_name: z.string().optional().describe("New name for the character template (e.g., 'Aragorn the Brave')"),
  class_id: z
    .number()
    .optional()
    .describe(
      "Character class ID. Use 'List Character Classes' to see available classes (warrior, priest, rogue, wizard groups)",
    ),
  character_level: z
    .number()
    .min(1)
    .optional()
    .describe("Character level (1+) - affects hit dice, hit points, and THAC0 calculations"),
  strength_id: z
    .string()
    .optional()
    .describe(
      "Strength attribute ID. Use 'List Strength Abilities' to see available values and their combat modifiers",
    ),
  dexterity_id: z
    .number()
    .optional()
    .describe(
      "Dexterity attribute ID. Use 'List Dexterity Abilities' to see available values and their AC/missile bonuses",
    ),
  constitution_id: z
    .number()
    .optional()
    .describe(
      "Constitution attribute ID. Use 'List Constitution Abilities' to see available values and their HP modifiers",
    ),
  armor_type_id: z
    .number()
    .optional()
    .describe("Armor type ID. Use 'List Armor Types' to see all available armor options with their armor class values"),
  hit_dices: z.array(z.number()).optional().describe("Array of hit dice rolls for the character's current level"),
  character_type: z
    .nativeEnum(CharacterType)
    .optional()
    .describe(
      "Character type: 'unique' for named heroes/villains (single use), 'common' for reusable templates like soldiers, goblins, etc.",
    ),
  character_description: z
    .string()
    .optional()
    .describe("Optional description or lore about the character, combat notes, or tactical information"),
};

const cb: ToolCallback<typeof paramsSchema> = async ({
  id,
  character_name,
  class_id,
  character_level,
  strength_id,
  dexterity_id,
  constitution_id,
  armor_type_id,
  hit_dices,
  character_type,
  character_description,
}: IUpdateCharacterTemplateReq) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const updateCharacterTemplateReq: IUpdateCharacterTemplateReq = {
      id,
      character_name,
      class_id,
      character_level,
      strength_id,
      dexterity_id,
      constitution_id,
      armor_type_id,
      hit_dices,
      character_type,
      character_description,
    };
    const characterTemplateUpdated = await characterTemplatesService.update(updateCharacterTemplateReq);
    const contentData = {
      message: "Character template updated",
      data: {
        characterTemplateUpdated,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error updating character template: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const updateCharacterTemplateTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
