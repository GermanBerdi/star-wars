import pool from "../connection";

import type { ICharacterClassRow } from "../../services/character-classes/character-classes-interfaces";
import type { ICharacterClassRowDataPacket } from "./character-classes-repo-interfaces";

const getAll = async (): Promise<ICharacterClassRow[]> => {
  const [rows] = await pool.query<ICharacterClassRowDataPacket[]>("SELECT * FROM character_classes;");
  return rows;
};

const getById = async (id: number): Promise<ICharacterClassRow | null> => {
  const [rows] = await pool.query<ICharacterClassRowDataPacket[]>(`SELECT * FROM character_classes WHERE id = ?;`, [
    id,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  getAll,
  getById,
};

export default repo;
