import { RowDataPacket } from "mysql2";

import { ICharacterTemplateRow } from "../../services/character/character-templates-interfaces";

export interface ICharacterTemplateRowDataPacket extends ICharacterTemplateRow, RowDataPacket {}
