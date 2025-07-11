import pool from "../connection";

import type { IThac0sRow } from "../../services/thac0s/thac0s-interfaces";
import type { IThac0sRowDataPacket } from "./thac0s-repo-interfaces";

const getAll = async (): Promise<IThac0sRow[]> => {
  const [rows] = await pool.query<IThac0sRowDataPacket[]>("SELECT * FROM thac0s;");
  return rows;
};

const getById = async (id: number): Promise<IThac0sRow | null> => {
  const [rows] = await pool.query<IThac0sRowDataPacket[]>(`SELECT * FROM thac0s WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const getByCharacterLevel = async (characterLevel: number): Promise<IThac0sRow | null> => {
  const [rows] = await pool.query<IThac0sRowDataPacket[]>(`SELECT * FROM thac0s WHERE character_level = ?;`, [characterLevel]);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  getAll,
  getById,
  getByCharacterLevel,
};

export default repo;
