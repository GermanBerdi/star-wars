import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { IUpdateCharacter } from "../../../db/characters/characters-interfaces";
import { updateCharacter } from "../../../db/characters/characters-repo";

const toolName = "updateCharacter";

const description = "Update a character";

const paramsSchema = {
  id: z.number().describe("Unique identifier of the character in the database"),
  name: z.string().optional().describe("Character name"),
  hp: z.number().optional().describe("Health points"),
  strength: z.number().optional().describe("Strength attribute"),
  defense: z.number().optional().describe("Defense attribute"),
  speed: z.number().optional().describe("Speed attribute"),
};

interface cbParams {
  id: number;
  name?: string;
  hp?: number;
  strength?: number;
  defense?: number;
  speed?: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({ id, name, hp, strength, defense, speed }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const characterToUpdate: IUpdateCharacter = {
      id,
      name,
      hp,
      strength,
      defense,
      speed,
    };
    const characterUpdated = await updateCharacter(characterToUpdate);
    const contentData = {
      message: "Character updated",
      data: {
        characterUpdated
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error updating character: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const updateCharacterTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
