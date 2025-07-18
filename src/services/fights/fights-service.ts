import fightRepo from "../../db/fights/fights-repo";

import pendingParticipants from "./fights-pending-participants";

import participantsService from "../participants/participants-service";

import { FightStatus, WinnerId } from "./fights-enums";

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

const initializeFight = async (id: number): Promise<IFightRow> => {
  try {
    const fight = await getById(id);
    if (fight.fight_status !== FightStatus.NOT_STARTED)
      throw new Error(`Fight ${fight.id} cannot be started - current status: ${fight.fight_status}`);
    if (fight.pending_participants !== null)
      throw new Error(
        `Pending participants cannot be initialized - current pending participants: ${fight.pending_participants}`,
      );
    if (fight.turn !== 0) throw new Error(`Fight ${fight.id} cannot be started - current turn: ${fight.turn}`);
    const participants = await participantsService.getByFightId(fight.id);
    if (participants.length === 0) throw new Error(`Fight ${fight.id} cannot be started - fight has no participants`);
    const fightInitialized = { ...fight };
    fightInitialized.fight_status = FightStatus.IN_PROGRESS;
    fightInitialized.turn = 1;
    fightInitialized.pending_participants = await pendingParticipants.rollInitiatives(fight.id);
    const updateFightReq: IUpdateFightReq = {
      id: fightInitialized.id,
      fight_status: fightInitialized.fight_status,
      turn: fightInitialized.turn,
      pending_participants: fightInitialized.pending_participants,
    };
    const fightUpdated = await update(updateFightReq);
    return fightUpdated;
  } catch (error) {
    const errorMessage = `Error in initializeFight at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const nextTurn = async (id: number): Promise<IFightRow> => {
  try {
    const fight = await getById(id);
    if (fight.fight_status !== FightStatus.IN_PROGRESS)
      throw new Error(`Fight ${fight.id} is not in progress - current status: ${fight.fight_status}`);
    if (fight.pending_participants === null) throw new Error(`Fight ${fight.id} has no pending participants set`);
    if (fight.pending_participants.length !== 0)
      throw new Error(`Fight ${fight.id} has ${fight.pending_participants.length} participants with pending actions`);
    const fightNextTurn = { ...fight };
    fightNextTurn.turn++;
    fightNextTurn.pending_participants = await pendingParticipants.rollInitiatives(fight.id);
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

const checkFightWinner = async (id: number, fightStatus: FightStatus): Promise<number | null> => {
  try {
    if (fightStatus !== FightStatus.IN_PROGRESS)
      throw new Error(`Fight ${id} is not in progress - current status: ${fightStatus}`);
    const participants = await participantsService.getByFightId(id);
    const aliveParticipants = participants.filter((participant) => participantsService.isAlive(participant));
    if (aliveParticipants.length === 0) return WinnerId.NO_SURVIVORS;
    if (aliveParticipants.length === 1) return aliveParticipants[0].team_id ?? aliveParticipants[0].id;
    if (new Set(aliveParticipants.map((p) => p.team_id)).size === 1) return aliveParticipants[0].team_id;
    return null;
  } catch (error) {
    const errorMessage = `Error in checkFightWinner at fights service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  create,
  initializeFight,
  nextTurn,
  update,
  getAll,
  getById,
  remove,
  isParticipantTurn: pendingParticipants.isParticipantTurn,
  reviewPendingParticipants: pendingParticipants.reviewPendingParticipants,
  checkFightWinner,
};

export default service;
