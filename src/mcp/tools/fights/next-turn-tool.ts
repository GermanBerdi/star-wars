import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import fightsService from "../../../services/fights/fights-service";

const toolName = "combat-system_fights_next_turn";

const description =
  "Advances a fight/battle to the next turn in the combat sequence. This function automatically calculates initiative for all alive participants using a 1d10 roll plus the participant's initiative value (which includes base initiative and dexterity defensive adjustment bonus). In AD&D 2nd edition, lower initiative values act first - participants with better dexterity gain advantage by acting earlier. The pending_participants array is updated with participant IDs ordered from lowest to highest total initiative (fastest to slowest action order). Only affects fights with status IN_PROGRESS (1) and requires that all participants have completed their actions in the current turn (pending_participants must be empty).";

const paramsSchema = {
  id: z
    .number()
    .positive()
    .describe(
      "Unique numeric identifier of the fight/battle to advance to the next turn (e.g., 8 for 'Torneo de los Campeones'). The fight must exist in the system and be in progress with established participant order.",
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
    const fight = await fightsService.nextTurn(id);
    const contentData = {
      message: "Fight advanced to the next turn",
      data: {
        fight,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error advancing fight to the next turn: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const nextTurnTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
