import fightRepo from "../../db/fights/fights-repo";

import { INewFightReq, IUpdateFightReq, IFightRow } from "./fights-interfaces";

const create = async (newFight: INewFightReq): Promise<IFightRow> => {
  try {
    if (!newFight.fight_name || newFight.fight_name.trim().length === 0) {
      throw new Error(`fight_name cannot be empty`);
    }
    if (
      newFight.available_teams !== null &&
      (!Array.isArray(newFight.available_teams) ||
        !newFight.available_teams.every((team) => typeof team === "number" && team > 0))
    ) {
      throw new Error(`available_teams must be null (for free-for-all) or an array of positive numbers`);
    }
    const fight = await fightRepo.create(newFight);
    return fight;
  } catch (error) {
    const errorMessage = `Error in create at fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (updateFightReq: IUpdateFightReq): Promise<IFightRow> => {
  try {
    const fight = await fightRepo.update(updateFightReq);
    return fight;
  } catch (error) {
    const errorMessage = `Error in update at fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getAll = async (): Promise<IFightRow[]> => {
  try {
    const fights = await fightRepo.getAll();
    return fights;
  } catch (error) {
    const errorMessage = `Error in getAll at fight service: ${error}`;
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
    const errorMessage = `Error in getById at fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    await fightRepo.remove(id);
  } catch (error) {
    const errorMessage = `Error in remove at fight service: ${error}`;
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
};

export default service;
