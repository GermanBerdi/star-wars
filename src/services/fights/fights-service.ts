import fightRepo from "../../db/fights/fights-repo";

// import characterTemplatesService from "../character-templates/character-templates-service";
import { INewFightReq, IFightRow /*IFightPopulatedRow, IUpdateFightReq*/ } from "./fights-interfaces";
// import { WinnerId, Turn } from "./fights-enums";

const create = async (newFight: INewFightReq): Promise<IFightRow> => {
  try {
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

// const getByIdPopulated = async (id: number): Promise<IFightPopulatedRow> => {
//   try {
//     const fightPopulated = await fightRepo.getByIdPopulated(id);
//     if (!fightPopulated) throw new Error(`Fight with id ${id} not found.`);
//     return fightPopulated;
//   } catch (error) {
//     const errorMessage = `Error in getByIdPopulated at fight service: ${error}`;
//     console.error(errorMessage);
//     throw new Error(errorMessage);
//   }
// };

// const isFinished = (winnerId: WinnerId): boolean => {
//   return winnerId !== WinnerId.NoWinner;
// };

// const calculateWinnerId = (fight: IFightRow): WinnerId => {
//   if (fight.combatant1_hp > 0 && fight.combatant2_hp <= 0) return WinnerId.Combatant1;
//   if (fight.combatant2_hp > 0 && fight.combatant1_hp <= 0) return WinnerId.Combatant2;
//   if (fight.combatant1_hp <= 0 && fight.combatant1_hp <= 0) return WinnerId.Draw;
//   return WinnerId.NoWinner;
// };

// const rotateTurn = (currentTurn: number): Turn => {
//   switch (currentTurn) {
//     case Turn.Combatant1:
//       return Turn.Combatant2;
//     case Turn.Combatant2:
//     default:
//       return Turn.Combatant1;
//   }
// };

// const applyActionEffects = async (
//   fight: IFightRow,
//   targetCombatantId: number,
//   targetUpdatedHp: number,
// ): Promise<IFightRow> => {
//   try {
//     const newFightState = { ...fight };
//     const fightToUpdate: IUpdateFightReq = {
//       id: fight.id,
//     };
//     if (targetCombatantId === 1) {
//       newFightState.combatant1_hp = targetUpdatedHp;
//       fightToUpdate.combatant1_hp = targetUpdatedHp;
//     } else {
//       newFightState.combatant2_hp = targetUpdatedHp;
//       fightToUpdate.combatant2_hp = targetUpdatedHp;
//     }
//     const newWinnerId = calculateWinnerId(newFightState);
//     if (newFightState.winner_id !== newWinnerId) fightToUpdate.winner_id = newWinnerId;
//     fightToUpdate.turn = rotateTurn(fight.turn);
//     const fightUpdated = await fightRepo.update(fightToUpdate);
//     return fightUpdated;
//   } catch (error) {
//     const errorMessage = `Error in applyActionEffects at fight service: ${error}`;
//     console.error(errorMessage);
//     throw new Error(errorMessage);
//   }
// };

const service = {
  create,
  getAll,
  getById,
  // getByIdPopulated,
  // isFinished,
  // applyActionEffects,
};

export default service;
