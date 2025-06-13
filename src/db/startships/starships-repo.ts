import pool from "../connection";
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

export const getAllStarships = async (): Promise<IStarshipRow[]> => {
  const [rows] = await pool.query<IStarshipRow[]>("SELECT * FROM starships");
  return rows;
}
