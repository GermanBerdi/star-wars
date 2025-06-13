import { ResultSetHeader } from "mysql2";
import pool from "../connection";
import { INewCharacter, ICharacterRow } from "./characters-interfaces";


export const createCharacter = async (character: INewCharacter) => {
  const { name, hp, strength, defense, speed } = character;

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO characters (name, hp, strength, defense, speed) VALUES (?, ?, ?, ?, ?)`,
    [name, hp, strength, defense, speed]
  );

  return result;
};

export const getAllCharacters = async (): Promise<ICharacterRow[]> => {
  const [rows] = await pool.query<ICharacterRow[]>("SELECT * FROM characters");
  return rows;
}
