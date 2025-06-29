import characterTemplatesRepo from "../../db/character/character-templates-repo";

import rollsService from "../rolls/rolls-service";
import abilityStrengthService from "../abilities/ability-strength-service";
import abilityDexterityService from "../abilities/ability-dexterity-service";
import abilityConstitutionService from "../abilities/ability-constitution-service";
import thac0sService from "../../services/thac0s/thac0s-service";
import characterClassesService from "../character/character-classes-service";
import armorTypesService from "../armor-types/armor-types-service";

import type { IAbilityStrengthRow } from "../abilities/ability-strength-service-interfaces";
import type { IAbilityDexterityRow } from "../abilities/ability-dexterity-service-interfaces";
import type { IAbilityConstitutionRow } from "../abilities/ability-constitution-service-interfaces";
import type { IArmorTypeRow } from "../armor-types/armor-types-interfaces";
import type { ICharacterClassRow } from "./character-classes-interfaces";
import type {
  IThac0Modifiers,
  INewCharacterTemplateReq,
  ICharacterTemplateRow,
  ICharacterTemplateCalculated,
  IUpdateCharacterTemplateReq,
} from "./character-templates-interfaces";

import { Dice } from "../rolls/rolls-enums";
import { ClassGroup } from "./character-classes-enums";
import { ArmorType } from "../armor-types/armor_types-enums";
import { Thac0 } from "../thac0s/thac0s-enums";
import { CharacterType } from "./character-templates-enums";

const getOrRollStrength = async (
  classGroup: ClassGroup,
  strengthId: string | undefined,
): Promise<IAbilityStrengthRow> => {
  if (strengthId) return await abilityStrengthService.getById(strengthId);
  const strengthScore = rollsService.rollAbility();
  const exceptionalStrength =
    strengthScore === 18 && classGroup === ClassGroup.WARRIOR ? rollsService.rollDices(Dice._1D100) : null;
  return await abilityStrengthService.getByAbilityScore(strengthScore, exceptionalStrength);
};

const getOrRollDexterity = async (dexterityId: number | undefined): Promise<IAbilityDexterityRow> => {
  if (dexterityId) return await abilityDexterityService.getById(dexterityId);
  const dexterityScore = rollsService.rollAbility();
  return await abilityDexterityService.getByAbilityScore(dexterityScore);
};

const getOrRollConstitution = async (constitutionId: number | undefined): Promise<IAbilityConstitutionRow> => {
  if (constitutionId) return await abilityConstitutionService.getById(constitutionId);
  const constitutionScore = rollsService.rollAbility();
  return await abilityConstitutionService.getByAbilityScore(constitutionScore);
};

const calculateArmorClass = (armorType: IArmorTypeRow, dexterity: IAbilityDexterityRow) => {
  return armorType.armor_class + dexterity.defensive_adjustment;
};

const rollHitDices = (characterClass: ICharacterClassRow, characterLevel: number): number[] => {
  const hitDices: number[] = [];
  const hitDice = characterClass.hit_dice;
  const numberOfDices = Math.min(characterLevel, characterClass.hit_dice_limit);
  for (let i = 0; i < numberOfDices; i++) {
    const roll = rollsService.rollNumber(hitDice);
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

const create = async (newCharacterTemplateReq: INewCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  try {
    const { character_name, class_id, character_level, armor_type_id, speed, character_type, character_description } =
      newCharacterTemplateReq;
    const characterClass = await characterClassesService.getById(newCharacterTemplateReq.class_id);
    const strength = await getOrRollStrength(characterClass.class_group, newCharacterTemplateReq.strength_id);
    const dexterity = await getOrRollDexterity(newCharacterTemplateReq.dexterity_id);
    const constitution = await getOrRollConstitution(newCharacterTemplateReq.constitution_id);
    const armorType = await armorTypesService.getById(newCharacterTemplateReq.armor_type_id);
    const newCharacterTemplateCalculated: ICharacterTemplateCalculated = {
      character_name,
      class_id,
      character_level,
      strength_id: strength.id,
      dexterity_id: dexterity.id,
      constitution_id: constitution.id,
      armor_type_id,
      armor_class: ArmorType.NO_ARMOR,
      speed,
      hit_dices: rollHitDices(characterClass, character_level),
      hit_dices_modified: [],
      hp: 0,
      thac0_modifiers: {
        base: Thac0.NO_THAC0,
        strength_hit_probability: 0,
      },
      thac0: Thac0.NO_THAC0,
      character_type: character_type ?? CharacterType.COMMON,
      character_description: character_description ?? null,
    };
    newCharacterTemplateCalculated.armor_class = calculateArmorClass(armorType, dexterity);
    newCharacterTemplateCalculated.hit_dices_modified = calculateHitDicesModified(
      newCharacterTemplateCalculated.hit_dices,
      characterClass,
      constitution,
    );
    newCharacterTemplateCalculated.hp = calculateHp(
      newCharacterTemplateCalculated.hit_dices_modified,
      characterClass,
      newCharacterTemplateReq.character_level,
    );
    newCharacterTemplateCalculated.thac0_modifiers = await calculateThac0Modifiers(
      characterClass,
      newCharacterTemplateReq.character_level,
      strength,
    );
    newCharacterTemplateCalculated.thac0 = calculateThac0(newCharacterTemplateCalculated.thac0_modifiers);
    const characterTemplate = await characterTemplatesRepo.create(newCharacterTemplateCalculated);
    return characterTemplate;
  } catch (error) {
    const errorMessage = `Error in create at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (updateCharacterTemplateReq: IUpdateCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  try {
    const characterTemplate = await characterTemplatesRepo.update(updateCharacterTemplateReq);
    return characterTemplate;
  } catch (error) {
    const errorMessage = `Error in update at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getAll = async (): Promise<ICharacterTemplateRow[]> => {
  try {
    const characterTemplates = await characterTemplatesRepo.getAll();
    return characterTemplates;
  } catch (error) {
    const errorMessage = `Error in getAll at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<ICharacterTemplateRow> => {
  try {
    const characterTemplate = await characterTemplatesRepo.getById(id);
    if (!characterTemplate) throw new Error(`Character template with id ${id} not found.`);
    return characterTemplate;
  } catch (error) {
    const errorMessage = `Error in getById at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    await characterTemplatesRepo.remove(id);
  } catch (error) {
    const errorMessage = `Error in remove at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  create,
  update,
  getAll,
  getById,
  remove,
};

export default service;
