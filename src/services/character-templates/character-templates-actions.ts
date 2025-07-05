import { getById } from "./character-templates-service";
import { update } from "./character-templates-update";
import calcService from "../calculations/calc-service";
import abilitiesService from "../abilities/abilities-service";
import characterClassesService from "../character-classes/character-classes-service";

import type {
  ICharacterTemplateRow,
  IRerollAbilitiesReq,
  IUpdateCharacterTemplateReq,
} from "./character-templates-interfaces";

const rerollAbilities = async (rerollAbilitiesReq: IRerollAbilitiesReq): Promise<ICharacterTemplateRow> => {
  try {
    const { id, strength, dexterity, constitution, intelligence, wisdom, charisma } = rerollAbilitiesReq;
    if (!strength && !dexterity && !constitution && !intelligence && !wisdom && !charisma)
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
    if (intelligence) {
      const newIntelligence = await abilitiesService.intelligence.getByRolling();
      updateCharacterTemplateReq.intelligence_id = newIntelligence.id;
    }
    if (wisdom) {
      const newWisdom = await abilitiesService.wisdom.getByRolling();
      updateCharacterTemplateReq.wisdom_id = newWisdom.id;
    }
    if (charisma) {
      const newCharisma = await abilitiesService.charisma.getByRolling();
      updateCharacterTemplateReq.charisma_id = newCharisma.id;
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

const actions = {
  rerollAbilities,
  rerollHitDices,
};

export default actions;
