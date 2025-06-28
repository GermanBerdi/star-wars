import { RowDataPacket } from "mysql2";

import { IAbilityConstitutionRow } from "../../services/abilities/ability-constitution-service-interfaces";

export interface IAbilityConstitutionRowDataPacket extends IAbilityConstitutionRow, RowDataPacket {}
