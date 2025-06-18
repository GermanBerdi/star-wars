export interface ICharacterRow {
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
  character_name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
}

export interface IUpdateCharacterReq {
  id: number;
  character_name?: string;
  hp?: number;
  strength?: number;
  defense?: number;
  speed?: number;
}
