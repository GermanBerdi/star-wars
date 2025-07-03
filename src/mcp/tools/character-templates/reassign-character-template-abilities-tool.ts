import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

const toolName = "combat-system_character_templates_reassign_abilities";

const description =
  "Reassigns abilities (strength, dexterity, constitution) for an existing character template in AD&D 2nd edition combat system. The reassignArray must contain exactly [1, 2, 3] in any order, representing the new ability assignments. The system automatically recalculates all derived stats (AC, HP, THAC0, hit dice) based on the reassigned abilities.";

const paramsSchema = {
  id: z.number().positive().describe("Unique identifier of the character template to reassign abilities"),
  reassignArray: z
    .array(z.number().int().min(1).max(3))
    .length(3)
    .refine(
      (arr) => {
        const uniqueValues = new Set(arr);
        return uniqueValues.size === 3 && arr.every((val) => [1, 2, 3].includes(val));
      },
      {
        message: "Array must contain exactly [1, 2, 3] in any order",
      },
    )
    .describe("Array of exactly 3 unique numbers [1, 2, 3] representing ability reassignment order"),
};

const cb: ToolCallback<typeof paramsSchema> = async ({
  id,
  reassignArray,
}: {
  id: number;
  reassignArray: number[];
}) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const characterTemplate = await characterTemplatesService.reassignAbilities(id, reassignArray);
    const contentData = {
      message: "Character template abilities reassigned",
      data: {
        characterTemplate,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error reassigning abilities in character template: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const reassignCharacterTemplateAbilitiesTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
