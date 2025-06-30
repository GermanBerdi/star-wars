export interface IParticipantRow {
  id: number;
  fight_id: number;
  character_template_id: number;
  participant_name: string;
  strength: number;
  defense: number;
  speed: number;
  base_hp: number;
  hp: number;
  is_alive: boolean;
  team_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface INewParticipantReq {
  fightId: number;
  character_template_id: number;
  participant_name: string;
  is_alive: boolean;
  team_id: number | null;
}
