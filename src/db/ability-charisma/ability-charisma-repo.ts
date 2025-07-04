import pool from "../connection";

import type { IAbilityCharismaRow } from "../../services/abilities/abilities-service-interfaces";
import type { IAbilityCharismaRowDataPacket } from "./ability-charisma-repo-interfaces";

const getAll = async (): Promise<IAbilityCharismaRow[]> => {
  const [rows] = await pool.query<IAbilityCharismaRowDataPacket[]>("SELECT * FROM ability_6_charisma;");
  return rows;
};

const getById = async (id: number): Promise<IAbilityCharismaRow | null> => {
  const [rows] = await pool.query<IAbilityCharismaRowDataPacket[]>(`SELECT * FROM ability_6_charisma WHERE id = ?;`, [
    id,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityCharismaRow | null> => {
  const query = `
    SELECT
      *
    FROM ability_6_charisma
    WHERE
      ability_score = ?;
  `;
  const values = [abilityScore];
  const [rows] = await pool.query<IAbilityCharismaRowDataPacket[]>(query, values);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  getAll,
  getById,
  getByAbilityScore,
};

export default repo;
