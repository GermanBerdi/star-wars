import pool from "../connection";

import { IAbilityDexterityRow } from "../../services/abilities/ability-dexterity-service-interfaces";
import { IAbilityDexterityRowDataPacket } from "./ability-dexterity-repo-interfaces";

const getAll = async (): Promise<IAbilityDexterityRow[]> => {
  const [rows] = await pool.query<IAbilityDexterityRowDataPacket[]>("SELECT * FROM ability_2_dexterity;");
  return rows;
};

const repo = {
  getAll,
};
export default repo;
