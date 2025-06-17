import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import fightService from "../../../services/fights/fights-service";

const toolName = "createFight";

const description = "Create a new fight";

const paramsSchema = {
  id1: z
    .number()
    .describe(
      "The unique identifier (ID) of the character who will be assigned as the first combatant in the upcoming fight. Used to fetch and initialize their combat data.",
    ),
  id2: z
    .number()
    .describe(
      "The unique identifier (ID) of the character who will be assigned as the second combatant in the upcoming fight. Used to fetch and initialize their combat data.",
    ),
};

interface cbParams {
  id1: number;
  id2: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({ id1, id2 }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const fightCreated = await fightService.create(id1, id2);
    const contentData = {
      message: "Fight created",
      data: {
        fightCreated,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error creating fight: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const createFightTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
