import armorTypesRepo from "../../db/armor-types/armor-types-repo";

import { IArmorTypeRow } from "./armor-types-interfaces";

const getAll = async (): Promise<IArmorTypeRow[]> => {
  try {
    const characterTemplates = await armorTypesRepo.getAll();
    return characterTemplates;
  } catch (error) {
    const errorMessage = `Error in getAll at armor types service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  getAll,
};

export default service;
