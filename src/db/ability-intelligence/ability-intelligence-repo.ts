import pool from "../connection";

import type { IAbilityIntelligenceRow } from "../../services/abilities/abilities-service-interfaces";
import type { IAbilityIntelligenceRowDataPacket } from "./ability-intelligence-repo-interfaces";

const getAll = async (): Promise<IAbilityIntelligenceRow[]> => {
  const [rows] = await pool.execute<IAbilityIntelligenceRowDataPacket[]>("SELECT * FROM ability_4_intelligence;");
  return rows;
};

const getById = async (id: number): Promise<IAbilityIntelligenceRow | null> => {
  const [rows] = await pool.execute<IAbilityIntelligenceRowDataPacket[]>(
    `SELECT * FROM ability_4_intelligence WHERE id = ?;`,
    [id],
  );
  return rows.length > 0 ? rows[0] : null;
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityIntelligenceRow | null> => {
  const query = `
    SELECT
      *
    FROM ability_4_intelligence
    WHERE
      ability_score = ?;
  `;
  const values = [abilityScore];
  const [rows] = await pool.execute<IAbilityIntelligenceRowDataPacket[]>(query, values);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  getAll,
  getById,
  getByAbilityScore,
};

export default repo;
