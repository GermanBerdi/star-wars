import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import abilitiesService from "../../../services/abilities/abilities-service";

const toolName = "combat-system_abilities_dexterity_list";

const description =
  "List Dexterity Abilities - Retrieves all dexterity values (3-25) with their combat modifiers (reaction adjustment, missile attack adjustment, defensive adjustment for AC). In AD&D, dexterity determines initiative, ranged combat accuracy, and defensive agility. Dexterity is normally rolled with 3d6 (3-18 range, with 18 being rare at 1/216 odds). High dexterity improves Armor Class (better AC), while low dexterity makes characters easier to hit. When creating characters, consider these probabilities - while you have freedom to assign any value, extreme scores at either end (very low 3-5 or very high 16-18+) should reflect truly remarkable characters, whether exceptionally clumsy or extraordinarily agile.";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const dexterityModifiers = await abilitiesService.dexterity.getAll();
    const contentData = {
      message: "Dexterity modifiers list",
      data: {
        dexterityModifiers,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting dexterity modifiers: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listAbilityDexterityTool = {
  toolName,
  description,
  cb,
};
