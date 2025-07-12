import pool from "../connection";
import type { ResultSetHeader } from "mysql2";

import type { INewFightReq, IFightRow, IUpdateFightReq } from "../../services/fights/fights-interfaces";
import type { IFightRowDataPacket } from "./fights-repo-interfaces";

const create = async (newFight: INewFightReq): Promise<IFightRow> => {
  const keys = Object.keys(newFight);
  const columns = keys.join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  const query = `
    INSERT INTO fights (${columns}) 
    VALUES (${placeholders});
  `;
  const values = keys.map((key) => newFight[key as keyof typeof newFight]);
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IFightRowDataPacket[]>(`SELECT * FROM fights WHERE id = ?`, [result.insertId]);
  return row[0];
};

const update = async (updateFightReq: IUpdateFightReq): Promise<IFightRow> => {
  const { id, ...fields } = updateFightReq;
  const keys = Object.keys(fields).filter((key) => fields[key as keyof typeof fields] !== undefined);
  if (keys.length === 0) throw new Error("No fields to update");
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const query = `
    UPDATE fights SET ${setClause}
    WHERE id = ?;
  `;
  const values = keys.map((key) => fields[key as keyof typeof fields]);
  values.push(id);
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IFightRowDataPacket[]>(`SELECT * FROM fights WHERE id = ?;`, [id]);
  return row[0];
};

const getAll = async (): Promise<IFightRow[]> => {
  const [rows] = await pool.execute<IFightRowDataPacket[]>("SELECT * FROM fights;");
  return rows;
};

const getById = async (id: number): Promise<IFightRow | null> => {
  const [rows] = await pool.execute<IFightRowDataPacket[]>(`SELECT * FROM fights WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const remove = async (id: number): Promise<void> => {
  const [result] = await pool.execute<ResultSetHeader>(`DELETE FROM fights WHERE id = ?;`, [id]);
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
