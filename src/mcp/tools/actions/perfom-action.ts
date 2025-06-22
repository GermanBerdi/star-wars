// import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
// import { z } from "zod";
// import { IPerformActionReq } from "../../../services/actions/actions-interfaces";
// import actionService from "../../../services/actions/actions-service";

// const toolName = "perfomAction";

// const description =
//   "Allows a character to execute an action during combat, including offensive moves (like attacks), defensive maneuvers (like blocking or dodging), or special abilities (like casting spells).";

// const paramsSchema = {
//   fightId: z
//     .number()
//     .describe(
//       "The unique identifier (ID) of the fight in which the action will be performed. Used to locate and update the corresponding combat state.",
//     ),
//   combatantId: z
//     .number()
//     .describe(
//       "The unique identifier (ID) of the combatant (character) performing the action. Used to retrieve and process the combatant's data.",
//     ),
//   type: z
//     .string()
//     .describe("The type of action to perform during the fight, such as 'attack', 'defend', 'dodge', or 'castSpell'."),
// };

// interface cbParams {
//   fightId: number;
//   combatantId: number;
//   type: string;
// }

// const cb: ToolCallback<typeof paramsSchema> = async ({ fightId, combatantId, type }: cbParams) => {
//   const response: CallToolResult = {
//     content: [{ type: "text", text: "" }],
//   };
//   try {
//     const performActionReq: IPerformActionReq = {
//       fightId,
//       combatantId,
//       type,
//     };
//     const actionPerformed = await actionService.performAction(performActionReq);
//     const contentData = {
//       message: "Action Performed",
//       data: {
//         actionPerformed,
//       },
//     };
//     response.content[0].text = JSON.stringify(contentData);
//   } catch (error) {
//     const errorMessage = `Error performing action: ${error}`;
//     console.error(errorMessage);
//     response.content[0].text = JSON.stringify(errorMessage);
//   }
//   return response;
// };

// export const performActionTool = {
//   toolName,
//   description,
//   paramsSchema,
//   cb,
// };
