import { RowDataPacket } from "mysql2";

import { IFightRow } from "../../services/fights/fights-interfaces";
import { WinnerId } from "../../services/fights/fights-enums";

export interface IFightRowDataPacket extends IFightRow, RowDataPacket {}

export interface IFightPopulatedRowDataPacket extends RowDataPacket {
  fight_id: number;
  fight_combatant1_id: number;
  fight_combatant2_id: number;
  fight_combatant1_hp: number;
  fight_combatant2_hp: number;
  fight_turn: number;
  fight_winner_id: WinnerId;
  fight_updated_at: Date;
  fight_created_at: Date;
  c1_id: number;
  c1_character_name: string;
  c1_hp: number;
  c1_strength: number;
  c1_defense: number;
  c1_speed: number;
  c1_updated_at: Date;
  c1_created_at: Date;
  c2_id: number;
  c2_character_name: string;
  c2_hp: number;
  c2_strength: number;
  c2_defense: number;
  c2_speed: number;
  c2_updated_at: Date;
  c2_created_at: Date;
}
