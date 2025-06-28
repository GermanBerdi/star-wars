import { RowDataPacket } from "mysql2";

import { IAbilityStrengthRow } from "../../services/abilities/ability-strength-service-interfaces";

export interface IAbilityStrengthRowDataPacket extends IAbilityStrengthRow, RowDataPacket {}
