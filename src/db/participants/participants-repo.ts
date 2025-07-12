import pool from "../connection";
import type { ResultSetHeader } from "mysql2";

import type {
  INewParticipantCalculatedReq,
  IParticipantRow,
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

const repo = {
  create,
  getAll,
  getById,
  getByFightId,
};

export default repo;
