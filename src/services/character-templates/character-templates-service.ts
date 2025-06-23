import characterTemplatesRepo from "../../db/character-templates/character-templates-repo";

import {
  INewCharacterTemplateReq,
  IUpdateCharacterTemplateReq,
  ICharacterTemplateRow,
} from "./character-templates-interfaces";

const create = async (newCharacterTemplate: INewCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  try {
    const characterTemplate = await characterTemplatesRepo.create(newCharacterTemplate);
    return characterTemplate;
  } catch (error) {
    const errorMessage = `Error in create at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (updateCharacterTemplateReq: IUpdateCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  try {
    const characterTemplate = await characterTemplatesRepo.update(updateCharacterTemplateReq);
    return characterTemplate;
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
  create,
  update,
  getAll,
  getById,
  remove,
};

export default service;
