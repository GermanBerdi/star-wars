import { FightStatus } from "./fights-enums";

export interface IFightRow {
  id: number;
  fight_name: string;
  available_teams: number[];
  turn: number;
  pending_participants: number[] | null;
  fight_status: FightStatus;
  winner_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface INewFightReq {
  fight_name: string;
  available_teams: number[];
}

export interface IUpdateFightReq {
  id: number;
  fight_name?: string;
  available_teams?: number[];
  turn?: number;
  pending_participants?: number[] | null;
  fight_status?: FightStatus;
  winner_id?: number;
}
