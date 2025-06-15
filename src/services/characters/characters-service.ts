import { INewCharacterReq, IUpdateCharacterReq, ICharacterRow } from "./characters-interfaces";
import characterRepo from "../../db/characters/characters-repo";

const create = async (newCharacter: INewCharacterReq): Promise<ICharacterRow> => {
  try {
    const character = await characterRepo.create(newCharacter);
    return character;
  } catch (error) {
    const errorMessage = `Error in create at character service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (characterToUpdate: IUpdateCharacterReq): Promise<ICharacterRow> => {
  try {
    const character = await characterRepo.update(characterToUpdate);
    return character;
  } catch (error) {
    const errorMessage = `Error in update at character service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getAll = async (): Promise<ICharacterRow[]> => {
  try {
    const characters = await characterRepo.getAll();
    return characters;
  } catch (error) {
    const errorMessage = `Error in getAll at character service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<ICharacterRow | null> => {
  try {
    const character = await characterRepo.getById(id);
    return character;
  } catch (error) {
    const errorMessage = `Error in getById at character service: ${error}`;
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
