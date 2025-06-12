import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";

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
  "listStarShips",
  "Lista de las naves de star wars",
  async ({ }) => ({
    content: [{ type: "text", text: JSON.stringify([
      { id: 1, name: "Millennium Falcon", weapons:"laser", shieldLevel:3, passengers:5 },
      { id: 2, name: "X-Wing", weapons:"torpedo", shieldLevel:10, passengers:2 },
      { id: 3, name: "TIE Fighter", weapons:"misils", shieldLevel:5, passengers:1 },
    ]) }]
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error('Servidor MCP iniciado en modo stdio');
}

main();
