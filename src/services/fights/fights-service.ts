import fightRepo from "../../db/fights/fights-repo";

import participantsOrder from "./fights-participants-order";

import { FightStatus } from "./fights-enums";

import type { INewFightReq, IUpdateFightReq, IFightRow } from "./fights-interfaces";

const create = async (newFightreq: INewFightReq): Promise<IFightRow> => {
  try {
    if (!newFightreq.available_teams) newFightreq.available_teams = [];
    const fight = await fightRepo.create(newFightreq);
    return fight;
  } catch (error) {
    const errorMessage = `Error in create at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const nextTurn = async (id: number): Promise<IFightRow> => {
  try {
    const fight = await getById(id);
    if (fight.fight_status !== FightStatus.IN_PROGRESS) throw new Error(`Fight ${fight.id} isn´t in progress`);
    if (fight.pending_participants === null)
      throw new Error(`Pending participants has not been set in fight ${fight.id}`);
    if (fight.pending_participants.length !== 0)
      throw new Error(`There are 1 or more participants with pending actions in fight ${fight.id}`);
    const fightNextTurn = { ...fight };
    fightNextTurn.turn++;
    fightNextTurn.pending_participants = await participantsOrder.calculateParticipantsOrder(fight.id);
    const updateFightReq: IUpdateFightReq = {
      id: fightNextTurn.id,
      turn: fightNextTurn.turn,
      pending_participants: fightNextTurn.pending_participants,
    };
    const fightUpdated = await update(updateFightReq);
    return fightUpdated;
  } catch (error) {
    const errorMessage = `Error in nextTurn at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (updateFightReq: IUpdateFightReq): Promise<IFightRow> => {
  try {
    const fight = await fightRepo.update(updateFightReq);
    return fight;
  } catch (error) {
    const errorMessage = `Error in update at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getAll = async (): Promise<IFightRow[]> => {
  try {
    const fights = await fightRepo.getAll();
    return fights;
  } catch (error) {
    const errorMessage = `Error in getAll at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<IFightRow> => {
  try {
    const fight = await fightRepo.getById(id);
    if (!fight) throw new Error(`Fight with id ${id} not found.`);
    return fight;
  } catch (error) {
    const errorMessage = `Error in getById at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    await fightRepo.remove(id);
  } catch (error) {
    const errorMessage = `Error in remove at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  create,
  setParticipantsOrder: participantsOrder.setParticipantsOrder,
  shiftParticipant: participantsOrder.shiftParticipant,
  nextTurn,
  update,
  getAll,
  getById,
  isParticipantTurn: participantsOrder.isParticipantTurn,
  remove,
  calculateParticipantsOrder: participantsOrder.calculateParticipantsOrder,
};

export { update };
export default service;
