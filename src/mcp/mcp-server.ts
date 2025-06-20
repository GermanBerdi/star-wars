import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createCharacterTool } from "./tools/characters/create-character-tool";
import { updateCharacterTool } from "./tools/characters/update-character-tool";
import { listCharactersTool } from "./tools/characters/list-characters-tool";
import { getCharacterByIdTool } from "./tools/characters/get-character-by-id-tool";
import { createFightTool } from "./tools/fights/create-fight-tool";
import { listFightsTool } from "./tools/fights/list-fights-tool";
import { getFightByIdTool } from "./tools/fights/get-fight-by-id-tool";
import { performActionTool } from "./tools/actions/perfom-action";
import { saludarTool } from "./tools/saludar/saludar-tool";
import { listStarshipsTool } from "./tools/starships/list-starships-tool";

const mcpServer = new McpServer({
  name: "star-wars",
  version: "1.0.0",
});
mcpServer.tool(
  createCharacterTool.toolName,
  createCharacterTool.description,
  createCharacterTool.paramsSchema,
  createCharacterTool.cb,
);
mcpServer.tool(
  updateCharacterTool.toolName,
  updateCharacterTool.description,
  updateCharacterTool.paramsSchema,
  updateCharacterTool.cb,
);
mcpServer.tool(listCharactersTool.toolName, listCharactersTool.description, listCharactersTool.cb);
mcpServer.tool(
  getCharacterByIdTool.toolName,
  getCharacterByIdTool.description,
  getCharacterByIdTool.paramsSchema,
  getCharacterByIdTool.cb,
);
mcpServer.tool(createFightTool.toolName, createFightTool.description, createFightTool.paramsSchema, createFightTool.cb);
mcpServer.tool(listFightsTool.toolName, listFightsTool.description, listFightsTool.cb);
mcpServer.tool(
  getFightByIdTool.toolName,
  getFightByIdTool.description,
  getFightByIdTool.paramsSchema,
  getFightByIdTool.cb,
);
mcpServer.tool(
  performActionTool.toolName,
  performActionTool.description,
  performActionTool.paramsSchema,
  performActionTool.cb,
);
mcpServer.tool(saludarTool.toolName, saludarTool.description, saludarTool.paramsSchema, saludarTool.cb);
mcpServer.tool(listStarshipsTool.toolName, listStarshipsTool.description, listStarshipsTool.cb);

const main = async () => {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("MCP server started in stdio mode");
};

main();
