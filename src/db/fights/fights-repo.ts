import pool from "../connection";
import { ResultSetHeader } from "mysql2";

import { INewFightReq, IFightRow, IUpdateFightReq, IFightPopulatedRow } from "../../services/fights/fights-interfaces";
import { Turn } from "../../services/fights/fights-enums";
import { IFightRowDataPacket, IFightPopulatedRowDataPacket } from "./fights-repo-interfaces";

const create = async (newFight: INewFightReq): Promise<IFightRow> => {
  const { combatant1, combatant2 } = newFight;
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO fights (combatant1_id, combatant2_id, combatant1_hp, combatant2_hp, turn) VALUES (?, ?, ?, ?, ?);`,
    [combatant1.id, combatant2.id, combatant1.hp, combatant2.hp, Turn.Combatant1],
  );
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IFightRowDataPacket[]>(`SELECT * FROM fights WHERE id = ?`, [result.insertId]);
  return row[0];
};

const update = async (fightToUpdate: IUpdateFightReq): Promise<IFightRow> => {
  const { id, ...fields } = fightToUpdate;
  const keys = Object.keys(fields).filter((key) => fields[key as keyof typeof fields] !== undefined);
  if (keys.length === 0) throw new Error("No fields to update");
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => fields[key as keyof typeof fields]);
  values.push(id);
  const [result] = await pool.execute<ResultSetHeader>(`UPDATE fights SET ${setClause} WHERE id = ?;`, values);
  if (result.affectedRows !== 1) throw new Error(JSON.stringify(result));
  const [row] = await pool.execute<IFightRowDataPacket[]>(`SELECT * FROM fights WHERE id = ?;`, [id]);
  return row[0];
};

const getAll = async (): Promise<IFightRow[]> => {
  const [rows] = await pool.query<IFightRowDataPacket[]>("SELECT * FROM fights;");
  return rows;
};

export const getById = async (id: number): Promise<IFightRow | null> => {
  const [rows] = await pool.query<IFightRowDataPacket[]>(`SELECT * FROM fights WHERE id = ?;`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const getByIdPopulated = async (id: number): Promise<IFightPopulatedRow | null> => {
  const query = `
    SELECT 
      f.id AS fight_id,
      f.combatant1_id AS fight_combatant1_id,
      f.combatant2_id AS fight_combatant2_id,
      f.combatant1_hp AS fight_combatant1_hp,
      f.combatant2_hp AS fight_combatant2_hp,
      f.turn AS fight_turn,
      f.winner_id AS fight_winner_id,
      f.updated_at AS fight_updated_at,
      f.created_at AS fight_created_at,
      c1.id AS c1_id,
      c1.character_name AS c1_character_name,
      c1.hp AS c1_hp,
      c1.strength AS c1_strength,
      c1.defense AS c1_defense,
      c1.speed AS c1_speed,
      c1.updated_at AS c1_updated_at,
      c1.created_at AS c1_created_at,
      c2.id AS c2_id,
      c2.character_name AS c2_character_name,
      c2.hp AS c2_hp,
      c2.strength AS c2_strength,
      c2.defense AS c2_defense,
      c2.speed AS c2_speed,
      c2.updated_at AS c2_updated_at,
      c2.created_at AS c2_created_at
    FROM fights f
    JOIN characters c1 ON f.combatant1_id = c1.id
    JOIN characters c2 ON f.combatant2_id = c2.id
    WHERE f.id = ?;
    `;
  const [rows] = await pool.query<IFightPopulatedRowDataPacket[]>(query, [id]);
  if (rows.length === 0) return null;
  const fightPopulatedRow: IFightPopulatedRow = {
    fight: {
      id: rows[0].fight_id,
      combatant1_id: rows[0].fight_combatant1_id,
      combatant2_id: rows[0].fight_combatant2_id,
      combatant1_hp: rows[0].fight_combatant1_hp,
      combatant2_hp: rows[0].fight_combatant2_hp,
      turn: rows[0].fight_turn,
      winner_id: rows[0].fight_winner_id,
      updated_at: rows[0].fight_updated_at,
      created_at: rows[0].fight_created_at,
    },
    character1: {
      id: rows[0].c1_id,
      name: rows[0].c1_character_name,
      hp: rows[0].c1_hp,
      strength: rows[0].c1_strength,
      defense: rows[0].c1_defense,
      speed: rows[0].c1_speed,
      updated_at: rows[0].c1_updated_at,
      created_at: rows[0].c1_created_at,
    },
    character2: {
      id: rows[0].c2_id,
      name: rows[0].c2_character_name,
      hp: rows[0].c2_hp,
      strength: rows[0].c2_strength,
      defense: rows[0].c2_defense,
      speed: rows[0].c2_speed,
      updated_at: rows[0].c2_updated_at,
      created_at: rows[0].c2_created_at,
    },
  };
  return fightPopulatedRow;
};

const repo = {
  create,
  update,
  getAll,
  getById,
  getByIdPopulated,
};
export default repo;
