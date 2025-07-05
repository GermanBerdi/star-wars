import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import abilitiesService from "../../../services/abilities/abilities-service";

const toolName = "combat-system_abilities_strength_list";

const description =
  "List Strength Abilities - Retrieves all strength values (3-25) with their combat modifiers (hit probability, damage adjustment), physical capabilities (weight allowance, maximum press, door opening, bar bending), and exceptional strength variants for score 18 (18/01-100 percentile system unique to warriors). In AD&D, strength determines melee combat effectiveness and physical prowess. Strength is normally rolled with 3d6 (3-18 range, with 18 being rare at 1/216 odds). Warriors with 18 strength roll percentile dice for exceptional strength bonuses. When creating characters, consider these probabilities - while you have freedom to assign any value, extreme scores at either end (very low 3-5 or very high 16-18+) should reflect truly remarkable characters, whether exceptionally weak or extraordinarily strong.";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const strengthModifiers = await abilitiesService.strength.getAll();
    const contentData = {
      message: "Strength modifiers list",
      data: {
        strengthModifiers,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting strength modifiers: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listAbilityStrengthTool = {
  toolName,
  description,
  cb,
};
