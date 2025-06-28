import abilitiesStrengthRepo from "../../db/abilities/ability-strength-repo";

import { IAbilityStrengthRow } from "./ability-strength-service-interfaces";

const getAll = async (): Promise<IAbilityStrengthRow[]> => {
  try {
    const strengthModifiers = await abilitiesStrengthRepo.getAll();
    return strengthModifiers;
  } catch (error) {
    const errorMessage = `Error in getAll at abilities strength service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  getAll,
};

export default service;
