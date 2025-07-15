import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import fightsService from "../../../services/fights/fights-service";

const toolName = "combat-system_fights_initialize_fight";

const description =
  "Initializes a fight/battle to start the combat sequence. This function changes the fight status from NOT_STARTED to IN_PROGRESS, sets the turn to 1, and automatically calculates initiative for all alive participants using a 1d10 roll plus the participant's initiative value (which includes base initiative and dexterity defensive adjustment bonus). In AD&D 2nd edition, lower initiative values act first - participants with better dexterity gain advantage by acting earlier. The pending_participants array is populated with participant IDs ordered from lowest to highest total initiative (fastest to slowest action order). Only affects fights with status NOT_STARTED (0) and requires that the fight has at least one participant.";

const paramsSchema = {
  id: z
    .number()
    .positive()
    .describe(
      "Unique numeric identifier of the fight/battle to initialize (e.g., 8 for 'Torneo de los Campeones'). The fight must exist in the system and be in NOT_STARTED status.",
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
    const fight = await fightsService.initializeFight(id);
    const contentData = {
      message: "Fight initialized successfully",
      data: {
        fight,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error initializing fight: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const initializeFightTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
