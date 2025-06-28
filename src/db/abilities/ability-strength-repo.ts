import pool from "../connection";

import { IAbilityStrengthRow } from "../../services/abilities/ability-strength-service-interfaces";
import { IAbilityStrengthRowDataPacket } from "./ability-strength-repo-interfaces";

const getAll = async (): Promise<IAbilityStrengthRow[]> => {
  const [rows] = await pool.query<IAbilityStrengthRowDataPacket[]>(
    "SELECT * FROM ability_1_strength ORDER BY ability_score, exceptional_strength_min;",
  );
  return rows;
};

const repo = {
  getAll,
};
export default repo;
