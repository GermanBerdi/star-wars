import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import characterClassesService from "../../../services/character/character-classes-service";

const toolName = "combat-system_characterClasses_list";

const description =
  "List Character Classes - Retrieves all available character classes with their properties (class name, group classification, hit dice configuration, hit dice limits, and fixed hit point bonuses). Shows warrior, priest, rogue, and wizard class groups with their specific mechanics for character creation and advancement in AD&D combat system.";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const characterClasses = await characterClassesService.getAll();
    const contentData = {
      message: "Character classes list",
      data: {
        characterClasses,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting character classes: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listCharacterClassesTool = {
  toolName,
  description,
  cb,
};
