import pool from "../connection";
import { ResultSetHeader } from "mysql2";

import {
  INewFightReq,
  IFightRow /*, IUpdateFightReq, */,
} from "../../services/fights/fights-interfaces";
import { IFightRowDataPacket } from "./fights-repo-interfaces";

const create = async (newFight: INewFightReq): Promise<IFightRow> => {
  const { fight_name } = newFight;
  const [result] = await pool.execute<ResultSetHeader>(`INSERT INTO fights (fight_name) VALUES (?);`, [fight_name]);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IFightRowDataPacket[]>(`SELECT * FROM fights WHERE id = ?`, [result.insertId]);
  return row[0];
};

// const update = async (fightToUpdate: IUpdateFightReq): Promise<IFightRow> => {
//   const { id, ...fields } = fightToUpdate;
//   const keys = Object.keys(fields).filter((key) => fields[key as keyof typeof fields] !== undefined);
//   if (keys.length === 0) throw new Error("No fields to update");
//   const setClause = keys.map((key) => `${key} = ?`).join(", ");
//   const values = keys.map((key) => fields[key as keyof typeof fields]);
//   values.push(id);
//   const [result] = await pool.execute<ResultSetHeader>(`UPDATE fights SET ${setClause} WHERE id = ?;`, values);
//   if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
//   const [row] = await pool.execute<IFightRowDataPacket[]>(`SELECT * FROM fights WHERE id = ?;`, [id]);
//   return row[0];
// };

const getAll = async (): Promise<IFightRow[]> => {
  const [rows] = await pool.query<IFightRowDataPacket[]>("SELECT * FROM fights;");
  return rows;
};

export const getById = async (id: number): Promise<IFightRow | null> => {
  const [rows] = await pool.query<IFightRowDataPacket[]>(`SELECT * FROM fights WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  create,
  // update,
  getAll,
  getById,
};
export default repo;
