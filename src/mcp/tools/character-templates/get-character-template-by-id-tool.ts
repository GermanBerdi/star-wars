import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";

const toolName = "getCharacterTemplateById";

const description = "Retrieves detailed information for a specific character template by its unique ID. Returns the character's complete stats including name, HP, strength, defense, speed, and creation/update timestamps. Use this when you need to examine or reference a particular character's current attributes before making modifications or comparisons.";

const paramsSchema = {
  id: z.number()
    .int()
    .positive()
    .describe("Unique numeric identifier of the character template to retrieve from the database (e.g., 1 for Aragorn, 2 for Conan)")
};

interface cbParams {
  id: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({ id }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const characterTemplate = await characterTemplatesService.getById(id);
    const contentData = {
      message: "Character template",
      data: {
        characterTemplate,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting character template: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const getCharacterTemplateByIdTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
