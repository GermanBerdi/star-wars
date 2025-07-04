import participantsRepo from "../../db/participants/participants-repo";

import fightsService from "../fights/fights-service";
import characterTemplatesService from "../character-templates/character-templates-service";
import rollsService from "../calculations/rolls/rolls-calculations";

import { Dice } from "../calculations/rolls/rolls-enums";

import type { INewParticipantReq, IParticipantRow } from "./character-participants-interfaces";
import type { CharacterType } from "../character-templates/character-templates-enums";

// const create = async (newParticipant: INewParticipantReq): Promise<IParticipantRow> => {
//   try {
//     await fightsService.getById(newParticipant.fightId);
//     const characterTemplate = await characterTemplatesService.getById(newParticipant.character_template_id);
//     if (characterTemplate.character_type === CharacterType.COMMON)
//       newParticipant.participant_name += ` [${characterTemplate.character_name}]`;
//     const participants = await participantsRepo.getByFightId(newParticipant.fightId);
//     const usedNames = participants.map((participant) => participant.participant_name);
//     if (usedNames.includes(newParticipant.participant_name))
//       throw new Error(`Participant with name ${newParticipant.participant_name} already used.`);
//     const participant = await participantsRepo.create(newParticipant, characterTemplate);
//     return participant;
//   } catch (error) {
//     const errorMessage = `Error in create at participants service: ${error}`;
//     console.error(errorMessage);
//     throw new Error(errorMessage);
//   }
// };

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

const rollInitiative = (participant: IParticipantRow): number => {
  return participant.speed + rollsService.rollDices(Dice._1D6);
};

const service = {
  // create,
  getAll,
  getByFightId,
  rollInitiative,
};

export default service;
