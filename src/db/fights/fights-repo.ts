import { ResultSetHeader } from "mysql2";
import pool from "../connection";
import { INewFight, /* IUpdateCharacter,*/ IFightRow } from "./fights-interfaces";

export const createFight = async (fight: INewFight) => {
  const { character1_id, character2_id, character1_current_hp, character2_current_hp } = fight;
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO fights (character1_id, character2_id, character1_current_hp, character2_current_hp, turn) VALUES (?, ?, ?, ?, ?)`,
    [character1_id, character2_id, character1_current_hp, character2_current_hp, 0],
  );
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IFightRow[]>(`SELECT * FROM fights WHERE id = ?`, [result.insertId]);
  return row[0];
};

export const getAllFights = async (): Promise<IFightRow[]> => {
  const [rows] = await pool.query<IFightRow[]>("SELECT * FROM fights");
  return rows;
};

export const getFightById = async (id: number): Promise<IFightRow | null> => {
  const [rows] = await pool.query<IFightRow[]>(`SELECT * FROM fights WHERE id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};