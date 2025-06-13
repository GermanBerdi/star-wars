import { RowDataPacket } from "mysql2";

export interface IFightRow extends RowDataPacket {
  character1_id: number;
  character2_id: number;
  character1_hp: number;
  character2_hp: number;
  turn: number;
  winner_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface INewFight {
  character1_id: number;
  character2_id: number;
  character1_current_hp: number;
  character2_current_hp: number;
}

/*
export interface IUpdateCharacter {
  id: number;
  name?: string;
  hp?: number;
  strength?: number;
  defense?: number;
  speed?: number;
}
*/