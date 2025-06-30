import type { RowDataPacket } from "mysql2";

import type { ICharacterClassRow } from "../../services/character-classes/character-classes-interfaces";

export interface ICharacterClassRowDataPacket extends ICharacterClassRow, RowDataPacket {}
