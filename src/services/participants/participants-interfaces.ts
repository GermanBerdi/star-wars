export interface IParticipantRow {
  id: number;
  fight_id: number;
  character_template_id: number;
  participant_name: string;
  class_id: number;
  strength_id: string;
  dexterity_id: number;
  constitution_id: number;
  intelligence_id: number;
  wisdom_id: number;
  charisma_id: number;
  armor_type_id: number;
  armor_class: number;
  base_hp: number;
  hp: number;
  thac0: number;
  initiative: number;
  is_alive: boolean;
  team_id: number | null;
  updated_at: Date;
  created_at: Date;
}

export interface INewParticipantReq {
  fightId: number;
  character_template_id: number;
  participant_name: string;
  is_alive?: boolean;
  team_id?: number;
}

export interface INewParticipantCalculatedReq {
  fight_id: number;
  character_template_id: number;
  participant_name: string;
  class_id: number;
  strength_id: string;
  dexterity_id: number;
  constitution_id: number;
  intelligence_id: number;
  wisdom_id: number;
  charisma_id: number;
  armor_type_id: number;
  armor_class: number;
  base_hp: number;
  hp: number;
  thac0: number;
  initiative: number;
  is_alive: boolean;
  team_id: number | null;
}
