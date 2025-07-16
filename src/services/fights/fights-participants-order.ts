import { update } from "./fights-service";
import participantsService from "../participants/participants-service";

import type { IUpdateFightReq, IFightRow } from "./fights-interfaces";

const isParticipantTurn = (participantId: number, pendingParticipants: number[] | null): boolean =>
  pendingParticipants !== null && pendingParticipants.length > 0 && pendingParticipants[0] === participantId;

const reviewPendingParticipants = async (fight: IFightRow, participantsToRemove: number[] ): Promise<IFightRow> => {
  try {
    if (fight.pending_participants === null)
      throw new Error(`Pending participants has not been set in fight ${fight.id}`);
    if (fight.pending_participants.length === 0)
      throw new Error(`No pending participants to review in fight ${fight.id}`);
    const participantsToRemoveSet = new Set(participantsToRemove);
    const newPendingParticipants = fight.pending_participants.filter((participantId)=>!participantsToRemoveSet.has(participantId));
    const updateFightReq: IUpdateFightReq = {
      id: fight.id,
      pending_participants: newPendingParticipants,
    };
    const fightUpdated = await update(updateFightReq);
    return fightUpdated;
  } catch (error) {
    const errorMessage = `Error in reviewPendingParticipants at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const calculateParticipantsOrder = async (id: number): Promise<number[]> => {
  try {
    const participants = await participantsService.getByFightId(id);
    const aliveParticipants = participants.filter((participant) => participantsService.isAlive(participant));
    if (aliveParticipants.length === 0) throw new Error(`No alive participants found for fight ${id}`);
    const participantsWithInitiative = aliveParticipants.map((participant) => {
      const initiative = participantsService.rollInitiative(participant);
      return {
        id: participant.id,
        initiative,
      };
    });
    const pendingParticipants = participantsWithInitiative.sort((a, b) => a.initiative - b.initiative).map((p) => p.id);
    return pendingParticipants;
  } catch (error) {
    const errorMessage = `Error in calculateParticipantsOrder at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const setParticipantsOrder = async (id: number): Promise<IFightRow> => {
  try {
    const pending_participants = await calculateParticipantsOrder(id);
    const updateFightReq: IUpdateFightReq = {
      id,
      pending_participants,
    };
    const fight = await update(updateFightReq);
    return fight;
  } catch (error) {
    const errorMessage = `Error in setParticipantsOrder at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const participantOrder = {
  isParticipantTurn,
  reviewPendingParticipants,
  calculateParticipantsOrder,
  setParticipantsOrder,
};

export default participantOrder;
