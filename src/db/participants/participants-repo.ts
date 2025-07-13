import pool from "../connection";
import type { ResultSetHeader } from "mysql2";

import type {
  INewParticipantCalculatedReq,
  IParticipantRow,
  IUpdateParticipantReq,
} from "../../services/participants/participants-interfaces";
import type { IParticipantRowDataPacket } from "./participants-repo-interfaces";

const create = async (newParticipantCalculatedReq: INewParticipantCalculatedReq): Promise<IParticipantRow> => {
  const keys = Object.keys(newParticipantCalculatedReq);
  const columns = keys.join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  const query = `
    INSERT INTO participants (${columns}) 
    VALUES (${placeholders});
  `;
  const values = keys.map((key) => newParticipantCalculatedReq[key as keyof typeof newParticipantCalculatedReq]);
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE id = ?`, [
    result.insertId,
  ]);
  return row[0];
};

const update = async (updateParticipantReq: IUpdateParticipantReq): Promise<IParticipantRow> => {
  const { id, ...fields } = updateParticipantReq;
  const keys = Object.keys(fields).filter((key) => fields[key as keyof typeof fields] !== undefined);
  if (keys.length === 0) throw new Error("No fields to update");
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const query = `
    UPDATE participants SET ${setClause}
    WHERE id = ?;
  `;
  const values = keys.map((key) => fields[key as keyof typeof fields]);
  values.push(id);
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE id = ?;`, [id]);
  return row[0];
};

const getAll = async (): Promise<IParticipantRow[]> => {
  const [rows] = await pool.execute<IParticipantRowDataPacket[]>("SELECT * FROM participants;");
  return rows;
};

const getById = async (id: number): Promise<IParticipantRow | null> => {
  const [rows] = await pool.execute<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const getByFightId = async (fightId: number): Promise<IParticipantRow[]> => {
  const [rows] = await pool.execute<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE fight_id = ?;`, [
    fightId,
  ]);
  return rows;
};

const getByIdAndFightId = async (id: number, fightId: number): Promise<IParticipantRow | null> => {
  const [rows] = await pool.execute<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE id = ? AND fight_id = ?;`, [
    id,fightId,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

const repo = {
  create,
  update,
  getAll,
  getById,
  getByFightId,
  getByIdAndFightId,
};

export default repo;
