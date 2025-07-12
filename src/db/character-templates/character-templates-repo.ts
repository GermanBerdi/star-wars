import pool from "../connection";
import type { ResultSetHeader } from "mysql2";

import type {
  INewCharacterTemplateCalculatedReq,
  ICharacterTemplateRow,
  IUpdateCharacterTemplateCalculatedReq,
} from "../../services/character-templates/character-templates-interfaces";
import type { ICharacterTemplateRowDataPacket } from "./character-templates-repo-interfaces";

const create = async (
  newCharacterTemplateCalculated: INewCharacterTemplateCalculatedReq,
): Promise<ICharacterTemplateRow> => {
  const keys = Object.keys(newCharacterTemplateCalculated);
  const columns = keys.join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  const query = `
    INSERT INTO character_templates (${columns}) 
    VALUES (${placeholders});
  `;
  const values = keys.map((key) => newCharacterTemplateCalculated[key as keyof typeof newCharacterTemplateCalculated]);
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<ICharacterTemplateRowDataPacket[]>(
    `SELECT * FROM character_templates WHERE id = ?`,
    [result.insertId],
  );
  return row[0];
};

const update = async (
  updateCharacterTemplateCalculated: IUpdateCharacterTemplateCalculatedReq,
): Promise<ICharacterTemplateRow> => {
  const { id, ...fields } = updateCharacterTemplateCalculated;
  const keys = Object.keys(fields).filter((key) => fields[key as keyof typeof fields] !== undefined);
  if (keys.length === 0) throw new Error("No fields to update");
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const query = `
    UPDATE character_templates SET ${setClause}
    WHERE id = ?;
  `;
  const values = keys.map((key) => fields[key as keyof typeof fields]);
  values.push(id);
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<ICharacterTemplateRowDataPacket[]>(
    `SELECT * FROM character_templates WHERE id = ?;`,
    [id],
  );
  return row[0];
};

const getAll = async (): Promise<ICharacterTemplateRow[]> => {
  const [rows] = await pool.execute<ICharacterTemplateRowDataPacket[]>("SELECT * FROM character_templates;");
  return rows;
};

const getById = async (id: number): Promise<ICharacterTemplateRow | null> => {
  const [rows] = await pool.execute<ICharacterTemplateRowDataPacket[]>(
    `SELECT * FROM character_templates WHERE id = ?;`,
    [id],
  );
  return rows.length > 0 ? rows[0] : null;
};

const remove = async (id: number): Promise<void> => {
  const [result] = await pool.execute<ResultSetHeader>(`DELETE FROM character_templates WHERE id = ?;`, [id]);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
};

const repo = {
  create,
  update,
  getAll,
  getById,
  remove,
};

export default repo;
