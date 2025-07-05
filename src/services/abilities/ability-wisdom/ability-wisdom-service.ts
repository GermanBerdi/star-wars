import abilitiesWisdomRepo from "../../../db/ability-wisdom/ability-wisdom-repo";

import calcService from "../../calculations/calc-service";

import type { IAbilityWisdomRow } from "./ability-wisdom-service-interfaces";

const getAll = async (): Promise<IAbilityWisdomRow[]> => {
  try {
    const wisdomModifiers = await abilitiesWisdomRepo.getAll();
    return wisdomModifiers;
  } catch (error) {
    const errorMessage = `Error in getAll at abilities wisdom service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<IAbilityWisdomRow> => {
  try {
    const wisdomModifier = await abilitiesWisdomRepo.getById(id);
    if (!wisdomModifier) throw new Error(`Ability wisdom with id ${id} not found.`);
    return wisdomModifier;
  } catch (error) {
    const errorMessage = `Error in getById at abilities wisdom service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityWisdomRow> => {
  try {
    const wisdomModifier = await abilitiesWisdomRepo.getByAbilityScore(abilityScore);
    if (!wisdomModifier) throw new Error(`Ability wisdom with abilityScore ${abilityScore} not found.`);
    return wisdomModifier;
  } catch (error) {
    const errorMessage = `Error in getByAbilityScore at wisdom service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByRolling = async (): Promise<IAbilityWisdomRow> => {
  try {
    const abilityScore = calcService.rolls.rollAbility();
    return await getByAbilityScore(abilityScore);
  } catch (error) {
    const errorMessage = `Error in getByRolling at abilities wisdom service: ${error}`;
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
