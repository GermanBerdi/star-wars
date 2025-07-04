import abilitiesIntelligenceRepo from "../../../db/ability-intelligence/ability-intelligence-repo";

import calcService from "../../calculations/calc-service";

import type { IAbilityIntelligenceRow } from "./ability-intelligence-service-interfaces";

const getAll = async (): Promise<IAbilityIntelligenceRow[]> => {
  try {
    const intelligenceModifiers = await abilitiesIntelligenceRepo.getAll();
    return intelligenceModifiers;
  } catch (error) {
    const errorMessage = `Error in getAll at abilities intelligence service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<IAbilityIntelligenceRow> => {
  try {
    const intelligenceModifier = await abilitiesIntelligenceRepo.getById(id);
    if (!intelligenceModifier) throw new Error(`Ability intelligence with id ${id} not found.`);
    return intelligenceModifier;
  } catch (error) {
    const errorMessage = `Error in getById at abilities intelligence service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityIntelligenceRow> => {
  try {
    const intelligenceModifier = await abilitiesIntelligenceRepo.getByAbilityScore(abilityScore);
    if (!intelligenceModifier) throw new Error(`Ability intelligence with abilityScore ${abilityScore} not found.`);
    return intelligenceModifier;
  } catch (error) {
    const errorMessage = `Error in getByAbilityScore at intelligence service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByRolling = async (): Promise<IAbilityIntelligenceRow> => {
  try {
    const abilityScore = calcService.rolls.rollAbility();
    return getByAbilityScore(abilityScore);
  } catch (error) {
    const errorMessage = `Error in getByRolling at abilities intelligence service: ${error}`;
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
