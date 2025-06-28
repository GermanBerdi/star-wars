import abilitiesDexterityRepo from "../../db/abilities/ability-dexterity-repo";

import { IAbilityDexterityRow } from "./ability-dexterity-service-interfaces";

const getAll = async (): Promise<IAbilityDexterityRow[]> => {
  try {
    const dexterityModifiers = await abilitiesDexterityRepo.getAll();
    return dexterityModifiers;
  } catch (error) {
    const errorMessage = `Error in getAll at abilities dexterity service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  getAll,
};

export default service;
