import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

import { CharacterType } from "../../../services/character-templates/character-templates-enums";

import type { INewCharacterTemplateReq } from "../../../services/character-templates/character-templates-interfaces";

const toolName = "combat-system_character_templates_create";

const description =
  "Creates a new character template for AD&D 2nd edition combat system with all 6 abilities (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma). The system automatically calculates all derived stats (AC, HP, THAC0, hit dice, spell bonuses, social modifiers, and initiative) based on the provided parameters. Initiative is calculated from dexterity defensive_adjustment - in AD&D, lower initiative values act first in combat, so high dexterity (negative defensive_adjustment) provides better initiative. IMPORTANT: Use the List tools to consult the ability tables (List Strength/Dexterity/Constitution/Intelligence/Wisdom/Charisma Abilities), armor table (List Armor Types), and class table (List Character Classes) before creating your character.";

const paramsSchema = {
  character_name: z
    .string()
    .describe("The name of the character template (e.g., 'Aragorn', 'Fire Mage', 'Orc Soldier', 'Goblin Warrior')"),
  class_id: z
    .number()
    .describe(
      "Character class ID. Consult 'List Character Classes' table to see available classes (warrior, priest, rogue, wizard groups) with their hit dice and mechanics",
    ),
  character_level: z
    .number()
    .min(1)
    .describe("Character level (1+) - affects hit dice, hit points, and THAC0 calculations"),
  strength_id: z
    .string()
    .optional()
    .describe(
      "Strength attribute ID (optional). If not provided, will be rolled randomly. Consult 'List Strength Abilities' table to see all available values (3-25) and their combat modifiers (hit/damage bonuses, weight allowance, door opening, exceptional strength for warriors)",
    ),
  dexterity_id: z
    .number()
    .optional()
    .describe(
      "Dexterity attribute ID (optional). If not provided, will be rolled randomly. Consult 'List Dexterity Abilities' table to see all available values (3-25) and their bonuses (AC improvement, missile attack adjustment, reaction adjustment)",
    ),
  constitution_id: z
    .number()
    .optional()
    .describe(
      "Constitution attribute ID (optional). If not provided, will be rolled randomly. Consult 'List Constitution Abilities' table to see all available values (3-25) and their bonuses (HP per level, system shock, resurrection survival, poison save, regeneration)",
    ),
  intelligence_id: z
    .number()
    .optional()
    .describe(
      "Intelligence attribute ID (optional). If not provided, will be rolled randomly. Consult 'List Intelligence Abilities' table to see all available values (3-25) and their bonuses (wizard spells per level, spell learning chance, maximum spells known, languages, illusion immunity at 19+)",
    ),
  wisdom_id: z
    .number()
    .optional()
    .describe(
      "Wisdom attribute ID (optional). If not provided, will be rolled randomly. Consult 'List Wisdom Abilities' table to see all available values (3-25) and their bonuses (priest bonus spells, magical defense adjustment, spell failure chance, spell immunity at 19+)",
    ),
  charisma_id: z
    .number()
    .optional()
    .describe(
      "Charisma attribute ID (optional). If not provided, will be rolled randomly. Consult 'List Charisma Abilities' table to see all available values (3-25) and their bonuses (reaction adjustment, maximum henchmen, loyalty base)",
    ),
  armor_type_id: z
    .number()
    .describe(
      "Armor type ID. Consult 'List Armor Types' table to see all available armor options (from None AC 10 to Full Plate AC 1) with their armor class values, costs, and weights",
    ),
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
  intelligence_id,
  wisdom_id,
  charisma_id,
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
      intelligence_id,
      wisdom_id,
      charisma_id,
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
