import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ICharacterRow } from "../../../services/characters/characters-interfaces";
import characterService from "../../../services/characters/characters-service";

const toolName = "listCharacters";

const description = "List Characters";

const cb: ToolCallback<undefined> = async () => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const characters: ICharacterRow[] = await characterService.getAll();
    const contentData = {
      message: "Characters list",
      data: {
        characters,
      },
    };
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
