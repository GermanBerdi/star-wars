import pool from "../connection";

import { IAbilityConstitutionRow } from "../../services/abilities/ability-constitution-service-interfaces";
import { IAbilityConstitutionRowDataPacket } from "./ability-constitution-repo-interfaces";

const getAll = async (): Promise<IAbilityConstitutionRow[]> => {
  const [rows] = await pool.query<IAbilityConstitutionRowDataPacket[]>("SELECT * FROM ability_3_constitution;");
  return rows;
};

const getById = async (id: number): Promise<IAbilityConstitutionRow | null> => {
  const [rows] = await pool.query<IAbilityConstitutionRowDataPacket[]>(
    `SELECT * FROM ability_3_constitution WHERE id = ?;`,
    [id],
  );
  return rows.length > 0 ? rows[0] : null;
};

const getByAbilityScore = async (abilityScore: number): Promise<IAbilityConstitutionRow | null> => {
  const query = `
    SELECT
      *
    FROM ability_3_constitution
    WHERE
      ability_score = ?;
  `;
  const values = [abilityScore];
  const [rows] = await pool.query<IAbilityConstitutionRowDataPacket[]>(query, values);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  getAll,
  getById,
  getByAbilityScore,
};
export default repo;
