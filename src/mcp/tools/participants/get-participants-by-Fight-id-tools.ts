import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import participantsService from "../../../services/participants/participants-service";

const toolName = "combat-system_participants_getByFightId";

const description =
  "Retrieves all participants for a specific fight/battle by fight ID. Returns participant details including names, stats (HP, strength, defense, speed), team assignments, alive status, and character template references. Use this to view all combatants in a fight, analyze team compositions, check participant status, or prepare for battle actions.";

const paramsSchema = {
  fightId: z
    .number()
    .int()
    .positive()
    .describe(
      "Unique numeric identifier of the fight/battle to retrieve participants from (e.g., 8 for fight #8, 15 for fight #15). This fight ID corresponds to the fight records returned by listFights() and must exist in the system.",
    ),
};

interface cbParams {
  fightId: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({ fightId }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const participants = await participantsService.getByFightId(fightId);
    const contentData = {
      message: "Participants",
      data: {
        participants,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting participants from fight ${fightId}: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const getParticipantsByFightIdTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
