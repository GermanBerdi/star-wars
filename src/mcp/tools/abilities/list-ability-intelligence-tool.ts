import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import abilitiesService from "../../../services/abilities/abilities-service";

const toolName = "combat-system_abilities_intelligence_list";

const description =
  "List Intelligence Abilities - Retrieves all intelligence values (3-25) with their cognitive modifiers (maximum spell level, spells per level, spell learning chance, maximum spells known per level) and language bonuses. Values 19+ grant immunity to illusion spells by level (19=1st level, 20=2nd level, etc.). In AD&D, intelligence determines a wizard's spellcasting capabilities and general reasoning ability. Low intelligence (1-8) prevents spellcasting entirely, while high intelligence allows learning higher-level spells and more languages. Intelligence is normally rolled with 3d6 (3-18 range, with 18 being rare at 1/216 odds). When creating characters, consider these probabilities - while you have freedom to assign any value, extreme scores at either end (very low 3-5 or very high 16-18+) should reflect truly remarkable characters, whether exceptionally dim or brilliantly gifted.";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const intelligenceModifiers = await abilitiesService.intelligence.getAll();
    const contentData = {
      message: "Intelligence modifiers list",
      data: {
        intelligenceModifiers,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting intelligence modifiers: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listAbilityIntelligenceTool = {
  toolName,
  description,
  cb,
};
