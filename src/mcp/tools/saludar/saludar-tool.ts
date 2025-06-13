import { z } from "zod";
import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

const toolName = "saludar";

const description = "cada vez que un usuario te salude utiliza esta herramienta para devolver el saludo";

const paramsSchema = { nombre: z.string(), edad: z.number().optional() };

interface cbParams {
  nombre: string;
  edad?: number;
}

const cb:ToolCallback<typeof paramsSchema> = async ({ nombre, edad }: cbParams) => ({
    content: [{ type: "text", text: `Hola ${nombre}, encantando de conocerte. Felices ${edad}, años` }],
  });

export const saludarTool = {
  toolName,
  description,
  paramsSchema,
  cb,
};
