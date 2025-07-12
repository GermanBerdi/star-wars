import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import fightsService from "../../../services/fights/fights-service";

const toolName = "combat-system_fights_set_participants_order";

const description =
  "Establishes the turn order for participants in a fight/battle based on their initiative rolls. This function calculates initiative for all alive participants using a 1d10 roll plus the participant's initiative value (1d10 + participant initiative). In AD&D 2nd edition, lower initiative values act first - participants with negative initiative values gain an advantage by acting earlier. The pending_participants array is populated with participant IDs ordered from lowest to highest total initiative (fastest to slowest action order). Must be called before starting combat rounds to determine who acts first. Only affects fights with status NOT_STARTED (0) or IN_PROGRESS (1).";

const paramsSchema = {
  id: z
    .number()
    .positive()
    .describe(
      "Unique numeric identifier of the fight/battle to set participant order for (e.g., 8 for 'Torneo de los Campeones'). " +
        "The fight must exist in the system and contain at least one alive participant.",
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
    const fight = await fightsService.setParticipantsOrder(id);
    const contentData = {
      message: "Participants turn order successfully established based on initiative rolls",
      data: {
        fight,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error establishing participants order: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const settingParticipantsOrderTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
