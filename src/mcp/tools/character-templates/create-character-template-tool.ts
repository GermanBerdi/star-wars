import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";
import { INewCharacterTemplateReq } from "../../../services/character-templates/character-templates-interfaces";
import { CharacterType } from "../../../services/character-templates/character-templates-enums";

const toolName = "combat-system_characterTemplates_create";

const description =
  "Creates a new character template with base stats (name, hp, strength, defense, speed, type, description) that can be used as a blueprint for participants in fights. Character templates are reusable patterns that define a character's initial attributes. Use 'unique' type for named heroes and 'common' type for reusable enemies like soldiers or goblins.";

const paramsSchema = {
  character_name: z
    .string()
    .describe("The name of the character template (e.g., 'Aragorn', 'Fire Mage', 'Orc Soldier', 'Goblin Warrior')"),
  strength: z.number().default(10).describe("Attack power - determines how much damage the character deals in combat"),
  defense: z.number().default(10).describe("Defensive capability - reduces incoming damage from attacks"),
  speed: z.number().default(10).describe("Movement speed - determines turn order and dodge chance in fights"),
  hp: z.number().default(100).describe("Base health points - how much damage the character can take before dying"),
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
