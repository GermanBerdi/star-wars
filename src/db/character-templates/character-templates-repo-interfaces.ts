import type { RowDataPacket } from "mysql2";

import type { ICharacterTemplateRow } from "../../services/character-templates/character-templates-interfaces";

export interface ICharacterTemplateRowDataPacket extends ICharacterTemplateRow, RowDataPacket {}
