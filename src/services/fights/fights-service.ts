import { getCharacterById } from "../../db/characters/characters-repo";
import { INewFight, IFightRow } from "../../db/fights/fights-interfaces";
import { createFight, getAllFights } from "../../db/fights/fights-repo";

const create = async (id1: number, id2: number): Promise<IFightRow> => {
  try {
    const character1 = await getCharacterById(id1);
    if (!character1) throw new Error(`Character with id ${id1} not found.`);
    const character2 = await getCharacterById(id2);
    if (!character2) throw new Error(`Character with id ${id2} not found.`);
    const newFight: INewFight = {
      character1_id: character1.id,
      character2_id: character2.id,
      character1_current_hp: character1.hp,
      character2_current_hp: character2.hp,
    };
    const fight = await createFight(newFight);
    return fight;
  } catch (error) {
    const errorMessage = `Error in create fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const listAll = async () => {
  try {
    const fights = await getAllFights();
    return fights;
  } catch (error) {
    const errorMessage = `Error in listAll fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  create,
  listAll,
};

export default service;
