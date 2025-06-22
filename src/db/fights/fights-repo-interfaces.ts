import { RowDataPacket } from "mysql2";

import { IFightRow } from "../../services/fights/fights-interfaces";

export interface IFightRowDataPacket extends IFightRow, RowDataPacket {}
