import abilitiesConstitutionRepo from "../../../db/ability-constitution/ability-constitution-repo";

import calcService from "../../calculations/calc-service";

import type { IAbilityConstitutionRow } from "./ability-constitution-service-interfaces";

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
    const errorMessage = `Error in getByAbilityScore at constitution service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByRolling = async (): Promise<IAbilityConstitutionRow> => {
  try {
    const abilityScore = calcService.rolls.rollAbility();
    return await getByAbilityScore(abilityScore);
  } catch (error) {
    const errorMessage = `Error in getByRolling at abilities constitution service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  getAll,
  getById,
  getByAbilityScore,
  getByRolling,
};

export default service;
