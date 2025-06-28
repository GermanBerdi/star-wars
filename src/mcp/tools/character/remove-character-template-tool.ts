import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import characterTemplatesService from "../../../services/character/character-templates-service";

const toolName = "combat-system_characterTemplates_remove";

const description =
  "Removes/deletes a specific character template by its unique ID. This permanently deletes the character from the database. Use this when you want to remove a character template that is no longer needed.";

const paramsSchema = {
  id: z
    .number()
    .int()
    .positive()
    .describe(
      "Unique numeric identifier of the character template to remove from the database (e.g., 1 for Aragorn, 2 for Conan)",
    ),
};

interface cbParams {
  id: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({ id }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    await characterTemplatesService.remove(id);
    const contentData = {
      message: "Character template removed",
      data: {},
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error removing character template: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const removeCharacterTemplateTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
