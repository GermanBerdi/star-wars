import abilitiesStrengthRepo from "../../../db/ability-strength/ability-strength-repo";

import calcService from "../../calculations/calc-service";

import { StrengthIds, ExceptionalStrengthIds } from "./ability-strength-service-enums";
import { ClassGroup } from "../../calculations/character/character-enums";
import { Dice } from "../../calculations/rolls/rolls-enums";

import type { IAbilityStrengthRow } from "./ability-strength-service-interfaces";

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

const getById = async (id: string): Promise<IAbilityStrengthRow> => {
  try {
    const strengthModifier = await abilitiesStrengthRepo.getById(id);
    if (!strengthModifier) throw new Error(`Ability strength with id ${id} not found.`);
    return strengthModifier;
  } catch (error) {
    const errorMessage = `Error in getById at abilities strength service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByAbilityScore = async (
  abilityScore: number,
  exceptionalStrength: number | null,
): Promise<IAbilityStrengthRow> => {
  try {
    const strengthModifier = await abilitiesStrengthRepo.getByAbilityScore(abilityScore, exceptionalStrength);
    if (!strengthModifier)
      throw new Error(
        `Ability strength with abilityScore ${abilityScore} and exceptionalStrength ${exceptionalStrength} not found.`,
      );
    return strengthModifier;
  } catch (error) {
    const errorMessage = `Error in getByAbilityScore at abilities strength service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByRolling = async (classGroup: ClassGroup): Promise<IAbilityStrengthRow> => {
  try {
    const abilityScore = calcService.rolls.rollAbility();
    const exceptionalStrength = abilityScore === 18 && calcService.character.isWarrior(classGroup) ? calcService.rolls.rollDices(Dice._1D100) : null;
    return await getByAbilityScore(abilityScore, exceptionalStrength);
  } catch (error) {
    const errorMessage = `Error in getByRolling at abilities strength service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getExceptionalStrenghByRolling = async (): Promise<IAbilityStrengthRow> => {
  try {
    const exceptionalStrength = calcService.rolls.rollDices(Dice._1D100);
    return await getByAbilityScore(18, exceptionalStrength);
  } catch (error) {
    const errorMessage = `Error in getByRolling at abilities strength service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

const is18StrengthId = (strengthId: string): boolean => strengthId === StrengthIds.STR_18;

const isExceptionalStrengthId = (strengthId: string): boolean => strengthId in ExceptionalStrengthIds;

const isValidStrengthIdClass = (strengthId: string, classGroup: ClassGroup): boolean => {
  if (!is18StrengthId(strengthId) && !isExceptionalStrengthId(strengthId)) return true;
  if (calcService.character.isWarrior(classGroup)) return isExceptionalStrengthId(strengthId);
  return is18StrengthId(strengthId);
};

const service = {
  getAll,
  getById,
  getByAbilityScore,
  getByRolling,
  getExceptionalStrenghByRolling,
  is18StrengthId,
  isExceptionalStrengthId,
  isValidStrengthIdClass,
};

export default service;
