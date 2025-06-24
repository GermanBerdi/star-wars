import pool from "../connection";

import { IArmorTypeRow } from "../../services/armor-types/armor-types-interfaces";
import { IArmorTypeRowDataPacket } from "./armor-types-repo-interfaces";

const getAll = async (): Promise<IArmorTypeRow[]> => {
  const [rows] = await pool.query<IArmorTypeRowDataPacket[]>("SELECT * FROM armor_types;");
  return rows;
};

const repo = {
  getAll,
};
export default repo;
