import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

import type { IRerollAbilitiesReq } from "../../../services/character-templates/character-templates-interfaces";

const toolName = "combat-system_character_templates_reroll_abilities";

const description =
  "Rerolls specific abilities (strength, dexterity, constitution) for an existing character template in AD&D 2nd edition combat system. You can choose which abilities to reroll while keeping others unchanged. The system automatically recalculates all derived stats (AC, HP, THAC0) after rerolling.";

const paramsSchema = {
  id: z
    .number()
    .int()
    .positive()
    .describe("Unique numeric identifier of the character template to reroll abilities for"),
  strength: z
    .boolean()
    .optional()
    .describe("Whether to reroll strength ability (true = reroll, false/undefined = keep current)"),
  dexterity: z
    .boolean()
    .optional()
    .describe("Whether to reroll dexterity ability (true = reroll, false/undefined = keep current)"),
  constitution: z
    .boolean()
    .optional()
    .describe("Whether to reroll constitution ability (true = reroll, false/undefined = keep current)"),
};

const cb: ToolCallback<typeof paramsSchema> = async ({
  id,
  strength,
  dexterity,
  constitution,
}: IRerollAbilitiesReq) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const rerolAbilitiesReq: IRerollAbilitiesReq = {
      id,
      strength,
      dexterity,
      constitution,
    };
    const characterTemplate = await characterTemplatesService.rerollAbilities(rerolAbilitiesReq);
    const contentData = {
      message: "Character template abilities rerolled",
      data: {
        characterTemplate,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error rerolling abilities in character template: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const rerollCharacterTemplateAbilitiesTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
