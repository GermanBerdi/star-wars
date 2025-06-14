import { RowDataPacket } from "mysql2";

export interface ICharacterRow extends RowDataPacket {
  id: number;
  name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
  updated_at: Date;
  created_at: Date;
}

export interface INewCharacterReq {
  name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
}

export interface IUpdateCharacterReq {
  id: number;
  name?: string;
  hp?: number;
  strength?: number;
  defense?: number;
  speed?: number;
}
