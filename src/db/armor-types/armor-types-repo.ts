import pool from "../connection";

import { IArmorTypeRow } from "../../services/armor-types/armor-types-interfaces";
import { IArmorTypeRowDataPacket } from "./armor-types-repo-interfaces";

const getAll = async (): Promise<IArmorTypeRow[]> => {
  const [rows] = await pool.query<IArmorTypeRowDataPacket[]>("SELECT * FROM armor_types;");
  return rows;
};

const getById = async (id: number): Promise<IArmorTypeRow | null> => {
  const [rows] = await pool.query<IArmorTypeRowDataPacket[]>(`SELECT * FROM armor_types WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  getAll,
  getById,
};
export default repo;
