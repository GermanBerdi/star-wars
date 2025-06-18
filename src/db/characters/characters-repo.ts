import pool from "../connection";
import { ResultSetHeader } from "mysql2";

import { INewCharacterReq, ICharacterRow, IUpdateCharacterReq } from "../../services/characters/characters-interfaces";
import { ICharacterRowDataPacket } from "./characters-repo-interfaces";

const create = async (newCharacter: INewCharacterReq): Promise<ICharacterRow> => {
  const { character_name, hp, strength, defense, speed } = newCharacter;
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO characters (character_name, hp, strength, defense, speed) VALUES (?, ?, ?, ?, ?);`,
    [character_name, hp, strength, defense, speed],
  );
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<ICharacterRowDataPacket[]>(`SELECT * FROM characters WHERE id = ?`, [
    result.insertId,
  ]);
  return row[0];
};

const update = async (characterToUpdate: IUpdateCharacterReq): Promise<ICharacterRow> => {
  const { id, ...fields } = characterToUpdate;
  const keys = Object.keys(fields).filter((key) => fields[key as keyof typeof fields] !== undefined);
  if (keys.length === 0) throw new Error("No fields to update");
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => fields[key as keyof typeof fields]);
  values.push(id);
  const [result] = await pool.execute<ResultSetHeader>(`UPDATE characters SET ${setClause} WHERE id = ?;`, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<ICharacterRowDataPacket[]>(`SELECT * FROM characters WHERE id = ?;`, [id]);
  return row[0];
};

const getAll = async (): Promise<ICharacterRow[]> => {
  const [rows] = await pool.query<ICharacterRowDataPacket[]>("SELECT * FROM characters;");
  return rows;
};

const getById = async (id: number): Promise<ICharacterRow | null> => {
  const [rows] = await pool.query<ICharacterRowDataPacket[]>(`SELECT * FROM characters WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  create,
  update,
  getAll,
  getById,
};
export default repo;
