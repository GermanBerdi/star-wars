import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { IStarshipRow } from "../../../db/starships/starships-interfaces";
import { getAllStarships } from "../../../db/starships/starships-repo";

const toolName = "listStarships";

const description = "List Star Wars starships";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const starships: IStarshipRow[] = await getAllStarships();
    const contentData = starships;
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error fetching starships: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const listStarshipsTool = {
  toolName,
  description,
  cb,
};
