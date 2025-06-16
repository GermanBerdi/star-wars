import { RowDataPacket } from "mysql2";
import { WinnerId } from "./fights-enums";

export interface IFightRow extends RowDataPacket {
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

export interface INewFightReq {
  combatant1Id: number;
  combatant2Id: number;
  combatant1Hp: number;
  combatant2Hp: number;
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

export interface ICombatant {
  id: number;
  characterId: number;
  name: string;
  hp: number;
  maxHp: number;
  strength: number;
  defense: number;
  speed: number;
}

export interface IGetByIddPopulatedRes {
  id: number;
  combatant1: ICombatant;
  combatant2: ICombatant;
  turn: number;
  winner_id: WinnerId;
  updated_at: Date;
  created_at: Date;
}
