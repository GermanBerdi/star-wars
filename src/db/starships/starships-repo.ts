import pool from "../connection";
import { IStarshipRow } from "./starships-interfaces";

export const getAllStarships = async (): Promise<IStarshipRow[]> => {
  const [rows] = await pool.query<IStarshipRow[]>("SELECT * FROM starships");
  return rows;
}
