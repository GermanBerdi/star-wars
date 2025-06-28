import { RowDataPacket } from "mysql2";

import { IAbilityDexterityRow } from "../../services/abilities/ability-dexterity-service-interfaces";

export interface IAbilityDexterityRowDataPacket extends IAbilityDexterityRow, RowDataPacket {}
