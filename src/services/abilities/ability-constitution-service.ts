import abilitiesConstitutionRepo from "../../db/abilities/ability-constitution-repo";

import { IAbilityConstitutionRow } from "./ability-constitution-service-interfaces";

const getAll = async (): Promise<IAbilityConstitutionRow[]> => {
  try {
    const constitutionModifiers = await abilitiesConstitutionRepo.getAll();
    return constitutionModifiers;
  } catch (error) {
    const errorMessage = `Error in getAll at abilities constitution service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  getAll,
};

export default service;
