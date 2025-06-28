import characterClassesRepo from "../../db/character/character-classes-repo";

import { ICharacterClassRow } from "./character-classes-interfaces";

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

const service = {
  getAll,
};

export default service;
