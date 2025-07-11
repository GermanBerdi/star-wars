import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

const toolName = "combat-system_character_templates_list";

const description =
  "List Characters Templates - Retrieves all available character templates with their stats (name, HP, strength, defense, speed) for viewing and management purposes";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const characterTemplates = await characterTemplatesService.getAll();
    const contentData = {
      message: "Character templates list",
      data: {
        characterTemplates,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting character templates: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listCharacterTemplatesTool = {
  toolName,
  description,
  cb,
};
