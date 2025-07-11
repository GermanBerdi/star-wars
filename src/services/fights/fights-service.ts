import fightRepo from "../../db/fights/fights-repo";

import participantsService from "../participants/participants-service";

import type { INewFightReq, IUpdateFightReq, IFightRow } from "./fights-interfaces";

const create = async (newFight: INewFightReq): Promise<IFightRow> => {
  try {
    const fight = await fightRepo.create(newFight);
    return fight;
  } catch (error) {
    const errorMessage = `Error in create at fights service: ${error}`;
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

const setParticipantsOrder = async (id: number): Promise<IFightRow> => {
  try {
    const participants = await participantsService.getByFightId(id);
    const participantsWithInitiative = participants.map((participant) => {
      const initiative = participantsService.rollInitiative(participant);
      return {
        id: participant.id,
        initiative,
      };
    });
    const pending_participants = participantsWithInitiative
      .sort((a, b) => b.initiative - a.initiative)
      .map((p) => p.id);
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

const service = {
  create,
  update,
  getAll,
  getById,
  remove,
  setParticipantsOrder,
};

export default service;
