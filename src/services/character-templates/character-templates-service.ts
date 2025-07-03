import characterTemplatesRepo from "../../db/character-templates/character-templates-repo";

import calcService from "../calculations/calc-service";
import abilitiesService from "../abilities/abilities-service";
import characterClassesService from "../character-classes/character-classes-service";
import armorTypesService from "../armor-types/armor-types-service";

import { ClassGroup, ArmorType, Thac0 } from "../calculations/character/character-enums";
import { CharacterType } from "./character-templates-enums";

import type {
  IAbilityStrengthRow,
  IAbilityDexterityRow,
  IAbilityConstitutionRow,
} from "../abilities/abilities-service-interfaces";

import type {
  INewCharacterTemplateReq,
  ICharacterTemplateRow,
  INewCharacterTemplateCalculatedReq,
  IRerollAbilitiesReq,
  IUpdateCharacterTemplateReq,
  IUpdateCharacterTemplateCalculatedReq,
} from "./character-templates-interfaces";
import type { ICharacterClassRow } from "../character-classes/character-classes-interfaces";
import { Dice } from "../calculations/rolls/rolls-enums";

const getOrRollStrength = async (
  classGroup: ClassGroup,
  strengthId: string | undefined,
): Promise<IAbilityStrengthRow> => {
  if (strengthId) return await abilitiesService.strength.getById(strengthId);
  return await abilitiesService.strength.getByRolling(classGroup);
};

const getOrRollDexterity = async (dexterityId: number | undefined): Promise<IAbilityDexterityRow> => {
  if (dexterityId) return await abilitiesService.dexterity.getById(dexterityId);
  return await abilitiesService.dexterity.getByRolling();
};

const getOrRollConstitution = async (constitutionId: number | undefined): Promise<IAbilityConstitutionRow> => {
  if (constitutionId) return await abilitiesService.constitution.getById(constitutionId);
  return await abilitiesService.constitution.getByRolling();
};

const create = async (newCharacterTemplateReq: INewCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  try {
    const { character_name, class_id, character_level, armor_type_id, character_type, character_description } =
      newCharacterTemplateReq;
    const characterClass = await characterClassesService.getById(newCharacterTemplateReq.class_id);
    const strength = await getOrRollStrength(characterClass.class_group, newCharacterTemplateReq.strength_id);
    const dexterity = await getOrRollDexterity(newCharacterTemplateReq.dexterity_id);
    const constitution = await getOrRollConstitution(newCharacterTemplateReq.constitution_id);
    const armorType = await armorTypesService.getById(newCharacterTemplateReq.armor_type_id);
    const newCharacterTemplateCalculated: INewCharacterTemplateCalculatedReq = {
      character_name,
      class_id,
      character_level,
      strength_id: strength.id,
      dexterity_id: dexterity.id,
      constitution_id: constitution.id,
      armor_type_id,
      armor_class: ArmorType.NO_ARMOR,
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
    newCharacterTemplateCalculated.thac0 = calcService.character.calculateThac0(
      newCharacterTemplateCalculated.thac0_modifiers,
    );
    const characterTemplate = await characterTemplatesRepo.create(newCharacterTemplateCalculated);
    return characterTemplate;
  } catch (error) {
    const errorMessage = `Error in create at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const rerollAbilities = async (rerollAbilitiesReq: IRerollAbilitiesReq): Promise<ICharacterTemplateRow> => {
  try {
    const { id, strength, dexterity, constitution } = rerollAbilitiesReq;
    if (!strength && !dexterity && !constitution)
      throw new Error("At least one ability must be set to true for rerolling");
    const updateCharacterTemplateReq: IUpdateCharacterTemplateReq = {
      id,
    };
    if (strength) {
      const characterTemplate = await getById(id);
      const characterClass = await characterClassesService.getById(characterTemplate.class_id);
      const newStrength = await abilitiesService.strength.getByRolling(characterClass.class_group);
      updateCharacterTemplateReq.strength_id = newStrength.id;
    }
    if (dexterity) {
      const newDexterity = await abilitiesService.dexterity.getByRolling();
      updateCharacterTemplateReq.dexterity_id = newDexterity.id;
    }
    if (constitution) {
      const newConstitution = await abilitiesService.constitution.getByRolling();
      updateCharacterTemplateReq.constitution_id = newConstitution.id;
    }
    const characterTemplate = await update(updateCharacterTemplateReq);
    return characterTemplate;
  } catch (error) {
    const errorMessage = `Error in reroll abilities at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const rerollHitDices = async (id: number): Promise<ICharacterTemplateRow> => {
  try {
    const currentCharacterTemplate = await getById(id);
    const characterClass = await characterClassesService.getById(currentCharacterTemplate.class_id);
    const newHitDices = calcService.character.rollHitDices(characterClass, currentCharacterTemplate.character_level);
    const updateCharacterTemplateReq: IUpdateCharacterTemplateReq = {
      id,
      hit_dices: newHitDices,
    };
    const characterTemplate = await update(updateCharacterTemplateReq);
    return characterTemplate;
  } catch (error) {
    const errorMessage = `Error in reroll hit dices at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (updateCharacterTemplateReq: IUpdateCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  try {
    const currentCharacterTemplate = await getById(updateCharacterTemplateReq.id);
    let characterClass: ICharacterClassRow | null = null;
    const updateCharacterTemplateCalculated: IUpdateCharacterTemplateCalculatedReq = {
      id: updateCharacterTemplateReq.id,
      character_name: updateCharacterTemplateReq.character_name,
      class_id: updateCharacterTemplateReq.class_id,
      character_level: updateCharacterTemplateReq.character_level,
      strength_id: updateCharacterTemplateReq.strength_id,
      dexterity_id: updateCharacterTemplateReq.dexterity_id,
      constitution_id: updateCharacterTemplateReq.constitution_id,
      armor_type_id: updateCharacterTemplateReq.armor_type_id,
      hit_dices: updateCharacterTemplateReq.hit_dices,
      character_type: updateCharacterTemplateReq.character_type,
      character_description: updateCharacterTemplateReq.character_description,
    };
    if (updateCharacterTemplateReq.dexterity_id || updateCharacterTemplateReq.armor_type_id) {
      const dexterity = await abilitiesService.dexterity.getById(
        updateCharacterTemplateReq.dexterity_id || currentCharacterTemplate.dexterity_id,
      );
      const armorType = await armorTypesService.getById(
        updateCharacterTemplateReq.armor_type_id || currentCharacterTemplate.armor_type_id,
      );
      updateCharacterTemplateCalculated.armor_class = calcService.character.armorClass(armorType, dexterity);
    }
    if (
      updateCharacterTemplateReq.class_id ||
      updateCharacterTemplateReq.character_level ||
      updateCharacterTemplateReq.constitution_id ||
      updateCharacterTemplateReq.hit_dices
    ) {
      characterClass = await characterClassesService.getById(
        updateCharacterTemplateReq.class_id || currentCharacterTemplate.class_id,
      );
      const characterLevel = updateCharacterTemplateReq.character_level || currentCharacterTemplate.character_level;
      const constitution = await abilitiesService.constitution.getById(
        updateCharacterTemplateReq.constitution_id || currentCharacterTemplate.constitution_id,
      );
      if (updateCharacterTemplateReq.hit_dices) {
        // User provided explicit dice rolls - validate and use them
        if (
          calcService.character.validateHitDices(updateCharacterTemplateReq.hit_dices, characterClass, characterLevel)
        ) {
          updateCharacterTemplateCalculated.hit_dices = updateCharacterTemplateReq.hit_dices;
        } else {
          throw new Error(`Invalid hit dices for class ${characterClass} and level ${characterLevel}`);
        }
      } else if (
        updateCharacterTemplateReq.class_id &&
        updateCharacterTemplateReq.class_id !== currentCharacterTemplate.class_id
      ) {
        // Class changed without explicit dice - generate new rolls
        updateCharacterTemplateCalculated.hit_dices = calcService.character.rollHitDices(
          characterClass,
          characterLevel,
        );
      } else if (
        updateCharacterTemplateReq.character_level &&
        updateCharacterTemplateReq.character_level !== currentCharacterTemplate.character_level
      ) {
        // No rolls provided. Class didn't change. Level has been changed.
        updateCharacterTemplateCalculated.hit_dices = calcService.character.adjustHitDicesByLevel(
          currentCharacterTemplate.hit_dices,
          characterClass,
          characterLevel,
        );
      } else {
        // No rolls provided. Class and level didn't change. Keep current rolls.
        updateCharacterTemplateCalculated.hit_dices = currentCharacterTemplate.hit_dices;
      }
      updateCharacterTemplateCalculated.hit_dices_modified = calcService.character.calculateHitDicesModified(
        updateCharacterTemplateCalculated.hit_dices,
        characterClass,
        constitution,
      );
      updateCharacterTemplateCalculated.hp = calcService.character.calculateHp(
        updateCharacterTemplateCalculated.hit_dices_modified,
        characterClass,
        characterLevel,
      );
    }
    if (
      updateCharacterTemplateReq.class_id ||
      updateCharacterTemplateReq.character_level ||
      updateCharacterTemplateReq.strength_id
    ) {
      const strength = await abilitiesService.strength.getById(
        updateCharacterTemplateReq.strength_id || currentCharacterTemplate.strength_id,
      );
      if (!characterClass)
        characterClass = await characterClassesService.getById(
          updateCharacterTemplateReq.class_id || currentCharacterTemplate.class_id,
        );
      const characterLevel = updateCharacterTemplateReq.character_level || currentCharacterTemplate.character_level;
      updateCharacterTemplateCalculated.thac0_modifiers = await calcService.character.calculateThac0Modifiers(
        characterClass,
        characterLevel,
        strength,
      );
      updateCharacterTemplateCalculated.thac0 = calcService.character.calculateThac0(
        updateCharacterTemplateCalculated.thac0_modifiers,
      );
    }
    const characterTemplate = await characterTemplatesRepo.update(updateCharacterTemplateCalculated);
    return characterTemplate;
  } catch (error) {
    const errorMessage = `Error in update at character templates service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const reassignAbilities = async (id: number, reassignArray: number[]): Promise<ICharacterTemplateRow> => {
  try {
    const currentCharacter = await getById(id);
    const currentClass = await characterClassesService.getById(currentCharacter.class_id);
    const currentStrength = await abilitiesService.strength.getById(currentCharacter.strength_id);
    const currentDexterity = await abilitiesService.dexterity.getById(currentCharacter.dexterity_id);
    const currentConstitution = await abilitiesService.constitution.getById(currentCharacter.constitution_id);
    const currentScores = [
      currentStrength.ability_score,
      currentDexterity.ability_score,
      currentConstitution.ability_score,
    ];
    const strIndex = reassignArray[0] - 1;
    const dexIndex = reassignArray[1] - 1;
    const conIndex = reassignArray[2] - 1;
    const newStrengthScore = currentScores[strIndex];
    const newDexterityScore = currentScores[dexIndex];
    const newConstitutionScore = currentScores[conIndex];
    const exceptionalStrength =
      newStrengthScore === 18 && currentClass.class_group === ClassGroup.WARRIOR
        ? calcService.rolls.rollDices(Dice._1D100)
        : null;
    const newStrength = await abilitiesService.strength.getByAbilityScore(newStrengthScore, exceptionalStrength);
    const newDexterity = await abilitiesService.dexterity.getByAbilityScore(newDexterityScore);
    const newConstitution = await abilitiesService.constitution.getByAbilityScore(newConstitutionScore);
    const updateCharacterTemplateReq: IUpdateCharacterTemplateReq = {
      id,
      strength_id: newStrength.id,
      dexterity_id: newDexterity.id,
      constitution_id: newConstitution.id,
    };
    return await update(updateCharacterTemplateReq);
  } catch (error) {
    throw new Error(`Error reassigning attributes for character template ${id}: ${error}`);
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
  rerollAbilities,
  rerollHitDices,
  update,
  reassignAbilities,
  getAll,
  getById,
  remove,
};

export default service;
