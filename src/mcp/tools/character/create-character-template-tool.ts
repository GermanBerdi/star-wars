import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import characterTemplatesService from "../../../services/character/character-templates-service";
import { INewCharacterTemplateReq } from "../../../services/character/character-templates-interfaces";
import { CharacterType } from "../../../services/character/character-templates-enums";

const toolName = "combat-system_characterTemplates_create";

const description =
  "Creates a new character template with base stats (name, hp, strength, defense, speed, type, description) that can be used as a blueprint for participants in fights. Character templates are reusable patterns that define a character's initial attributes. Use 'unique' type for named heroes and 'common' type for reusable enemies like soldiers or goblins.";

const paramsSchema = {
  character_name: z
    .string()
    .describe("The name of the character template (e.g., 'Aragorn', 'Fire Mage', 'Orc Soldier', 'Goblin Warrior')"),
  strength: z
    .number()
    .default(10)
    .describe(
      "Attack power (3-18) - determines how much damage the character deals in combat. Low (3-6): weak, Average (7-12): standard, High (13-18): powerful",
    ),
  defense: z
    .number()
    .default(10)
    .describe(
      "Armor Class (1-10) - defensive capability based on equipped armor. Lower values provide better protection: AC 1 (full plate): maximum protection, AC 3-4 (plate mail): heavy armor, AC 5-7 (chain mail, scale): medium armor, AC 8-10 (leather, padded, none): light/no armor. Reduces incoming damage from attacks. Use 'List Armor Types' to see all available armors and copy the armor_class value here (e.g., Leather armor = AC 8, Chain mail = AC 5, Full plate = AC 1).",
    ),
  speed: z
    .number()
    .default(10)
    .describe(
      "Movement speed (3-18) - determines turn order and dodge chance in fights. Low (3-6): slow/clunky, Average (7-12): normal agility, High (13-18): lightning fast",
    ),
  hp: z
    .number()
    .default(100)
    .describe(
      "Base health points - how much damage the character can take before dying. Formula: Type Base (15-40) + Constitution modifier based on Defense stat (-5 to +10) + Rank modifier (0-25). Examples: Mage=15+CON+rank, Standard Warrior=30+CON+rank, Heavy Warrior=40+CON+rank. Constitution modifiers: DEF 3-8 (-5 HP), DEF 9-12 (+0 HP), DEF 13-15 (+5 HP), DEF 16-18 (+10 HP). Rank modifiers: Common soldier (+0), Veteran/Captain (+15), Unique hero (+25)",
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

interface cbParams {
  character_name: string;
  strength: number;
  defense: number;
  speed: number;
  hp: number;
  character_type: CharacterType;
  character_description?: string;
}

const cb: ToolCallback<typeof paramsSchema> = async ({
  character_name,
  strength,
  defense,
  speed,
  hp,
  character_type,
  character_description,
}: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const newCharacterTemplate: INewCharacterTemplateReq = {
      character_name,
      strength,
      defense,
      speed,
      hp,
      character_type,
      character_description: character_description ?? null,
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
