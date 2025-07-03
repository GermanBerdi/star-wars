import type { RowDataPacket } from "mysql2";

import type { IAbilityConstitutionRow } from "../../services/abilities/abilities-service-interfaces";

export interface IAbilityConstitutionRowDataPacket extends IAbilityConstitutionRow, RowDataPacket {}
