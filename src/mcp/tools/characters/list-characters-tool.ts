import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ICharacterRow } from "../../../db/characters/characters-interfaces";
import { getAllCharacters } from "../../../db/characters/characters-repo";

const toolName = "listCharacters";

const description = "List Characters";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const characters: ICharacterRow[] = await getAllCharacters();
    const contentData = characters;
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error fetching characters: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const listCharactersTool = {
  toolName,
  description,
  cb,
};
