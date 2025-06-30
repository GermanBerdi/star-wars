import rollCalculation from "../rolls/rolls-calculations";
import thac0sService from "../../thac0s/thac0s-service";

import { ClassGroup } from "./character-enums";

import type { IArmorTypeRow } from "../../armor-types/armor-types-interfaces";
import type { IAbilityStrengthRow, IAbilityDexterityRow, IAbilityConstitutionRow } from "../../abilities/abilities-service-interfaces";
import type { ICharacterClassRow } from "../../character-classes/character-classes-interfaces";
import type { IThac0Modifiers } from "../../character-templates/character-templates-interfaces";

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
  armorClass,  
  rollHitDices,
  calculateHitDicesModified,
  calculateHp,
  calculateThac0Modifiers,
  calculateThac0
};

export default service;
