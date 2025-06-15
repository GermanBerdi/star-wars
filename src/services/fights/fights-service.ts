import characterService from "../characters/characters-service";
import { IFightRow, INewFightReq, IGetByIddPopulatedRes, IUpdateFightReq } from "./fights-interfaces";
import fightRepo from "../../db/fights/fights-repo";
import { WinnerId } from "./fights-enum";

const create = async (id1: number, id2: number): Promise<IFightRow> => {
  try {
    const combatant1 = await characterService.getById(id1);
    if (!combatant1) throw new Error(`Character with id ${id1} not found.`);
    const combatant2 = await characterService.getById(id2);
    if (!combatant2) throw new Error(`Character with id ${id2} not found.`);
    const newFight: INewFightReq = {
      combatant1Id: combatant1.id,
      combatant2Id: combatant2.id,
      combatant1Hp: combatant1.hp,
      combatant2Hp: combatant2.hp,
    };
    const fight = await fightRepo.create(newFight);
    return fight;
  } catch (error) {
    const errorMessage = `Error in create at fight service: ${error}`;
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

const getById = async (id: number): Promise<IFightRow | null> => {
  try {
    const fight = await fightRepo.getById(id);
    return fight;
  } catch (error) {
    const errorMessage = `Error in getById at fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByIdPopulated = async (id: number): Promise<IGetByIddPopulatedRes> => {
  try {
    const fight = await getById(id);
    if (!fight) {
      const errorMessage = `Error in getByIdPopulated at fight service: Fight not found`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const character1 = await characterService.getById(fight.combatant1_id);
    if (!character1) {
      const errorMessage = `Error in getByIdPopulated at fight service: Not character was found with character id ${fight.combatant1_id} at fight ${id}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const character2 = await characterService.getById(fight.combatant2_id);
    if (!character2) {
      const errorMessage = `Error in getByIdPopulated at fight service: Not character was found with character id ${fight.combatant2_id} at fight ${id}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const fightPopulated: IGetByIddPopulatedRes = {
      id: fight.id,
      combatant1: {
        id: 1,
        characterId: character1.id,
        name: character1.name,
        hp: fight.combatant1_hp,
        maxHp: character1.hp,
        strength: character1.strength,
        defense: character1.defense,
        speed: character1.speed,
      },
      combatant2: {
        id: 2,
        characterId: character2.id,
        name: character2.name,
        hp: fight.combatant2_hp,
        maxHp: character2.hp,
        strength: character2.strength,
        defense: character2.defense,
        speed: character2.speed,
      },
      turn: 0,
      winner_id: 0,
      updated_at: fight.updated_at,
      created_at: fight.created_at,
    };
    return fightPopulated;
  } catch (error) {
    const errorMessage = `Error in getByIdPopulated at fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const setCombatantHp = (fight: IUpdateFightReq, targetCombatant: number, hp: number): IUpdateFightReq => {
  const newFightData = fight;
  if (targetCombatant === 1) newFightData.combatant1_hp = hp;
  else newFightData.combatant2_hp = hp;
  return newFightData;
};

const updateCombatantHp = async (fightId: number, targetCombatant: number, updatedHp: number): Promise<IFightRow> => {
  try {
    const fight: IUpdateFightReq = {
      id: fightId,
    };
    const fightToUpdate = setCombatantHp(fight, targetCombatant, updatedHp);
    const fightUpdated = await fightRepo.update(fightToUpdate);
    return fightUpdated;
  } catch (error) {
    const errorMessage = `Error in updateCombatantHp at fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const calculateWinnerId = (fight: IFightRow): WinnerId => {
  if (fight.combatant1_hp > 0 && fight.combatant2_hp <= 0) return WinnerId.Combatant1;
  if (fight.combatant2_hp > 0 && fight.combatant1_hp <= 0) return WinnerId.Combatant2;
  if (fight.combatant1_hp <= 0 && fight.combatant1_hp <= 0) return WinnerId.Draw;
  return WinnerId.Unknown;
}

const ifFinished = (fight: IFightRow): boolean => {
  return fight.winner_id !== WinnerId.Unknown;
}

const updateIfFinished = async (fight: IFightRow): Promise<IFightRow> => {
  try {
    const newWinnerId = calculateWinnerId(fight);
    if (fight.winner_id !== newWinnerId) {
      const fightToUpdate:IUpdateFightReq = {
        id: fight.id,
        winner_id: newWinnerId,
      }
      const fightUpdated = await fightRepo.update(fightToUpdate);
      return fightUpdated;
    }
    return fight;
  } catch (error) {
    const errorMessage = `Error in updateIfFinished at fight service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

const service = {
  create,
  getAll,
  getById,
  getByIdPopulated,
  updateCombatantHp,
  ifFinished,
  updateIfFinished,
};

export default service;
