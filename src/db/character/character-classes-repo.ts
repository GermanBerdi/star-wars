import pool from "../connection";

import { ICharacterClassRow } from "../../services/character/character-classes-interfaces";
import { ICharacterClassRowDataPacket } from "./character-classes-repo-interfaces";

const getAll = async (): Promise<ICharacterClassRow[]> => {
  const [rows] = await pool.query<ICharacterClassRowDataPacket[]>("SELECT * FROM character_classes;");
  return rows;
};

const repo = {
  getAll,
};
export default repo;
