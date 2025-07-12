import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { listAbilityCharismaTool } from "./tools/abilities/list-ability-charisma-tool";
import { listAbilityConstitutionTool } from "./tools/abilities/list-ability-constitution-tool";
import { listAbilityDexterityTool } from "./tools/abilities/list-ability-dexterity-tool";
import { listAbilityIntelligenceTool } from "./tools/abilities/list-ability-intelligence-tool";
import { listAbilityStrengthTool } from "./tools/abilities/list-ability-strength-tool";
import { listAbilityWisdomTool } from "./tools/abilities/list-ability-wisdom-tool";
import { listArmorTypesTool } from "./tools/armor-types/list-armor-types-tool";
import { listCharacterClassesTool } from "./tools/character-classes/list-character-classes-tool";
import { createCharacterTemplateTool } from "./tools/character-templates/create-character-template-tool";
import { getCharacterTemplateByIdTool } from "./tools/character-templates/get-character-template-by-id-tool";
import { listCharacterTemplatesTool } from "./tools/character-templates/list-character-templates-tool";
import { reassignCharacterTemplateAbilitiesTool } from "./tools/character-templates/reassign-character-template-abilities-tool";
import { removeCharacterTemplateTool } from "./tools/character-templates/remove-character-template-tool";
import { rerollCharacterTemplateAbilitiesTool } from "./tools/character-templates/reroll-character-template-abilities-tool";
import { rerollCharacterTemplateHitDicesTool } from "./tools/character-templates/reroll-character-template-hit-dices-tool";
import { updateCharacterTemplateTool } from "./tools/character-templates/update-character-template-tool";
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
mcpServer.tool(listAbilityCharismaTool.toolName, listAbilityCharismaTool.description, listAbilityCharismaTool.cb);
mcpServer.tool(
  listAbilityConstitutionTool.toolName,
  listAbilityConstitutionTool.description,
  listAbilityConstitutionTool.cb,
);
mcpServer.tool(listAbilityDexterityTool.toolName, listAbilityDexterityTool.description, listAbilityDexterityTool.cb);
mcpServer.tool(
  listAbilityIntelligenceTool.toolName,
  listAbilityIntelligenceTool.description,
  listAbilityIntelligenceTool.cb,
);
mcpServer.tool(listAbilityStrengthTool.toolName, listAbilityStrengthTool.description, listAbilityStrengthTool.cb);
mcpServer.tool(listAbilityWisdomTool.toolName, listAbilityWisdomTool.description, listAbilityWisdomTool.cb);
mcpServer.tool(listArmorTypesTool.toolName, listArmorTypesTool.description, listArmorTypesTool.cb);
mcpServer.tool(listCharacterClassesTool.toolName, listCharacterClassesTool.description, listCharacterClassesTool.cb);
mcpServer.tool(
  createCharacterTemplateTool.toolName,
  createCharacterTemplateTool.description,
  createCharacterTemplateTool.paramsSchema,
  createCharacterTemplateTool.cb,
);
mcpServer.tool(
  getCharacterTemplateByIdTool.toolName,
  getCharacterTemplateByIdTool.description,
  getCharacterTemplateByIdTool.paramsSchema,
  getCharacterTemplateByIdTool.cb,
);
mcpServer.tool(
  listCharacterTemplatesTool.toolName,
  listCharacterTemplatesTool.description,
  listCharacterTemplatesTool.cb,
);
mcpServer.tool(
  reassignCharacterTemplateAbilitiesTool.toolName,
  reassignCharacterTemplateAbilitiesTool.description,
  reassignCharacterTemplateAbilitiesTool.paramsSchema,
  reassignCharacterTemplateAbilitiesTool.cb,
);
mcpServer.tool(
  removeCharacterTemplateTool.toolName,
  removeCharacterTemplateTool.description,
  removeCharacterTemplateTool.paramsSchema,
  removeCharacterTemplateTool.cb,
);
mcpServer.tool(
  rerollCharacterTemplateAbilitiesTool.toolName,
  rerollCharacterTemplateAbilitiesTool.description,
  rerollCharacterTemplateAbilitiesTool.paramsSchema,
  rerollCharacterTemplateAbilitiesTool.cb,
);
mcpServer.tool(
  rerollCharacterTemplateHitDicesTool.toolName,
  rerollCharacterTemplateHitDicesTool.description,
  rerollCharacterTemplateHitDicesTool.paramsSchema,
  rerollCharacterTemplateHitDicesTool.cb,
);
mcpServer.tool(
  updateCharacterTemplateTool.toolName,
  updateCharacterTemplateTool.description,
  updateCharacterTemplateTool.paramsSchema,
  updateCharacterTemplateTool.cb,
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
