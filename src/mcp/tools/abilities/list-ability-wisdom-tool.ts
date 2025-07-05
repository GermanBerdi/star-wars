import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import abilitiesService from "../../../services/abilities/abilities-service";

const toolName = "combat-system_abilities_wisdom_list";

const description =
  "List Wisdom Abilities - Retrieves all wisdom values (3-25) with their clerical modifiers (magical defense adjustment, bonus spells for clerics/druids, spell failure chance, spell immunity) and mental resistance bonuses. In AD&D, wisdom determines a cleric's spellcasting capabilities, magical defense, and mental fortitude against charm and illusion effects. Low wisdom (1-12) causes spell failure chances and penalties to magical defense, while high wisdom (13+) grants bonus spells and immunity to mental control effects at epic levels (19+). Wisdom is normally rolled with 3d6 (3-18 range, with 18 being rare at 1/216 odds). When creating characters, consider these probabilities - while you have freedom to assign any value, extreme scores at either end (very low 3-5 or very high 16-18+) should reflect truly remarkable characters, whether exceptionally foolish or extraordinarily wise.";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const wisdomModifiers = await abilitiesService.wisdom.getAll();
    const contentData = {
      message: "Wisdom modifiers list",
      data: {
        wisdomModifiers,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting wisdom modifiers: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listAbilityWisdomTool = {
  toolName,
  description,
  cb,
};
