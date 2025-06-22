import pool from "../connection";
import { ResultSetHeader } from "mysql2";

import { INewParticipantReq, IParticipantRow } from "../../services/participants/participants-interfaces";
import { ICharacterTemplateRow } from "../../services/character-templates/character-templates-interfaces"
import { IParticipantRowDataPacket } from "./participants-repo-interfaces";

const create = async (newParticipant: INewParticipantReq, characterTemplate:ICharacterTemplateRow): Promise<IParticipantRow> => {
  const { fightId, character_template_id, participant_name, is_alive, team_id } = newParticipant;
  const { strength, defense, speed, hp } = characterTemplate;
  const query = `
    INSERT INTO participants (
      fight_id,
      character_template_id,
      participant_name,
      strength,
      defense,
      speed,
      base_hp,
      hp,
      is_alive,
      team_id)
    VALUES (?,?,?,?,?,?,?,?,?,?);
  `;
  const values = [fightId, character_template_id, participant_name, strength, defense, speed, hp, hp, is_alive, team_id];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE id = ?`, [result.insertId]);
  return row[0];
};

const getAll = async (): Promise<IParticipantRow[]> => {
  const [rows] = await pool.query<IParticipantRowDataPacket[]>("SELECT * FROM participants;");
  return rows;
};

export const getByFightId = async (fightId: number): Promise<IParticipantRow[]> => {
  const [rows] = await pool.query<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE fight_id = ?;`, [
    fightId,
  ]);
  return rows;
};

const repo = {
  create,
  getAll,
  getByFightId,
};
export default repo;
