import type { RowDataPacket } from "mysql2";

import type { IFightRow } from "../../services/fights/fights-interfaces";

export interface IFightRowDataPacket extends IFightRow, RowDataPacket {}
