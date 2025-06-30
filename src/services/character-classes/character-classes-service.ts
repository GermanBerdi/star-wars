import characterClassesRepo from "../../db/character-classes/character-classes-repo";

import type { ICharacterClassRow } from "./character-classes-interfaces";

const getAll = async (): Promise<ICharacterClassRow[]> => {
  try {
    const characterClasses = await characterClassesRepo.getAll();
    return characterClasses;
  } catch (error) {
    const errorMessage = `Error in getAll at character classes service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<ICharacterClassRow> => {
  try {
    const characterClass = await characterClassesRepo.getById(id);
    if (!characterClass) throw new Error(`Character class with id ${id} not found.`);
    return characterClass;
  } catch (error) {
    const errorMessage = `Error in getById at character classes service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  getAll,
  getById,
};

export default service;
