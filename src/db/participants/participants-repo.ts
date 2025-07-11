import pool from "../connection";
import type { ResultSetHeader } from "mysql2";

import type { INewParticipantReq, IParticipantRow } from "../../services/participants/participants-interfaces";
import type { ICharacterTemplateRow } from "../../services/character-templates/character-templates-interfaces";
import type { IParticipantRowDataPacket } from "./participants-repo-interfaces";

const create = async (
  newParticipant: INewParticipantReq,
  characterTemplate: ICharacterTemplateRow,
): Promise<IParticipantRow> => {
  const query = `
    INSERT INTO participants (
      fight_id,
      character_template_id,
      participant_name,
      class_id,
      strength_id,
      dexterity_id,
      constitution_id,
      intelligence_id,
      wisdom_id,
      charisma_id,
      armor_type_id,
      armor_class,
      base_hp,
      hp,
      thac0,
      is_alive,
      team_id)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
  `;
  const values = [
    newParticipant.fightId,
    newParticipant.character_template_id,
    newParticipant.participant_name,
    characterTemplate.class_id,
    characterTemplate.strength_id,
    characterTemplate.dexterity_id,
    characterTemplate.constitution_id,
    characterTemplate.intelligence_id,
    characterTemplate.wisdom_id,
    characterTemplate.charisma_id,
    characterTemplate.armor_type_id,
    characterTemplate.armor_class,
    characterTemplate.hp,
    characterTemplate.hp,
    characterTemplate.thac0,
    newParticipant.is_alive,
    newParticipant.team_id,
  ];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE id = ?`, [
    result.insertId,
  ]);
  return row[0];
};

const getAll = async (): Promise<IParticipantRow[]> => {
  const [rows] = await pool.query<IParticipantRowDataPacket[]>("SELECT * FROM participants;");
  return rows;
};

const getById = async (id: number): Promise<IParticipantRow | null> => {
  const [rows] = await pool.query<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const getByFightId = async (fightId: number): Promise<IParticipantRow[]> => {
  const [rows] = await pool.query<IParticipantRowDataPacket[]>(`SELECT * FROM participants WHERE fight_id = ?;`, [
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
