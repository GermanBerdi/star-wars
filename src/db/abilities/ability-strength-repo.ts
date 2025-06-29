import pool from "../connection";

import { IAbilityStrengthRow } from "../../services/abilities/ability-strength-service-interfaces";
import { IAbilityStrengthRowDataPacket } from "./ability-strength-repo-interfaces";

const getAll = async (): Promise<IAbilityStrengthRow[]> => {
  const [rows] = await pool.query<IAbilityStrengthRowDataPacket[]>(
    "SELECT * FROM ability_1_strength ORDER BY ability_score, exceptional_strength_min;",
  );
  return rows;
};

const getById = async (id: string): Promise<IAbilityStrengthRow | null> => {
  const [rows] = await pool.query<IAbilityStrengthRowDataPacket[]>(`SELECT * FROM ability_1_strength WHERE id = ?;`, [
    id,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

const getByAbilityScore = async (
  abilityScore: number,
  exceptionalStrength: number | null,
): Promise<IAbilityStrengthRow | null> => {
  if (exceptionalStrength === null) {
    const query = `
      SELECT *
      FROM ability_1_strength
      WHERE ability_score = ? 
        AND exceptional_strength_min IS NULL 
        AND exceptional_strength_max IS NULL;
    `;
    const values = [abilityScore];
    const [rows] = await pool.query<IAbilityStrengthRowDataPacket[]>(query, values);
    return rows.length > 0 ? rows[0] : null;
  }
  const query = `
    SELECT *
    FROM ability_1_strength
    WHERE ability_score = ? 
      AND exceptional_strength_min <= ? 
      AND exceptional_strength_max >= ?;
  `;
  const values = [abilityScore, exceptionalStrength, exceptionalStrength];
  const [rows] = await pool.query<IAbilityStrengthRowDataPacket[]>(query, values);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  getAll,
  getById,
  getByAbilityScore,
};
export default repo;
