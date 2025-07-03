import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

const toolName = "combat-system_character_templates_reroll_hit_dices";

const description =
  "Rerolls the hit dice for an existing character template in AD&D 2nd edition combat system. This rerolls all hit dice for the character's current level and automatically recalculates derived stats (HP, hit dice modifiers) based on the new rolls and current constitution modifier.";

const paramsSchema = {
  id: z
    .number()
    .int()
    .positive()
    .describe("Unique numeric identifier of the character template to reroll abilities for"),
};

const cb: ToolCallback<typeof paramsSchema> = async ({ id }: { id: number }) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const characterTemplate = await characterTemplatesService.rerollHitDices(id);
    const contentData = {
      message: "Character template hit dices rerolled",
      data: {
        characterTemplate,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error rerolling hit dices in character template: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const rerollCharacterTemplateHitDicesTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
