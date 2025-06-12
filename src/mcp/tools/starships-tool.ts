import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { IStarshipRow, getAllStarships } from "../../db/startships/starships-repo";

const cb: ToolCallback = async ({}) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const starships: IStarshipRow[] = await getAllStarships();
    response.content[0].text = JSON.stringify(starships);
  } catch (error) {
    const errorMessage = `Error fetching starships:", ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const starshipTool = {
  name: "listStarShips",
  description: "List Star Wars starships",
  cb,
};
