import type { RowDataPacket } from "mysql2";

import type { IAbilityDexterityRow } from "../../services/abilities/abilities-service-interfaces";

export interface IAbilityDexterityRowDataPacket extends IAbilityDexterityRow, RowDataPacket {}
