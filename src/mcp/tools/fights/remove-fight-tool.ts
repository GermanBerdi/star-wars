import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import fightsService from "../../../services/fights/fights-service";

const toolName = "combat-system_fights_remove";

const description =
  "Removes/deletes a specific fight by its unique ID. This permanently deletes the fight from the database. Use this when you want to remove a fight that is no longer needed or was created by mistake.";

const paramsSchema = {
  id: z
    .number()
    .int()
    .positive()
    .describe(
      "Unique numeric identifier of the fight to remove from the database (e.g., 1 for 'Epic Battle', 2 for 'Final Showdown')",
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
    await fightsService.remove(id);
    const contentData = {
      message: "Fight removed",
      data: {},
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error removing fight: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const removeFightTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
