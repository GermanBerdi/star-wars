import type { RowDataPacket } from "mysql2";

import type { IAbilityStrengthRow } from "../../services/abilities/abilities-service-interfaces";

export interface IAbilityStrengthRowDataPacket extends IAbilityStrengthRow, RowDataPacket {}
