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
  IAbilityIntelligenceRow,
  IAbilityWisdomRow,
  IAbilityCharismaRow,
} from "../abilities/abilities-service-interfaces";

import type {
  INewCharacterTemplateReq,
  ICharacterTemplateRow,
  INewCharacterTemplateCalculatedReq,
} from "./character-templates-interfaces";

const getOrRollStrength = async (
  classGroup: ClassGroup,
  strengthId: string | undefined,
): Promise<IAbilityStrengthRow> => {
  if (strengthId) {
    if (!abilitiesService.strength.isValidStrengthIdClass(strengthId, classGroup))
      throw new Error(`Invalid strength ${strengthId} for class group ${classGroup}`);
    const strength = await abilitiesService.strength.getById(strengthId);
    return strength;
  }
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

const getOrRollIntelligence = async (intelligenceId: number | undefined): Promise<IAbilityIntelligenceRow> => {
  if (intelligenceId) return await abilitiesService.intelligence.getById(intelligenceId);
  return await abilitiesService.intelligence.getByRolling();
};

const getOrRollWisdom = async (wisdomId: number | undefined): Promise<IAbilityWisdomRow> => {
  if (wisdomId) return await abilitiesService.wisdom.getById(wisdomId);
  return await abilitiesService.wisdom.getByRolling();
};

const getOrRollCharisma = async (charismaId: number | undefined): Promise<IAbilityCharismaRow> => {
  if (charismaId) return await abilitiesService.charisma.getById(charismaId);
  return await abilitiesService.charisma.getByRolling();
};

const create = async (newCharacterTemplateReq: INewCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  try {
    const { character_name, class_id, character_level, armor_type_id, character_type, character_description } =
      newCharacterTemplateReq;
    const characterClass = await characterClassesService.getById(newCharacterTemplateReq.class_id);
    const strength = await getOrRollStrength(characterClass.class_group, newCharacterTemplateReq.strength_id);
    const dexterity = await getOrRollDexterity(newCharacterTemplateReq.dexterity_id);
    const constitution = await getOrRollConstitution(newCharacterTemplateReq.constitution_id);
    const intelligence = await getOrRollIntelligence(newCharacterTemplateReq.intelligence_id);
    const wisdom = await getOrRollWisdom(newCharacterTemplateReq.wisdom_id);
    const charisma = await getOrRollCharisma(newCharacterTemplateReq.charisma_id);
    const armorType = await armorTypesService.getById(newCharacterTemplateReq.armor_type_id);
    const newCharacterTemplateCalculated: INewCharacterTemplateCalculatedReq = {
      character_name,
      class_id,
      character_level,
      strength_id: strength.id,
      dexterity_id: dexterity.id,
      constitution_id: constitution.id,
      intelligence_id: intelligence.id,
      wisdom_id: wisdom.id,
      charisma_id: charisma.id,
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
      last_exceptional_strength_id: abilitiesService.strength.isExceptionalStrengthId(strength.id) ? strength.id : null,
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

const creator = {
  create,
};

export default creator;
