import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import fightsService from "../../../services/fights/fights-service";

import type { INewFightReq } from "../../../services/fights/fights-interfaces";

const toolName = "combat-system_fights_create";

const description =
  "Creates a new empty fight/battle with a given name. The fight is created without participants - combatants must be added separately by creating records in the fights_participants table that reference this fight's ID. Returns the newly created fight with its unique ID and initial status.";

const paramsSchema = {
  fight_name: z
    .string()
    .min(1)
    .max(50)
    .describe(
      "The name/title for the new fight or battle (e.g., 'Arena Championship', 'Forest Duel', 'Dragon Tournament'). Must be between 1-50 characters long.",
    ),
  available_teams: z
    .array(z.number().positive())
    .describe(
      "Array of team IDs for the battle. Use empty array [] for free-for-all (all participants fight individually), or [1, 2] for team-based battles where participants can join team 1 or team 2. For three-way battles use [1, 2, 3], etc. When creating participants, their team_id must match one of these values (or be null for free-for-all).",
    ),
};

const cb: ToolCallback<typeof paramsSchema> = async ({ fight_name, available_teams }: INewFightReq) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const newFight: INewFightReq = {
      fight_name,
      available_teams: available_teams,
    };
    const fightCreated = await fightsService.create(newFight);
    const contentData = {
      message: "Fight created",
      data: {
        fightCreated,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error creating fight: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const createFightTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
