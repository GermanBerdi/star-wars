import { CharacterType } from "./character-templates-enums";

export interface IThac0Modifiers {
  base: number;
  strength_hit_probability: number;
}

export interface ICharacterTemplateRow {
  id: number;
  character_name: string;
  class_id: number;
  character_level: number;
  strength_id: string;
  dexterity_id: number;
  constitution_id: number;
  intelligence_id: number;
  wisdom_id: number;
  charisma_id: number;
  armor_type_id: number;
  armor_class: number;
  hit_dices: number[];
  hp: number;
  thac0_modifiers: IThac0Modifiers;
  thac0: number;
  character_type: CharacterType;
  character_description: string | null;
  last_exceptional_strength_id: string | null;
  updated_at: Date;
  created_at: Date;
}

export interface INewCharacterTemplateReq {
  character_name: string;
  class_id: number;
  character_level: number;
  strength_id?: string;
  dexterity_id?: number;
  constitution_id?: number;
  intelligence_id?: number;
  wisdom_id?: number;
  charisma_id?: number;
  armor_type_id: number;
  character_type?: CharacterType;
  character_description?: string;
}

export interface INewCharacterTemplateCalculatedReq {
  character_name: string;
  class_id: number;
  character_level: number;
  strength_id: string;
  dexterity_id: number;
  constitution_id: number;
  intelligence_id: number;
  wisdom_id: number;
  charisma_id: number;
  armor_type_id: number;
  armor_class: number;
  hit_dices: number[];
  hit_dices_modified: number[];
  hp: number;
  thac0_modifiers: IThac0Modifiers;
  thac0: number;
  character_type: CharacterType;
  character_description: string | null;
  last_exceptional_strength_id: string | null;
}

export interface IRerollAbilitiesReq {
  id: number;
  strength?: boolean;
  dexterity?: boolean;
  constitution?: boolean;
  intelligence?: boolean;
  wisdom?: boolean;
  charisma?: boolean;
}

export interface IUpdateCharacterTemplateReq {
  id: number;
  character_name?: string;
  class_id?: number;
  character_level?: number;
  strength_id?: string;
  dexterity_id?: number;
  constitution_id?: number;
  intelligence_id?: number;
  wisdom_id?: number;
  charisma_id?: number;
  armor_type_id?: number;
  hit_dices?: number[];
  character_type?: CharacterType;
  character_description?: string;
}

export interface IUpdateCharacterTemplateCalculatedReq {
  id: number;
  character_name?: string;
  class_id?: number;
  character_level?: number;
  strength_id?: string;
  dexterity_id?: number;
  constitution_id?: number;
  intelligence_id?: number;
  wisdom_id?: number;
  charisma_id?: number;
  armor_type_id?: number;
  armor_class?: number;
  hit_dices?: number[];
  hit_dices_modified?: number[];
  hp?: number;
  thac0_modifiers?: IThac0Modifiers;
  thac0?: number;
  character_type?: CharacterType;
  character_description?: string | null;
  last_exceptional_strength_id?: string | null;
}
