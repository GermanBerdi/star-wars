import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createCharacterTemplateTool } from "./tools/character-templates/create-character-template-tool";
import { updateCharacterTemplateTool } from "./tools/character-templates/update-character-template-tool";
import { listCharacterTemplatesTool } from "./tools/character-templates/list-character-templates-tool";
import { getCharacterTemplateByIdTool } from "./tools/character-templates/get-character-template-by-id-tool";
import { removeCharacterTemplateTool } from "./tools/character-templates/remove-character-template-tool";
import { createFightTool } from "./tools/fights/create-fight-tool";
import { updateFightTool } from "./tools/fights/update-fight-tool";
import { listFightsTool } from "./tools/fights/list-fights-tool";
import { getFightByIdTool } from "./tools/fights/get-fight-by-id-tool";
import { removeFightTool } from "./tools/fights/remove-fight-tool";
import { settingParticipantsOrderTool } from "./tools/fights/set-participants-order-tool";
import { createParticipantTool } from "./tools/participants/create-participant-tool";
import { getParticipantsByFightIdTool } from "./tools/participants/get-participants-by-Fight-id-tools";
// import { performActionTool } from "./tools/actions/perfom-action";
import { saludarTool } from "./tools/saludar/saludar-tool";
import { listStarshipsTool } from "./tools/starships/list-starships-tool";

const mcpServer = new McpServer({
  name: "combat-system",
  version: "1.0.0",
});
mcpServer.tool(
  createCharacterTemplateTool.toolName,
  createCharacterTemplateTool.description,
  createCharacterTemplateTool.paramsSchema,
  createCharacterTemplateTool.cb,
);
mcpServer.tool(
  updateCharacterTemplateTool.toolName,
  updateCharacterTemplateTool.description,
  updateCharacterTemplateTool.paramsSchema,
  updateCharacterTemplateTool.cb,
);
mcpServer.tool(
  listCharacterTemplatesTool.toolName,
  listCharacterTemplatesTool.description,
  listCharacterTemplatesTool.cb,
);
mcpServer.tool(
  getCharacterTemplateByIdTool.toolName,
  getCharacterTemplateByIdTool.description,
  getCharacterTemplateByIdTool.paramsSchema,
  getCharacterTemplateByIdTool.cb,
);
mcpServer.tool(
  removeCharacterTemplateTool.toolName,
  removeCharacterTemplateTool.description,
  removeCharacterTemplateTool.paramsSchema,
  removeCharacterTemplateTool.cb,
);
mcpServer.tool(createFightTool.toolName, createFightTool.description, createFightTool.paramsSchema, createFightTool.cb);
mcpServer.tool(updateFightTool.toolName, updateFightTool.description, updateFightTool.paramsSchema, updateFightTool.cb);
mcpServer.tool(listFightsTool.toolName, listFightsTool.description, listFightsTool.cb);
mcpServer.tool(
  getFightByIdTool.toolName,
  getFightByIdTool.description,
  getFightByIdTool.paramsSchema,
  getFightByIdTool.cb,
);
mcpServer.tool(removeFightTool.toolName, removeFightTool.description, removeFightTool.paramsSchema, removeFightTool.cb);
mcpServer.tool(
  settingParticipantsOrderTool.toolName,
  settingParticipantsOrderTool.description,
  settingParticipantsOrderTool.paramsSchema,
  settingParticipantsOrderTool.cb,
);
mcpServer.tool(
  createParticipantTool.toolName,
  createParticipantTool.description,
  createParticipantTool.paramsSchema,
  createParticipantTool.cb,
);
mcpServer.tool(
  getParticipantsByFightIdTool.toolName,
  getParticipantsByFightIdTool.description,
  getParticipantsByFightIdTool.paramsSchema,
  getParticipantsByFightIdTool.cb,
);

// mcpServer.tool(
//   performActionTool.toolName,
//   performActionTool.description,
//   performActionTool.paramsSchema,
//   performActionTool.cb,
// );
mcpServer.tool(saludarTool.toolName, saludarTool.description, saludarTool.paramsSchema, saludarTool.cb);
mcpServer.tool(listStarshipsTool.toolName, listStarshipsTool.description, listStarshipsTool.cb);

const main = async () => {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("MCP server started in stdio mode");
};

main();
