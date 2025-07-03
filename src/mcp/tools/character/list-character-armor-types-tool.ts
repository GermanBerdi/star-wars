import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import armorTypesService from "../../../services/armor-types/armor-types-service";

const toolName = "combat-system_character_armor_types_list";

const description =
  "List Armor Types - Retrieves all available armor types with their stats (name, armor class, description, cost, weight) for viewing and management purposes";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const armorTypes = await armorTypesService.getAll();
    const contentData = {
      message: "Armor types list",
      data: {
        armorTypes,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting armor types: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listCharacterArmorTypesTool = {
  toolName,
  description,
  cb,
};
