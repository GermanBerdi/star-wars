import { RowDataPacket } from "mysql2";

import { IParticipantRow } from "../../services/participants/participants-interfaces";

export interface IParticipantRowDataPacket extends IParticipantRow, RowDataPacket {}
