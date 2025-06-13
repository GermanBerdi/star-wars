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

export interface INewCharacter {
  name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
}
