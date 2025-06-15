import characterRepo from "../../db/characters/characters-repo";
import { INewFightReq, IFightRow } from "./fights-interfaces";
import fightRepo from "../../db/fights/fights-repo";

const create = async (id1: number, id2: number): Promise<IFightRow> => {
  try {
    const character1 = await characterRepo.getById(id1);
    if (!character1) throw new Error(`Character with id ${id1} not found.`);
    const character2 = await characterRepo.getById(id2);
    if (!character2) throw new Error(`Character with id ${id2} not found.`);
    const newFight: INewFightReq = {
      character1_id: character1.id,
      character2_id: character2.id,
      character1_current_hp: character1.hp,
      character2_current_hp: character2.hp,
    };
    const fight = await fightRepo.create(newFight);
    return fight;
  } catch (error) {
    const errorMessage = `Error in create fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getAll = async () => {
  try {
    const fights = await fightRepo.getAll();
    return fights;
  } catch (error) {
    const errorMessage = `Error in getAll fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  create,
  getAll,
};

export default service;
