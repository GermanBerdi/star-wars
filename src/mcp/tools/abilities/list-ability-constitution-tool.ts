import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import abilityConstitutionService from "../../../services/abilities/ability-constitution-service";

const toolName = "combat-system_abilities_constitution_list";

const description =
  "List Constitution Abilities - Retrieves all constitution values (3-25) with their survival modifiers (hit point adjustment, system shock, resurrection survival, poison save), regeneration capabilities, and warrior-specific bonuses. In AD&D, constitution is normally rolled with 3d6 (3-18 range, with 18 being rare at 1/216 odds). When creating characters, consider these probabilities - while you have freedom to assign any value, extreme scores at either end (very low 3-5 or very high 16-18+) should reflect truly remarkable characters, whether exceptionally frail or extraordinarily hardy.";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const constitutionModifiers = await abilityConstitutionService.getAll();
    const contentData = {
      message: "Constitution modifiers list",
      data: {
        constitutionModifiers,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting constitution modifiers: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listAbilityConstitutionTool = {
  toolName,
  description,
  cb,
};
