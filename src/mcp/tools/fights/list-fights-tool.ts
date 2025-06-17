import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { IFightRow } from "../../../services/fights/fights-interfaces";

import fightService from "../../../services/fights/fights-service";

const toolName = "listFights";

const description = "List Fights";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const fights: IFightRow[] = await fightService.getAll();
    const contentData = {
      message: "Characters list",
      data: {
        fights,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error getting fights: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const listFightsTool = {
  toolName,
  description,
  cb,
};
