import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import characterTemplatesService from "../../../services/character-templates/character-templates-service";
import { INewCharacterTemplateReq } from "../../../services/character-templates/character-templates-interfaces";

const toolName = "createCharacterTemplate";

const description = "Creates a new character template with base stats (name, hp, strength, defense, speed) that can be used as a blueprint for participants in fights. Character templates are reusable patterns that define a character's initial attributes.";

const paramsSchema = {
  character_name: z.string().describe("The name of the character template (e.g., 'Aragorn', 'Fire Mage')"),
  hp: z.number().default(100).describe("Base health points - how much damage the character can take before dying"),
  strength: z.number().default(10).describe("Attack power - determines how much damage the character deals in combat"),
  defense: z.number().default(10).describe("Defensive capability - reduces incoming damage from attacks"),
  speed: z.number().default(10).describe("Movement speed - determines turn order and dodge chance in fights"),
};

interface cbParams {
  character_name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
}

const cb: ToolCallback<typeof paramsSchema> = async ({ character_name, hp, strength, defense, speed }: cbParams) => {
  const response: CallToolResult = {
    content: [{ type: "text", text: "" }],
  };
  try {
    const newCharacterTemplate: INewCharacterTemplateReq = {
      character_name,
      hp,
      strength,
      defense,
      speed,
    };
    const characterTemplateCreated = await characterTemplatesService.create(newCharacterTemplate);
    const contentData = {
      message: "Character template created",
      data: {
        characterCreated: characterTemplateCreated,
      },
    };
    response.content[0].text = JSON.stringify(contentData);
  } catch (error) {
    const errorMessage = `Error creating character template: ${error}`;
    console.error(errorMessage);
    response.content[0].text = JSON.stringify(errorMessage);
  }
  return response;
};

export const createCharacterTemplateTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
