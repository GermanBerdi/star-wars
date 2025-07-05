import characterTemplatesRepo from "../../db/character-templates/character-templates-repo";

import { getById } from "./character-templates-service";
import calcService from "../calculations/calc-service";
import abilitiesService from "../abilities/abilities-service";
import characterClassesService from "../character-classes/character-classes-service";
import armorTypesService from "../armor-types/armor-types-service";

import type { IAbilityStrengthRow } from "../abilities/abilities-service-interfaces";
import type { ICharacterTemplateRow, IUpdateCharacterTemplateReq, IUpdateCharacterTemplateCalculatedReq } from "./character-templates-interfaces";
import type { ICharacterClassRow } from "../character-classes/character-classes-interfaces";

const update = async (
  updateCharacterTemplateReq: IUpdateCharacterTemplateReq,
  isReassign: boolean = false,
): Promise<ICharacterTemplateRow> => {
  try {
    const currentCharacterTemplate = await getById(updateCharacterTemplateReq.id);
    let strength: IAbilityStrengthRow | null = null;
    let characterClass: ICharacterClassRow | null = null;
    const updateCharacterTemplateCalculated: IUpdateCharacterTemplateCalculatedReq = {
      id: updateCharacterTemplateReq.id,
      character_name: updateCharacterTemplateReq.character_name,
      class_id: updateCharacterTemplateReq.class_id,
      character_level: updateCharacterTemplateReq.character_level,
      strength_id: updateCharacterTemplateReq.strength_id,
      dexterity_id: updateCharacterTemplateReq.dexterity_id,
      constitution_id: updateCharacterTemplateReq.constitution_id,
      intelligence_id: updateCharacterTemplateReq.intelligence_id,
      wisdom_id: updateCharacterTemplateReq.wisdom_id,
      charisma_id: updateCharacterTemplateReq.charisma_id,
      armor_type_id: updateCharacterTemplateReq.armor_type_id,
      hit_dices: updateCharacterTemplateReq.hit_dices,
      character_type: updateCharacterTemplateReq.character_type,
      character_description: updateCharacterTemplateReq.character_description,
    };
    if (updateCharacterTemplateReq.class_id || updateCharacterTemplateReq.strength_id) {
      strength = await abilitiesService.strength.getById(
        updateCharacterTemplateReq.strength_id || currentCharacterTemplate.strength_id,
      );
      characterClass = await characterClassesService.getById(
        updateCharacterTemplateReq.class_id || currentCharacterTemplate.class_id,
      );
      if (!abilitiesService.strength.isValidStrengthIdClass(strength.id,characterClass.class_group)) {
        if (updateCharacterTemplateReq.strength_id) throw new Error(`Invalid strength ${strength.id} for class group ${characterClass.class_group}`);
        strength = await calcService.character.adjustStrength18ByClass(currentCharacterTemplate,characterClass.class_group);
      }
      if (calcService.character.isFirstExceptionalStrength(currentCharacterTemplate,strength.id))
        updateCharacterTemplateCalculated.last_exceptional_strength_id = strength.id;
      else if (updateCharacterTemplateReq.strength_id && !isReassign)
        updateCharacterTemplateCalculated.last_exceptional_strength_id = abilitiesService.strength.isExceptionalStrengthId(strength.id) ? strength.id : null;
    }
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
      if (!characterClass)
        characterClass = await characterClassesService.getById(
          updateCharacterTemplateReq.class_id || currentCharacterTemplate.class_id,
        );
      const characterLevel = updateCharacterTemplateReq.character_level || currentCharacterTemplate.character_level;
      const constitution = await abilitiesService.constitution.getById(
        updateCharacterTemplateReq.constitution_id || currentCharacterTemplate.constitution_id,
      );
      if (updateCharacterTemplateReq.hit_dices) {
        // User provided explicit dice rolls - validate and use them
        if (!calcService.character.validateHitDices(updateCharacterTemplateReq.hit_dices, characterClass, characterLevel))
          throw new Error(`Invalid hit dices for class ${characterClass} and level ${characterLevel}`);
        updateCharacterTemplateCalculated.hit_dices = updateCharacterTemplateReq.hit_dices;
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
      if (!strength)
        strength = await abilitiesService.strength.getById(
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
    const currentIntelligence = await abilitiesService.intelligence.getById(currentCharacter.intelligence_id);
    const currentWisdom = await abilitiesService.wisdom.getById(currentCharacter.wisdom_id);
    const currentCharisma = await abilitiesService.charisma.getById(currentCharacter.charisma_id);
    const currentScores = [
      currentStrength.ability_score,
      currentDexterity.ability_score,
      currentConstitution.ability_score,
      currentIntelligence.ability_score,
      currentWisdom.ability_score,
      currentCharisma.ability_score,
    ];
    const strIndex = reassignArray[0] - 1;
    const dexIndex = reassignArray[1] - 1;
    const conIndex = reassignArray[2] - 1;
    const intIndex = reassignArray[3] - 1;
    const wisIndex = reassignArray[4] - 1;
    const chaIndex = reassignArray[5] - 1;
    const newStrengthScore = currentScores[strIndex];
    const newDexterityScore = currentScores[dexIndex];
    const newConstitutionScore = currentScores[conIndex];
    const newIntelligenceScore = currentScores[intIndex];
    const newWisdomScore = currentScores[wisIndex];
    const newCharismaScore = currentScores[chaIndex];
    const newStrength =
      newStrengthScore === 18
        ? await calcService.character.adjustStrength18ByClass(currentCharacter,currentClass.class_group)
        : await abilitiesService.strength.getByAbilityScore(newStrengthScore, null);
    const newDexterity = await abilitiesService.dexterity.getByAbilityScore(newDexterityScore);
    const newConstitution = await abilitiesService.constitution.getByAbilityScore(newConstitutionScore);
    const newIntelligence = await abilitiesService.intelligence.getByAbilityScore(newIntelligenceScore);
    const newWisdom = await abilitiesService.wisdom.getByAbilityScore(newWisdomScore);
    const newCharisma = await abilitiesService.charisma.getByAbilityScore(newCharismaScore);
    const updateCharacterTemplateReq: IUpdateCharacterTemplateReq = {
      id,
      strength_id: newStrength.id,
      dexterity_id: newDexterity.id,
      constitution_id: newConstitution.id,
      intelligence_id: newIntelligence.id,
      wisdom_id: newWisdom.id,
      charisma_id: newCharisma.id,
    };
    return await update(updateCharacterTemplateReq, true);
  } catch (error) {
    throw new Error(`Error reassigning attributes for character template ${id}: ${error}`);
  }
};

const updater = {
  update,
  reassignAbilities,
}

export { update };
export default updater;
