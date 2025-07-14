import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import { IPerformActionReq } from "../../../services/actions/actions-interfaces";
import actionService from "../../../services/actions/actions-service";

const toolName = "combat-system_perform_action";

const description =
  "Allows a participant (character) to execute an action during combat, including offensive moves (like attacks), defensive maneuvers (like blocking or dodging), or special abilities (like casting spells).";

const paramsSchema = {
  fightId: z
    .number()
    .describe(
      "The unique identifier (ID) of the fight in which the action will be performed. Used to locate and update the corresponding combat state.",
    ),
  actorParticipantId: z
    .number()
    .describe("The unique identifier (ID) of actor which is the participant (character) performing the action."),
  targetParticipantId: z
    .number()
    .describe(
      "The unique identifier (ID) of target which is the participant (character) that is the objective of the action.",
    ),
};

const cb: ToolCallback<typeof paramsSchema> = async ({
  fightId,
  actorParticipantId,
  targetParticipantId,
}: IPerformActionReq) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const performActionReq: IPerformActionReq = {
      fightId,
      actorParticipantId,
      targetParticipantId,
    };
    const actionPerformed = await actionService.performAction(performActionReq);
    const contentData = {
      message: "Action Performed",
      data: {
        actionPerformed,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error performing action: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const performActionTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
