import type { RowDataPacket } from "mysql2";

import type { IParticipantRow } from "../../services/participants/participants-interfaces";

export interface IParticipantRowDataPacket extends IParticipantRow, RowDataPacket {}
