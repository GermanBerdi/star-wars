import type { RowDataPacket } from "mysql2";

import type { IAbilityCharismaRow } from "../../services/abilities/abilities-service-interfaces";

export interface IAbilityCharismaRowDataPacket extends IAbilityCharismaRow, RowDataPacket {}
