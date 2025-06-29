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

const getById = async (id: number): Promise<IAbilityConstitutionRow> => {
  try {
    const constitutionModifier = await abilitiesConstitutionRepo.getById(id);
    if (!constitutionModifier) throw new Error(`Ability constitution with id ${id} not found.`);
    return constitutionModifier;
  } catch (error) {
    const errorMessage = `Error in getById at abilities constitution service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityConstitutionRow> => {
  try {
    const constitutionModifier = await abilitiesConstitutionRepo.getByAbilityScore(abilityScore);
    if (!constitutionModifier) throw new Error(`Ability constitution with abilityScore ${abilityScore} not found.`);
    return constitutionModifier;
  } catch (error) {
    const errorMessage = `Error in getByAbilityScore at constitution dexterity service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  getAll,
  getById,
  getByAbilityScore,
};

export default service;
