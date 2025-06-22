import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import fightsService from "../../../services/fights/fights-service";
import { INewFightReq } from "../../../services/fights/fights-interfaces";

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
    .optional()
    .describe(
      "Optional array of team IDs for team-based battles. Each number represents a team that participants can join (e.g., [1, 2] creates teams 1 and 2, [1, 2, 3] creates teams 1, 2, and 3). When creating participants, their team_id must match one of these values. If not provided or null, the fight will be a free-for-all where all participants fight individually without team assignments.",
    ),
};

interface cbParams {
  fight_name: string;
  available_teams?: number[];
}

const cb: ToolCallback<typeof paramsSchema> = async ({ fight_name, available_teams }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const newFight: INewFightReq = {
      fight_name,
      available_teams: available_teams ?? null,
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
