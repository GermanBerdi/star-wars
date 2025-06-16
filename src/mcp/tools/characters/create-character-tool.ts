import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { INewCharacterReq } from "../../../services/characters/characters-interfaces";
import characterService from "../../../services/characters/characters-service";

const toolName = "createCharacter";

const description = "Create a new character";

const paramsSchema = {
  name: z.string().describe("Character name"),
  hp: z.number().default(100).describe("Health points"),
  strength: z.number().default(10).describe("Strength attribute"),
  defense: z.number().default(10).describe("Defense attribute"),
  speed: z.number().default(10).describe("Speed attribute"),
};

interface cbParams {
  name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({ name, hp, strength, defense, speed }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const newCharacter: INewCharacterReq = {
      name,
      hp,
      strength,
      defense,
      speed,
    };
    const characterCreated = await characterService.create(newCharacter);
    const contentData = {
      message: "Character created",
      data: {
        characterCreated,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error creating character: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const createCharacterTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
