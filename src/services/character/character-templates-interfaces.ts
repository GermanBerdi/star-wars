import { CharacterType } from "./character-templates-enums";

export interface ICharacterTemplateRow {
  id: number;
  character_name: string;
  strength: number;
  defense: number;
  speed: number;
  hp: number;
  character_type: CharacterType;
  character_description: string;
  updated_at: Date;
  created_at: Date;
}

export interface INewCharacterTemplateReq {
  character_name: string;
  strength: number;
  defense: number;
  speed: number;
  hp: number;
  character_type: CharacterType;
  character_description: string | null;
}

export interface IUpdateCharacterTemplateReq {
  id: number;
  character_name?: string;
  strength?: number;
  defense?: number;
  speed?: number;
  hp?: number;
  character_type?: CharacterType;
  character_description?: string;
}
