import pool from "../connection";

import type { IAbilityWisdomRow } from "../../services/abilities/abilities-service-interfaces";
import type { IAbilityWisdomRowDataPacket } from "./ability-wisdom-repo-interfaces";

const getAll = async (): Promise<IAbilityWisdomRow[]> => {
  const [rows] = await pool.query<IAbilityWisdomRowDataPacket[]>("SELECT * FROM ability_5_wisdom;");
  return rows;
};

const getById = async (id: number): Promise<IAbilityWisdomRow | null> => {
  const [rows] = await pool.query<IAbilityWisdomRowDataPacket[]>(`SELECT * FROM ability_5_wisdom WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityWisdomRow | null> => {
  const query = `
    SELECT
      *
    FROM ability_5_wisdom
    WHERE
      ability_score = ?;
  `;
  const values = [abilityScore];
  const [rows] = await pool.query<IAbilityWisdomRowDataPacket[]>(query, values);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  getAll,
  getById,
  getByAbilityScore,
};

export default repo;
