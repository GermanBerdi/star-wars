export interface ICharacterTemplateRow {
  id: number;
  character_name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
  updated_at: Date;
  created_at: Date;
}

export interface INewCharacterTemplateReq {
  character_name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
}

export interface IUpdateCharacterTemplateReq {
  id: number;
  character_name?: string;
  hp?: number;
  strength?: number;
  defense?: number;
  speed?: number;
}
