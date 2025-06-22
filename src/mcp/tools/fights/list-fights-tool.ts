import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { IFightRow } from "../../../services/fights/fights-interfaces";

import fightsService from "../../../services/fights/fights-service";

const toolName = "combat-system_fights_list";

const description =
  "Retrieves a complete list of all fights/battles that have been created in the system. Returns fight records including participants, outcomes, stats, and battle history. Use this to view past combat encounters, analyze fight results, or manage the fight database.";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const fights: IFightRow[] = await fightsService.getAll();
    const contentData = {
      message: "Fights list",
      data: {
        fights,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting fights: ${error}`;
    const errorData = {
      error: true,
      message: errorMessage,
    };
    response.content[0].text = JSON.stringify(errorData);
  }
  return response;
};

export const listFightsTool = {
  toolName,
  description,
  cb,
};
