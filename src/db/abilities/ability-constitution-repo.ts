import pool from "../connection";

import { IAbilityConstitutionRow } from "../../services/abilities/ability-constitution-service-interfaces";
import { IAbilityConstitutionRowDataPacket } from "./ability-constitution-repo-interfaces";

const getAll = async (): Promise<IAbilityConstitutionRow[]> => {
  const [rows] = await pool.query<IAbilityConstitutionRowDataPacket[]>("SELECT * FROM ability_3_constitution;");
  return rows;
};

const repo = {
  getAll,
};
export default repo;
