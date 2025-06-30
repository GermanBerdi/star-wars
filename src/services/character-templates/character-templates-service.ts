import characterTemplatesRepo from "../../db/character-templates/character-templates-repo";

import calcService from "../calculations/calc-service";
import abilitiesService from "../abilities/abilities-service";
import characterClassesService from "../character-classes/character-classes-service";
import armorTypesService from "../armor-types/armor-types-service";

import { ClassGroup, ArmorType, Thac0 } from "../calculations/character/character-enums";
import { Dice } from "../calculations/rolls/rolls-enums";
import { CharacterType } from "./character-templates-enums";

import type { IAbilityStrengthRow, IAbilityDexterityRow, IAbilityConstitutionRow } from "../abilities/abilities-service-interfaces";

import type {
  INewCharacterTemplateReq,
  ICharacterTemplateRow,
  ICharacterTemplateCalculated,
  IUpdateCharacterTemplateReq,
} from "./character-templates-interfaces";

const getOrRollStrength = async (
  classGroup: ClassGroup,
  strengthId: string | undefined,
): Promise<IAbilityStrengthRow> => {
  if (strengthId) return await abilitiesService.strength.getById(strengthId);
  const strengthScore = calcService.rolls.rollAbility();
  const exceptionalStrength =
    strengthScore === 18 && classGroup === ClassGroup.WARRIOR ? calcService.rolls.rollDices(Dice._1D100) : null;
  return await abilitiesService.strength.getByAbilityScore(strengthScore, exceptionalStrength);
};

const getOrRollDexterity = async (dexterityId: number | undefined): Promise<IAbilityDexterityRow> => {
  if (dexterityId) return await abilitiesService.dexterity.getById(dexterityId);
  const dexterityScore = calcService.rolls.rollAbility();
  return await abilitiesService.dexterity.getByAbilityScore(dexterityScore);
};

const getOrRollConstitution = async (constitutionId: number | undefined): Promise<IAbilityConstitutionRow> => {
  if (constitutionId) return await abilitiesService.constitution.getById(constitutionId);
  const constitutionScore = calcService.rolls.rollAbility();
  return await abilitiesService.constitution.getByAbilityScore(constitutionScore);
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
      hit_dices: calcService.character.rollHitDices(characterClass, character_level),
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
    newCharacterTemplateCalculated.armor_class = calcService.character.armorClass(armorType, dexterity);
    newCharacterTemplateCalculated.hit_dices_modified = calcService.character.calculateHitDicesModified(
      newCharacterTemplateCalculated.hit_dices,
      characterClass,
      constitution,
    );
    newCharacterTemplateCalculated.hp = calcService.character.calculateHp(
      newCharacterTemplateCalculated.hit_dices_modified,
      characterClass,
      newCharacterTemplateReq.character_level,
    );
    newCharacterTemplateCalculated.thac0_modifiers = await calcService.character.calculateThac0Modifiers(
      characterClass,
      newCharacterTemplateReq.character_level,
      strength,
    );
    newCharacterTemplateCalculated.thac0 = calcService.character.calculateThac0(newCharacterTemplateCalculated.thac0_modifiers);
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
