import { RowDataPacket } from "mysql2";

import { ICharacterRow } from "../../services/characters/characters-interfaces";

export interface ICharacterRowDataPacket extends ICharacterRow, RowDataPacket {}
