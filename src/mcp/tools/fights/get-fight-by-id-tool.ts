import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import fightService from "../../../services/fights/fights-service";

const toolName = "getFightById";

const description = "Get one fight by Id";

const paramsSchema = {
  id: z.number().describe("Unique identifier of the fight in the database"),
};

interface cbParams {
  id: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({ id }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const fight = await fightService.getById(id);
    const contentData = {
      message: "Fight",
      data: {
        fight,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting fights: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const getFightByIdTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
