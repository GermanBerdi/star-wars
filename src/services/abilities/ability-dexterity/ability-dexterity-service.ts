import abilitiesDexterityRepo from "../../../db/ability-dexterity/ability-dexterity-repo";

import calcService from "../../calculations/calc-service";

import type { IAbilityDexterityRow } from "./ability-dexterity-service-interfaces";

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

const getById = async (id: number): Promise<IAbilityDexterityRow> => {
  try {
    const dexterityModifier = await abilitiesDexterityRepo.getById(id);
    if (!dexterityModifier) throw new Error(`Ability dexterity with id ${id} not found.`);
    return dexterityModifier;
  } catch (error) {
    const errorMessage = `Error in getById at abilities dexterity service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityDexterityRow> => {
  try {
    const dexterityModifier = await abilitiesDexterityRepo.getByAbilityScore(abilityScore);
    if (!dexterityModifier) throw new Error(`Ability dexterity with abilityScore ${abilityScore} not found.`);
    return dexterityModifier;
  } catch (error) {
    const errorMessage = `Error in getByAbilityScore at abilities dexterity service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByRolling = async (): Promise<IAbilityDexterityRow> => {
  try {
    const abilityScore = calcService.rolls.rollAbility();
    return await getByAbilityScore(abilityScore);
  } catch (error) {
    const errorMessage = `Error in getByRolling at abilities dexterity service: ${error}`;
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
