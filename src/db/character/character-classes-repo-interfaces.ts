import { RowDataPacket } from "mysql2";

import { ICharacterClassRow } from "../../services/character/character-classes-interfaces";

export interface ICharacterClassRowDataPacket extends ICharacterClassRow, RowDataPacket {}
