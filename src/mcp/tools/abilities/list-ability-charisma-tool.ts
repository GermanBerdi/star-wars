import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import abilitiesService from "../../../services/abilities/abilities-service";

const toolName = "combat-system_abilities_charisma_list";

const description =
  "List Charisma Abilities - Retrieves all charisma values (3-25) with their social modifiers (reaction adjustment, maximum henchmen, loyalty base) and leadership bonuses. In AD&D, charisma determines a character's force of personality, persuasiveness, and ability to lead others. High charisma improves NPC reactions and allows commanding more loyal followers, while low charisma makes social interactions difficult and limits leadership potential. Charisma is normally rolled with 3d6 (3-18 range, with 18 being rare at 1/216 odds). When creating characters, consider these probabilities - while you have freedom to assign any value, extreme scores at either end (very low 3-5 or very high 16-18+) should reflect truly remarkable characters, whether socially repulsive or extraordinarily charismatic.";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const charismaModifiers = await abilitiesService.charisma.getAll();
    const contentData = {
      message: "Charisma modifiers list",
      data: {
        charismaModifiers,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting charisma modifiers: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listAbilityCharismaTool = {
  toolName,
  description,
  cb,
};
