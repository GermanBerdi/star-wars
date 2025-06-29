import pool from "../connection";

import { ICharacterClassRow } from "../../services/character/character-classes-interfaces";
import { ICharacterClassRowDataPacket } from "./character-classes-repo-interfaces";

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
