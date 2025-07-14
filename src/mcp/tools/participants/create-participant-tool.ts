import { z } from "zod";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import participantsService from "../../../services/participants/participants-service";

import type { INewParticipantReq } from "../../../services/participants/participants-interfaces";

const toolName = "combat-system_participants_create";

const description =
  "Creates a new participant/combatant for an existing fight/battle. The participant is created based on a character template and assigned to the specified fight. Optionally can be assigned to a team within the fight. For 'common' character templates, the system automatically appends the template name in brackets to the participant name (e.g., 'Thorek Martillo Ardiente' becomes 'Thorek Martillo Ardiente [Guardián de Hierro]'). Returns the newly created participant with their combat stats, team assignment, and unique ID within the fight.";

const paramsSchema = {
  fightId: z
    .number()
    .int()
    .positive()
    .describe(
      "Unique numeric identifier of the fight/battle where the participant will be added (e.g., 8 for 'Torneo de los Campeones'). This fight must already exist in the system.",
    ),
  character_template_id: z
    .number()
    .int()
    .positive()
    .describe(
      "Unique identifier of the character template to use as base for this participant (e.g., 28 for He-Man, 13 for Gorak el Devastador). The participant will inherit the template's base stats.",
    ),
  participant_name: z
    .string()
    .min(1)
    .max(100)
    .describe(
      "Base name for this participant in the fight. For 'unique' character templates (heroes/villains), typically use the same name as the template (e.g., 'Aragorn', 'Conan'). For 'common' templates, create a personalized name (e.g., 'Thorek Martillo Ardiente', 'Sylvana Arquera Lunar') - the system will automatically append the template name in brackets.",
    ),
  status: z
    .number()
    .optional()
    .default(1)
    .describe(
      "Initial status of the participant when joining the fight. Uses ParticipantStatus enum values: DEAD (-2), INCAPACITATED (-1), UNCONSCIOUS (0), ALIVE (1). Defaults to 1 (ALIVE). Most participants start alive, but you can set other values for special scenarios like reviving fallen warriors, starting unconscious, or creating already defeated combatants for narrative purposes.",
    ),
  team_id: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      "Optional team assignment for team-based battles. The value must be included in the fight's available_teams array (e.g., if fight has available_teams [1,2,3], then team_id must be 1, 2, or 3). If the fight's available_teams is null, leave this undefined as it indicates a free-for-all battle where participants fight individually.",
    ),
};

const cb: ToolCallback<typeof paramsSchema> = async ({
  fightId,
  character_template_id,
  participant_name,
  status,
  team_id,
}: INewParticipantReq) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const newParticipantReq: INewParticipantReq = {
      fightId,
      character_template_id,
      participant_name,
      status,
      team_id,
    };
    const participantCreated = await participantsService.create(newParticipantReq);
    const contentData = {
      message: "Participant created",
      data: {
        participantCreated,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error creating participant: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const createParticipantTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
