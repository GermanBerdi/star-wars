import { INewCharacterReq, IUpdateCharacterReq, ICharacterRow } from "./characters-interfaces";
import characterRepo from "../../db/characters/characters-repo";

const create = async (newCharacter: INewCharacterReq): Promise<ICharacterRow> => {
  try {
    const character = await characterRepo.create(newCharacter);
    return character;
  } catch (error) {
    const errorMessage = `Error in create character service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (characterToUpdate: IUpdateCharacterReq): Promise<ICharacterRow> => {
  try {
    const character = await characterRepo.update(characterToUpdate);
    return character;
  } catch (error) {
    const errorMessage = `Error in update character service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getAll = async (): Promise<ICharacterRow[]> => {
  try {
    const characters = await characterRepo.getAll();
    return characters;
  } catch (error) {
    const errorMessage = `Error in getAll character service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<ICharacterRow | null> => {
  try {
    const character = await characterRepo.getById(id);
    return character;
  } catch (error) {
    const errorMessage = `Error in getById character service: ${error}`;
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
