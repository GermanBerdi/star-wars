import rollCalculation from "../rolls/rolls-calculations";
import abilitiesService from "../../abilities/abilities-service";
import thac0sService from "../../thac0s/thac0s-service";

import { Dice } from "../rolls/rolls-enums";
import { ClassGroup } from "./character-enums";

import type { ICharacterTemplateRow, IThac0Modifiers } from "../../character-templates/character-templates-interfaces";
import type { IArmorTypeRow } from "../../armor-types/armor-types-interfaces";
import type {
  IAbilityStrengthRow,
  IAbilityDexterityRow,
  IAbilityConstitutionRow,
} from "../../abilities/abilities-service-interfaces";
import type { ICharacterClassRow } from "../../character-classes/character-classes-interfaces";
import calcService from "../calc-service";

const restoreOrRollExceptionalStrength = async (character: ICharacterTemplateRow): Promise<IAbilityStrengthRow> => {
  if (character.last_exceptional_strength_id)
    return await abilitiesService.strength.getById(character.last_exceptional_strength_id);
  const exceptionalStrength = calcService.rolls.rollDices(Dice._1D100);
  return await abilitiesService.strength.getByAbilityScore(18, exceptionalStrength);
};

const armorClass = (armorType: IArmorTypeRow, dexterity: IAbilityDexterityRow) => {
  return armorType.armor_class + dexterity.defensive_adjustment;
};

const rollHitDices = (characterClass: ICharacterClassRow, characterLevel: number): number[] => {
  const hitDices: number[] = [];
  const hitDice = characterClass.hit_dice;
  const numberOfDices = Math.min(characterLevel, characterClass.hit_dice_limit);
  for (let i = 0; i < numberOfDices; i++) {
    const roll = rollCalculation.rollNumber(hitDice);
    hitDices.push(roll);
  }
  return hitDices;
};

const validateHitDices = (hitDices: number[], characterClass: ICharacterClassRow, characterLevel: number): boolean => {
  const hitDice = characterClass.hit_dice;
  const numberOfDices = Math.min(characterLevel, characterClass.hit_dice_limit);
  if (hitDices.length !== numberOfDices) return false;
  return hitDices.every((value) => value >= 1 && value <= hitDice);
};

const adjustHitDicesByLevel = (
  hitDices: number[],
  characterClass: ICharacterClassRow,
  characterLevel: number,
): number[] => {
  const hitDicesAdjusted = [...hitDices];
  const hitDice = characterClass.hit_dice;
  const numberOfDices = Math.min(characterLevel, characterClass.hit_dice_limit);
  if (hitDicesAdjusted.length > numberOfDices) return hitDicesAdjusted.slice(0, numberOfDices);
  while (hitDicesAdjusted.length < numberOfDices) {
    const roll = rollCalculation.rollNumber(hitDice);
    hitDicesAdjusted.push(roll);
  }
  return hitDicesAdjusted;
};

const calculateHitDicesModified = (
  hitDices: number[],
  characterClass: ICharacterClassRow,
  constitution: IAbilityConstitutionRow,
): number[] => {
  const hitDiceMin = constitution.hit_dice_min;
  const hitPointAdjustment =
    characterClass.class_group !== ClassGroup.WARRIOR
      ? constitution.hit_point_adjustment
      : constitution.warrior_hit_point_adjustment;
  const hitDicesModified = hitDices.map((hitDice) => {
    const hitDiceRaised = Math.max(hitDice, hitDiceMin);
    const value = Math.max(hitDiceRaised + hitPointAdjustment, 1);
    return value;
  });
  return hitDicesModified;
};

const calculateHp = (hitDicesModified: number[], characterClass: ICharacterClassRow, characterLevel: number) => {
  const rolledHp = hitDicesModified.reduce((accum, value) => accum + value, 0);
  const numberOfFixed = Math.max(characterLevel - characterClass.hit_dice_limit, 0);
  const fixedHp = numberOfFixed * characterClass.hit_fixed;
  return rolledHp + fixedHp;
};

const calculateThac0Modifiers = async (
  characterClass: ICharacterClassRow,
  characterLevel: number,
  strength: IAbilityStrengthRow,
): Promise<IThac0Modifiers> => {
  const thac0 = await thac0sService.getByCharacterLevel(characterLevel);
  const thac0Mmodifiers: IThac0Modifiers = {
    base: thac0[characterClass.class_group],
    strength_hit_probability: strength.hit_probability,
  };
  return thac0Mmodifiers;
};

const calculateThac0 = (thac0Modifiers: IThac0Modifiers): number => {
  return thac0Modifiers.base - thac0Modifiers.strength_hit_probability;
};

const service = {
  restoreOrRollExceptionalStrength,
  armorClass,
  rollHitDices,
  validateHitDices,
  adjustHitDicesByLevel,
  calculateHitDicesModified,
  calculateHp,
  calculateThac0Modifiers,
  calculateThac0,
};

export default service;
