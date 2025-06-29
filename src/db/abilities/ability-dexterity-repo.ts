import pool from "../connection";

import { IAbilityDexterityRow } from "../../services/abilities/ability-dexterity-service-interfaces";
import { IAbilityDexterityRowDataPacket } from "./ability-dexterity-repo-interfaces";

const getAll = async (): Promise<IAbilityDexterityRow[]> => {
  const [rows] = await pool.query<IAbilityDexterityRowDataPacket[]>("SELECT * FROM ability_2_dexterity;");
  return rows;
};

const getById = async (id: number): Promise<IAbilityDexterityRow | null> => {
  const [rows] = await pool.query<IAbilityDexterityRowDataPacket[]>(`SELECT * FROM ability_2_dexterity WHERE id = ?;`, [
    id,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityDexterityRow | null> => {
  const query = `
    SELECT
      *
    FROM ability_2_dexterity
    WHERE
      ability_score = ?;
  `;
  const values = [abilityScore];
  const [rows] = await pool.query<IAbilityDexterityRowDataPacket[]>(query, values);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  getAll,
  getById,
  getByAbilityScore,
};
export default repo;
