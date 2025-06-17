import { WinnerId } from "./fights-enums";
import { ICharacterRow } from "../characters/characters-interfaces";

export interface IFightRow {
  id: number;
  combatant1_id: number;
  combatant2_id: number;
  combatant1_hp: number;
  combatant2_hp: number;
  turn: number;
  winner_id: WinnerId;
  updated_at: Date;
  created_at: Date;
}

export interface IFightPopulatedRow {
  fight: IFightRow;
  character1: ICharacterRow;
  character2: ICharacterRow;
}

export interface INewFightReq {
  combatant1: {
    id: number;
    hp: number;
  };
  combatant2: {
    id: number;
    hp: number;
  };
}

export interface IUpdateFightReq {
  id: number;
  combatant1_id?: number;
  combatant2_id?: number;
  combatant1_hp?: number;
  combatant2_hp?: number;
  turn?: number;
  winner_id?: WinnerId;
}
