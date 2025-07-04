import type { RowDataPacket } from "mysql2";

import type { IAbilityIntelligenceRow } from "../../services/abilities/abilities-service-interfaces";

export interface IAbilityIntelligenceRowDataPacket extends IAbilityIntelligenceRow, RowDataPacket {}
