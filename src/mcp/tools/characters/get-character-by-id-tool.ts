import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import characterService from "../../../services/characters/characters-service";

const toolName = "getCharacterById";

const description = "Get one character by Id";

const paramsSchema = {
  id: z.number().describe("Unique identifier of the character in the database"),
};

interface cbParams {
  id: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({ id }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const character = await characterService.getById(id);
    const contentData = {
      message: "Character",
      data: {
        character,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error fetching character: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const updateCharacterTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
