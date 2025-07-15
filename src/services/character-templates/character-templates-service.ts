import characterTemplatesRepo from "../../db/character-templates/character-templates-repo";

import rerolls from "./character-templates-rerolls";
import creator from "./character-templates-create";
import updater from "./character-templates-update";

import type { ICharacterTemplateRow } from "./character-templates-interfaces";

const getAll = async (): Promise<ICharacterTemplateRow[]> => {
  try {
    const characterTemplates = await characterTemplatesRepo.getAll();
    return characterTemplates;
  } catch (error) {
    const errorMessage = `Error in getAll at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<ICharacterTemplateRow> => {
  try {
    const characterTemplate = await characterTemplatesRepo.getById(id);
    if (!characterTemplate) throw new Error(`Character template with id ${id} not found.`);
    return characterTemplate;
  } catch (error) {
    const errorMessage = `Error in getById at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    await characterTemplatesRepo.remove(id);
  } catch (error) {
    const errorMessage = `Error in remove at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  create: creator.create,
  rerollAbilities: rerolls.rerollAbilities,
  rerollHitDices: rerolls.rerollHitDices,
  update: updater.update,
  reassignAbilities: updater.reassignAbilities,
  getAll,
  getById,
  remove,
};

export { getById };
export default service;
