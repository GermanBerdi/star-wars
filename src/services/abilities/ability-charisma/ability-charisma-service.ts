import abilitiesCharismaRepo from "../../../db/ability-charisma/ability-charisma-repo";

import calcService from "../../calculations/calc-service";

import type { IAbilityCharismaRow } from "./ability-charisma-service-interfaces";

const getAll = async (): Promise<IAbilityCharismaRow[]> => {
  try {
    const charismaModifiers = await abilitiesCharismaRepo.getAll();
    return charismaModifiers;
  } catch (error) {
    const errorMessage = `Error in getAll at abilities charisma service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<IAbilityCharismaRow> => {
  try {
    const charismaModifier = await abilitiesCharismaRepo.getById(id);
    if (!charismaModifier) throw new Error(`Ability charisma with id ${id} not found.`);
    return charismaModifier;
  } catch (error) {
    const errorMessage = `Error in getById at abilities charisma service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityCharismaRow> => {
  try {
    const charismaModifier = await abilitiesCharismaRepo.getByAbilityScore(abilityScore);
    if (!charismaModifier) throw new Error(`Ability charisma with abilityScore ${abilityScore} not found.`);
    return charismaModifier;
  } catch (error) {
    const errorMessage = `Error in getByAbilityScore at charisma service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByRolling = async (): Promise<IAbilityCharismaRow> => {
  try {
    const abilityScore = calcService.rolls.rollAbility();
    return await getByAbilityScore(abilityScore);
  } catch (error) {
    const errorMessage = `Error in getByRolling at abilities charisma service: ${error}`;
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
