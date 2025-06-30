import type { RowDataPacket } from "mysql2";

import type { IThac0sRow } from "../../services/thac0s/thac0s-interfaces";

export interface IThac0sRowDataPacket extends IThac0sRow, RowDataPacket {}
