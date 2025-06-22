import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";
import { IUpdateCharacterTemplateReq } from "../../../services/character-templates/character-templates-interfaces";
import { CharacterType } from "../../../services/character-templates/character-templates-enums";

const toolName = "combat-system_characterTemplates_update";

const description =
  "Updates an existing character template by modifying its stats (hp, strength, defense, speed) or name. Only provided fields will be updated, others remain unchanged.";

const paramsSchema = {
  id: z.number().describe("Unique identifier of the character template to update"),
  character_name: z.string().optional().describe("New name for the character template (e.g., 'Aragorn the Brave')"),
  strength: z
    .number()
    .optional()
    .describe(
      "New attack power (3-18) - determines how much damage the character deals in combat. Low (3-6): weak, Average (7-12): standard, High (13-18): powerful",
    ),
  defense: z
    .number()
    .optional()
    .describe(
      "New defensive capability (3-18) - reduces incoming damage from attacks. Low (3-6): fragile, Average (7-12): standard armor, High (13-18): heavily armored",
    ),
  speed: z
    .number()
    .optional()
    .describe(
      "New movement speed (3-18) - determines turn order and dodge chance in fights. Low (3-6): slow/clunky, Average (7-12): normal agility, High (13-18): lightning fast",
    ),
  hp: z
    .number()
    .optional()
    .describe(
      "New base health points - how much damage the character can take before dying. Formula: Type Base (15-40) + Constitution modifier based on Defense stat (-5 to +10) + Rank modifier (0-25). Examples: Mage=15+CON+rank, Standard Warrior=30+CON+rank, Heavy Warrior=40+CON+rank. Constitution modifiers: DEF 3-8 (-5 HP), DEF 9-12 (+0 HP), DEF 13-15 (+5 HP), DEF 16-18 (+10 HP). Rank modifiers: Common soldier (+0), Veteran/Captain (+15), Unique hero (+25)",
    ),
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

interface cbParams {
  id: number;
  character_name?: string;
  strength?: number;
  defense?: number;
  speed?: number;
  hp?: number;
  character_type?: CharacterType;
  character_description?: string;
}

const cb: ToolCallback<typeof paramsSchema> = async ({
  id,
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
    const updateCharacterTemplateReq: IUpdateCharacterTemplateReq = {
      id,
      character_name,
      strength,
      defense,
      speed,
      hp,
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
