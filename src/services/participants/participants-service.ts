import participantsRepo from "../../db/participants/participants-repo";

import calcService from "../calculations/calc-service";
import fightsService from "../fights/fights-service";
import characterTemplatesService from "../character-templates/character-templates-service";

import { ParticipantStatus } from "./character-templates-enums";
import { Dice } from "../calculations/rolls/rolls-enums";

import type {
  INewParticipantReq,
  IParticipantRow,
  INewParticipantCalculatedReq,
  IUpdateParticipantReq,
} from "./participants-interfaces";

const create = async (newParticipant: INewParticipantReq): Promise<IParticipantRow> => {
  try {
    await fightsService.getById(newParticipant.fightId);
    const characterTemplate = await characterTemplatesService.getById(newParticipant.character_template_id);
    if (calcService.character.isCommon(characterTemplate.character_type))
      newParticipant.participant_name += ` [${characterTemplate.character_name}]`;
    const participants = await participantsRepo.getByFightId(newParticipant.fightId);
    const usedNames = participants.map((participant) => participant.participant_name);
    if (usedNames.includes(newParticipant.participant_name))
      throw new Error(`Participant with name ${newParticipant.participant_name} already used.`);
    const newParticipantCalculatedReq: INewParticipantCalculatedReq = {
      fight_id: newParticipant.fightId,
      character_template_id: newParticipant.character_template_id,
      participant_name: newParticipant.participant_name,
      class_id: characterTemplate.class_id,
      strength_id: characterTemplate.strength_id,
      dexterity_id: characterTemplate.dexterity_id,
      constitution_id: characterTemplate.constitution_id,
      intelligence_id: characterTemplate.intelligence_id,
      wisdom_id: characterTemplate.wisdom_id,
      charisma_id: characterTemplate.charisma_id,
      armor_type_id: characterTemplate.armor_type_id,
      armor_class: characterTemplate.armor_class,
      base_hp: characterTemplate.hp,
      hp: characterTemplate.hp,
      thac0: characterTemplate.thac0,
      initiative: characterTemplate.initiative,
      participant_status: newParticipant.participant_status ?? ParticipantStatus.ALIVE,
      team_id: newParticipant.team_id ?? null,
    };
    const participant = await participantsRepo.create(newParticipantCalculatedReq);
    return participant;
  } catch (error) {
    const errorMessage = `Error in create at participants service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const takeDamage = async (participant: IParticipantRow, damage: number): Promise<IParticipantRow> => {
  try {
    const hpAfterDamage = participant.hp - damage;
    const statusAfterDamage = calculateStatus(hpAfterDamage);
    const updateParticipantReq: IUpdateParticipantReq = {
      id: participant.id,
      hp: hpAfterDamage,
      participant_status: statusAfterDamage,
    };
    const participantUpdated = await update(updateParticipantReq);
    return participantUpdated;
  } catch (error) {
    const errorMessage = `Error in takeDamage at participants service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (updateParticipantReq: IUpdateParticipantReq): Promise<IParticipantRow> => {
  try {
    const participant = await participantsRepo.update(updateParticipantReq);
    return participant;
  } catch (error) {
    const errorMessage = `Error in update at participants service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getAll = async (): Promise<IParticipantRow[]> => {
  try {
    const participants = await participantsRepo.getAll();
    return participants;
  } catch (error) {
    const errorMessage = `Error in getAll at participants service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<IParticipantRow> => {
  try {
    const participant = await participantsRepo.getById(id);
    if (!participant) throw new Error(`Participant with id ${id} not found.`);
    return participant;
  } catch (error) {
    const errorMessage = `Error in getById at participants service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByFightId = async (fightId: number): Promise<IParticipantRow[]> => {
  try {
    await fightsService.getById(fightId);
    const participants = await participantsRepo.getByFightId(fightId);
    return participants;
  } catch (error) {
    const errorMessage = `Error in getByFightId at participants service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByIdAndFightId = async (id: number, fightId: number): Promise<IParticipantRow> => {
  try {
    const participant = await participantsRepo.getByIdAndFightId(id, fightId);
    if (!participant) throw new Error(`Participant with id ${id} not found in fight ${fightId}.`);
    return participant;
  } catch (error) {
    const errorMessage = `Error in getByIdAndFightId at participants service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const rollInitiative = (participant: IParticipantRow): number =>
  participant.initiative + calcService.rolls.rollDices(Dice._1D10);

const isAlive = (participant: IParticipantRow): boolean => participant.participant_status === ParticipantStatus.ALIVE;

const calculateStatus = (hp: number): ParticipantStatus => {
  if (hp > 0) return ParticipantStatus.ALIVE;
  if (hp === 0) return ParticipantStatus.UNCONSCIOUS;
  if (hp > -10) return ParticipantStatus.INCAPACITATED;
  return ParticipantStatus.DEAD;
};

const service = {
  create,
  takeDamage,
  update,
  getAll,
  getById,
  getByFightId,
  getByIdAndFightId,
  rollInitiative,
  isAlive,
  calculateStatus,
};

export default service;
