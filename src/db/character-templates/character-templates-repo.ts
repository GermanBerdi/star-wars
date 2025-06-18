import pool from "../connection";
import { ResultSetHeader } from "mysql2";
import { INewCharacterTemplateReq, ICharacterTemplateRow, IUpdateCharacterTemplateReq } from "../../services/character-templates/character-templates-interfaces";
import { ICharacterTemplateRowDataPacket } from "./character-templates-repo-interfaces";

const create = async (newCharacterTemplate: INewCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  const { character_name, hp, strength, defense, speed } = newCharacterTemplate;
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO character_templates (character_name, hp, strength, defense, speed) VALUES (?, ?, ?, ?, ?);`,
    [character_name, hp, strength, defense, speed],
  );
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<ICharacterTemplateRowDataPacket[]>(`SELECT * FROM character_templates WHERE id = ?`, [
    result.insertId,
  ]);
  return row[0];
};

const update = async (characterTemplateToUpdate: IUpdateCharacterTemplateReq): Promise<ICharacterTemplateRow> => {
  const { id, ...fields } = characterTemplateToUpdate;
  const keys = Object.keys(fields).filter((key) => fields[key as keyof typeof fields] !== undefined);
  if (keys.length === 0) throw new Error("No fields to update");
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => fields[key as keyof typeof fields]);
  values.push(id);
  const [result] = await pool.execute<ResultSetHeader>(`UPDATE character_templates SET ${setClause} WHERE id = ?;`, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<ICharacterTemplateRowDataPacket[]>(`SELECT * FROM character_templates WHERE id = ?;`, [id]);
  return row[0];
};

const getAll = async (): Promise<ICharacterTemplateRow[]> => {
  const [rows] = await pool.query<ICharacterTemplateRowDataPacket[]>("SELECT * FROM character_templates;");
  return rows;
};

const getById = async (id: number): Promise<ICharacterTemplateRow | null> => {
  const [rows] = await pool.query<ICharacterTemplateRowDataPacket[]>(`SELECT * FROM character_templates WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  create,
  update,
  getAll,
  getById,
};
export default repo;
