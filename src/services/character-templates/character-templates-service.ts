import characterTemplatesRepo from "../../db/character-templates/character-templates-repo";

import { INewCharacterTemplateReq, IUpdateCharacterTemplateReq, ICharacterTemplateRow } from "./character-templates-interfaces";

const create = async (newCharacterTemplate: INewCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  try {
    const characterTemplateCreated = await characterTemplatesRepo.create(newCharacterTemplate);
    return characterTemplateCreated;
  } catch (error) {
    const errorMessage = `Error in create at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (characterTemplateToUpdate: IUpdateCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  try {
    const characterTemplateUpdated = await characterTemplatesRepo.update(characterTemplateToUpdate);
    return characterTemplateUpdated;
  } catch (error) {
    const errorMessage = `Error in update at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

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
    const character = await characterTemplatesRepo.getById(id);
    if (!character) throw new Error(`Character template with id ${id} not found.`);
    return character;
  } catch (error) {
    const errorMessage = `Error in getById at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  create,
  update,
  getAll,
  getById,
};

export default service;
