import abilitiesStrengthRepo from "../../../db/ability-strength/ability-strength-repo";

import calcService from "../../calculations/calc-service";

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
    const exceptionalStrength =
      abilityScore === 18 && classGroup === ClassGroup.WARRIOR ? calcService.rolls.rollDices(Dice._1D100) : null;
    return getByAbilityScore(abilityScore, exceptionalStrength);
  } catch (error) {
    const errorMessage = `Error in getByRolling at abilities strength service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const hasExcepcionalStrength = (strength: IAbilityStrengthRow): boolean => {
  return strength.exceptional_strength_min !== null && strength.exceptional_strength_max !== null;
};

const service = {
  getAll,
  getById,
  getByAbilityScore,
  getByRolling,
  hasExcepcionalStrength,
};

export default service;
