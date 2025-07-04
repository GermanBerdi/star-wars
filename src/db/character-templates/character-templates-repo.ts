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
  const query = `
    INSERT INTO character_templates (
      character_name,
      class_id,
      character_level,
      strength_id,
      dexterity_id,
      constitution_id,
      intelligence_id,
      wisdom_id,
      charisma_id,
      armor_type_id,
      armor_class,
      hit_dices,
      hit_dices_modified,
      hp,
      thac0_modifiers,
      thac0,
      character_type,
      character_description,
      last_exceptional_strength_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [
    newCharacterTemplateCalculated.character_name,
    newCharacterTemplateCalculated.class_id,
    newCharacterTemplateCalculated.character_level,
    newCharacterTemplateCalculated.strength_id,
    newCharacterTemplateCalculated.dexterity_id,
    newCharacterTemplateCalculated.constitution_id,
    newCharacterTemplateCalculated.intelligence_id,
    newCharacterTemplateCalculated.wisdom_id,
    newCharacterTemplateCalculated.charisma_id,
    newCharacterTemplateCalculated.armor_type_id,
    newCharacterTemplateCalculated.armor_class,
    newCharacterTemplateCalculated.hit_dices,
    newCharacterTemplateCalculated.hit_dices_modified,
    newCharacterTemplateCalculated.hp,
    newCharacterTemplateCalculated.thac0_modifiers,
    newCharacterTemplateCalculated.thac0,
    newCharacterTemplateCalculated.character_type,
    newCharacterTemplateCalculated.character_description,
    newCharacterTemplateCalculated.last_exceptional_strength_id,
  ];
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
  const values = keys.map((key) => fields[key as keyof typeof fields]);
  values.push(id);
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE character_templates SET ${setClause} WHERE id = ?;`,
    values,
  );
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<ICharacterTemplateRowDataPacket[]>(
    `SELECT * FROM character_templates WHERE id = ?;`,
    [id],
  );
  return row[0];
};

const getAll = async (): Promise<ICharacterTemplateRow[]> => {
  const [rows] = await pool.query<ICharacterTemplateRowDataPacket[]>("SELECT * FROM character_templates;");
  return rows;
};

const getById = async (id: number): Promise<ICharacterTemplateRow | null> => {
  const [rows] = await pool.query<ICharacterTemplateRowDataPacket[]>(
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
