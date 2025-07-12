import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import fightsService from "../../../services/fights/fights-service";

const toolName = "combat-system_fights_get_by_id";

const description =
  "Retrieves detailed information for a specific fight/battle by its unique ID. Returns comprehensive fight data including participant details, combat rounds, damage dealt, winner/loser, duration, and complete battle log. Use this to examine specific fight outcomes, analyze combat performance, or review detailed battle statistics for a particular encounter.";

const paramsSchema = {
  id: z
    .number()
    .int()
    .positive()
    .describe(
      "Unique numeric identifier of the specific fight/battle to retrieve from the database (e.g., 1 for the first fight, 15 for fight #15). This ID corresponds to the fight records returned by listFights()",
    ),
};

const cb: ToolCallback<typeof paramsSchema> = async ({ id }: { id: number }) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const fight = await fightsService.getById(id);
    const contentData = {
      message: "Fight",
      data: {
        fight,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting fight: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const getFightByIdTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
