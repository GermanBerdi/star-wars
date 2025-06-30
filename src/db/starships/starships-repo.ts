import pool from "../connection";
import type { IStarshipRow } from "./starships-interfaces";

export const getAllStarships = async (): Promise<IStarshipRow[]> => {
  const [rows] = await pool.query<IStarshipRow[]>("SELECT * FROM starships");
  return rows;
};
