import type { RowDataPacket } from "mysql2";

import type { IAbilityWisdomRow } from "../../services/abilities/abilities-service-interfaces";

export interface IAbilityWisdomRowDataPacket extends IAbilityWisdomRow, RowDataPacket {}
