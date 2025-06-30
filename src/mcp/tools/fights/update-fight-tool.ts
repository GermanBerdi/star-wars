import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import fightsService from "../../../services/fights/fights-service";
import { IUpdateFightReq } from "../../../services/fights/fights-interfaces";
import { FightStatus } from "../../../services/fights/fights-enums";

const toolName = "combat-system_fights_update";

const description =
  "Updates an existing fight/battle by modifying its properties. Only provided fields will be updated, others remain unchanged.";

const paramsSchema = {
  id: z.number().describe("Unique identifier of the fight to update"),
  fight_name: z.string().optional().describe("New name for the fight/battle"),
  available_teams: z
    .array(z.number().positive())
    .optional()
    .describe(
      "Optional array of team IDs for team-based battles. Each number represents a team that participants can join (e.g., [1, 2] creates teams 1 and 2). If not provided, the fight will be a free-for-all.",
    ),
  turn: z.number().optional().describe("Current turn number in the fight"),
  pending_participants: z
    .array(z.number())
    .optional()
    .describe(
      "Array of participant IDs pending to act in current turn, ordered by initiative. Initialized as null when fight is created, populated at the start of each turn based on participant initiative rolls.",
    ),
  fight_status: z
    .nativeEnum(FightStatus)
    .optional()
    .describe(
      `Current status of the fight. Possible values and meaning: ${Object.entries(FightStatus)
        .map(([key, value]) => `${value} = ${key.toLowerCase().replace("_", " ")}`)
        .join(", ")}`,
    ),
  winner_id: z
    .number()
    .optional()
    .describe("ID of the winning participant when fight is finished, null if fight is ongoing or ended in draw"),
};

interface cbParams {
  id: number;
  fight_name?: string;
  available_teams?: number[];
  turn?: number;
  pending_participants?: number[];
  fight_status?: FightStatus;
  winner_id?: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({
  id,
  fight_name,
  available_teams,
  turn,
  pending_participants,
  fight_status,
  winner_id,
}: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const updateFightReq: IUpdateFightReq = {
      id,
      fight_name,
      available_teams,
      turn,
      pending_participants,
      fight_status,
      winner_id,
    };
    const fightUpdated = await fightsService.update(updateFightReq);
    const contentData = {
      message: "Fight updated",
      data: {
        fightUpdated,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error updating fight: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const updateFightTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
