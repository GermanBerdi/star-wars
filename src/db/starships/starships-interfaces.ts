import { RowDataPacket } from "mysql2";

export interface IStarshipRow extends RowDataPacket {
  id: number;
  name: string;
  model: string;
  manufacturer: string | null;
  crew: number | null;
  passengers: number | null;
  max_speed: number | null;
  created_at: Date;
}