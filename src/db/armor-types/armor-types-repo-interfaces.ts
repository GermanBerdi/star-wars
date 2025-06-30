import type { RowDataPacket } from "mysql2";

import type { IArmorTypeRow } from "../../services/armor-types/armor-types-interfaces";

export interface IArmorTypeRowDataPacket extends IArmorTypeRow, RowDataPacket {}
