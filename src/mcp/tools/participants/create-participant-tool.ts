// import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
// import { z } from "zod";

// import participantsService from "../../../services/participants/participants-service";
// import { INewParticipantReq } from "../../../services/participants/participants-interfaces";

// const toolName = "combat-system_participants_create";

// const description =
//   "Creates a new participant/combatant for an existing fight/battle. The participant is created based on a character template and assigned to the specified fight. Optionally can be assigned to a team within the fight. For 'common' character templates, the system automatically appends the template name in brackets to the participant name (e.g., 'Thorek Martillo Ardiente' becomes 'Thorek Martillo Ardiente [Guardián de Hierro]'). Returns the newly created participant with their combat stats, team assignment, and unique ID within the fight.";

// const paramsSchema = {
//   fightId: z
//     .number()
//     .int()
//     .positive()
//     .describe(
//       "Unique numeric identifier of the fight/battle where the participant will be added (e.g., 8 for 'Torneo de los Campeones'). This fight must already exist in the system.",
//     ),
//   character_template_id: z
//     .number()
//     .int()
//     .positive()
//     .describe(
//       "Unique identifier of the character template to use as base for this participant (e.g., 28 for He-Man, 13 for Gorak el Devastador). The participant will inherit the template's base stats.",
//     ),
//   participant_name: z
//     .string()
//     .min(1)
//     .max(100)
//     .describe(
//       "Base name for this participant in the fight. For 'unique' character templates (heroes/villains), typically use the same name as the template (e.g., 'Aragorn', 'Conan'). For 'common' templates, create a personalized name (e.g., 'Thorek Martillo Ardiente', 'Sylvana Arquera Lunar') - the system will automatically append the template name in brackets.",
//     ),
//   is_alive: z
//     .boolean()
//     .optional()
//     .default(true)
//     .describe(
//       "Whether the participant starts the fight alive. Defaults to true. Set to false only for special scenarios like reviving fallen warriors.",
//     ),
//   team_id: z
//     .number()
//     .int()
//     .positive()
//     .optional()
//     .describe(
//       "Optional team assignment for team-based battles. The value must be included in the fight's available_teams array (e.g., if fight has available_teams [1,2,3], then team_id must be 1, 2, or 3). If the fight's available_teams is null, leave this undefined as it indicates a free-for-all battle where participants fight individually.",
//     ),
// };

// interface cbParams {
//   fightId: number;
//   character_template_id: number;
//   participant_name: string;
//   is_alive?: boolean;
//   team_id?: number;
// }

// const cb: ToolCallback<typeof paramsSchema> = async ({
//   fightId,
//   character_template_id,
//   participant_name,
//   is_alive,
//   team_id,
// }: cbParams) => {
//   const response: CallToolResult = {
//     content: [{ type: "text", text: "" }],
//   };
//   try {
//     const newParticipant: INewParticipantReq = {
//       fightId,
//       character_template_id,
//       participant_name,
//       is_alive: is_alive ?? true,
//       team_id: team_id ?? null,
//     };
//     const participantCreated = await participantsService.create(newParticipant);
//     const contentData = {
//       message: "Participant created",
//       data: {
//         participantCreated,
//       },
//     };
//     response.content[0].text = JSON.stringify(contentData);
//   } catch (error) {
//     const errorMessage = `Error creating participant: ${error}`;
//     const errorData = {
//       error: true,
//       message: errorMessage,
//     };
//     response.content[0].text = JSON.stringify(errorData);
//   }
//   return response;
// };

// export const createParticipantTool = {
//   toolName,
//   description,
//   paramsSchema,
//   cb,
// };
