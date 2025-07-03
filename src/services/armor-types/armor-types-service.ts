import armorTypesRepo from "../../db/armor-types/armor-types-repo";

import type { IArmorTypeRow } from "./armor-types-interfaces";

const getAll = async (): Promise<IArmorTypeRow[]> => {
  try {
    const armorTypes = await armorTypesRepo.getAll();
    return armorTypes;
  } catch (error) {
    const errorMessage = `Error in getAll at armor types service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<IArmorTypeRow> => {
  try {
    const armorType = await armorTypesRepo.getById(id);
    if (!armorType) throw new Error(`Armor type with id ${id} not found.`);
    return armorType;
  } catch (error) {
    const errorMessage = `Error in getById at armor types service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  getAll,
  getById,
};

export default service;
