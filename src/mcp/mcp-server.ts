import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";
import { starshipTool } from './tools/starships-tool';

const mcpServer = new McpServer(
  {
    name: 'star-wars',
    version: '1.0.0',
  }
);

mcpServer.tool(
  "saludar",
  "cada vez que un usuario te salude utiliza esta herramienta para devolver el saludo",
  { nombre: z.string(), edad: z.number().optional() },
  async ({ nombre, edad }) => ({
    content: [{ type: "text", text: `Hola ${nombre}, encantando de conocerte. Felices ${edad}, años` }]
  })
);

mcpServer.tool(
  starshipTool.name,
  starshipTool.description,
  starshipTool.cb
);

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("MCP server started in stdio mode");
}

main();
