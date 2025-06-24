import { RowDataPacket } from "mysql2";

import { IArmorTypeRow } from "../../services/armor-types/armor-types-interfaces";

export interface IArmorTypeRowDataPacket extends IArmorTypeRow, RowDataPacket {}
