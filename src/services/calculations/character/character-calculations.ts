import rollCalculation from "../rolls/rolls-calculations";
import abilitiesService from "../../abilities/abilities-service";
import thac0sService from "../../thac0s/thac0s-service";

import { ClassGroup, Initiative } from "./character-enums";
import { StrengthIds } from "../../abilities/ability-strength/ability-strength-service-enums";

import type {
  ICharacterTemplateRow,
  IThac0Modifiers,
  IInitiativeModifiers,
} from "../../character-templates/character-templates-interfaces";
import type { IArmorTypeRow } from "../../armor-types/armor-types-interfaces";
import type {
  IAbilityStrengthRow,
  IAbilityDexterityRow,
  IAbilityConstitutionRow,
} from "../../abilities/abilities-service-interfaces";
import type { ICharacterClassRow } from "../../character-classes/character-classes-interfaces";
import { CharacterType } from "../../character-templates/character-templates-enums";

const restoreOrRollExceptionalStrength = async (character: ICharacterTemplateRow): Promise<IAbilityStrengthRow> => {
  if (character.last_exceptional_strength_id)
    return await abilitiesService.strength.getById(character.last_exceptional_strength_id);
  return await abilitiesService.strength.getExceptionalStrengthByRolling();
};

const adjustStrength18ByClass = async (
  character: ICharacterTemplateRow,
  classGroup: ClassGroup,
): Promise<IAbilityStrengthRow> => {
  if (!isWarrior(classGroup)) return await abilitiesService.strength.getById(StrengthIds.STR_18);
  return await restoreOrRollExceptionalStrength(character);
};

const isFirstExceptionalStrength = (character: ICharacterTemplateRow, strengthId: string): Boolean =>
  character.last_exceptional_strength_id === null && abilitiesService.strength.isExceptionalStrengthId(strengthId);

const isWarrior = (classGroup: ClassGroup) => classGroup === ClassGroup.WARRIOR;

const armorClass = (armorType: IArmorTypeRow, dexterity: IAbilityDexterityRow) =>
  armorType.armor_class + dexterity.defensive_adjustment;

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
  const thac0Modifiers: IThac0Modifiers = {
    base: thac0[characterClass.class_group],
    strengthHitProbability: strength.hit_probability,
  };
  return thac0Modifiers;
};

const calculateThac0 = (thac0Modifiers: IThac0Modifiers): number => {
  return thac0Modifiers.base - thac0Modifiers.strengthHitProbability;
};

// Custom rule. "base": reserved field for future implementation of race-related base modifier.
// "dexterityBonus": bonus value derived from dexterity defensive_adjustment calculation.
const calculateInitiativeModifiers = (dexterity: IAbilityDexterityRow): IInitiativeModifiers => {
  const initiativeModifiers: IInitiativeModifiers = {
    base: Initiative.BASE,
    dexterityBonus: dexterity.defensive_adjustment,
  };
  return initiativeModifiers;
};

// Custom rule. Value resulting from applying modifiers to base value,
// determines character's initiative roll bonus in combat
const calculateInitiative = (initiativeModifiers: IInitiativeModifiers): number => {
  return initiativeModifiers.base + initiativeModifiers.dexterityBonus;
};

const isCommon = (characterType: CharacterType) => characterType === CharacterType.COMMON;

const service = {
  restoreOrRollExceptionalStrength,
  adjustStrength18ByClass,
  isFirstExceptionalStrength,
  isWarrior,
  armorClass,
  rollHitDices,
  validateHitDices,
  adjustHitDicesByLevel,
  calculateHitDicesModified,
  calculateHp,
  calculateThac0Modifiers,
  calculateThac0,
  calculateInitiativeModifiers,
  calculateInitiative,
  isCommon,
};

export default service;
