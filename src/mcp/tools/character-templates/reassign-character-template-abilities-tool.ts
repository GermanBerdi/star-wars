import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

const toolName = "combat-system_character_templates_reassign_abilities";

const description =
  "Reassigns all six abilities (strength, dexterity, constitution, intelligence, wisdom, charisma) for an existing character template in AD&D 2nd edition combat system. The reassignArray must contain exactly [1, 2, 3, 4, 5, 6] in any order, representing the new ability assignments. The system maintains memory of exceptional strength percentiles - if a character has 18/XX strength and it gets reassigned to another ability, the XX percentile is preserved internally. When strength 18 is later reassigned back to the strength position, the original XX percentile is automatically restored. The system automatically recalculates all derived stats (AC, HP, THAC0, hit dice, spell bonuses, social modifiers) based on the reassigned abilities.";

const paramsSchema = {
  id: z.number().positive().describe("Unique identifier of the character template to reassign abilities"),
  reassignArray: z
    .array(z.number().int().min(1).max(6))
    .length(6)
    .refine(
      (arr) => {
        const uniqueValues = new Set(arr);
        return uniqueValues.size === 6 && arr.every((val) => [1, 2, 3, 4, 5, 6].includes(val));
      },
      {
        message: "Array must contain exactly [1, 2, 3, 4, 5, 6] in any order",
      },
    )
    .describe(
      "Array of exactly 6 unique numbers [1, 2, 3, 4, 5, 6] representing ability reassignment order: [strength, dexterity, constitution, intelligence, wisdom, charisma]",
    ),
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
