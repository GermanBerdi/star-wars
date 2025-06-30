import type { RowDataPacket } from "mysql2";

import type { IParticipantRow } from "../../services/character-participants/character-participants-interfaces";

export interface IParticipantRowDataPacket extends IParticipantRow, RowDataPacket {}
