import thac0sRepo from "../../db/thac0s/thac0s-repo";

import type { IThac0sRow } from "./thac0s-interfaces";

const getAll = async (): Promise<IThac0sRow[]> => {
  try {
    const thac0s = await thac0sRepo.getAll();
    return thac0s;
  } catch (error) {
    const errorMessage = `Error in getAll at thac0s service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getById = async (id: number): Promise<IThac0sRow> => {
  try {
    const thac0 = await thac0sRepo.getById(id);
    if (!thac0) throw new Error(`Thac0 with id ${id} not found.`);
    return thac0;
  } catch (error) {
    const errorMessage = `Error in getById at thac0s service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const getByCharacterLevel = async (level: number): Promise<IThac0sRow> => {
  try {
    const thac0 = await thac0sRepo.getByCharacterLevel(level);
    if (!thac0) throw new Error(`Thac0 with character_level ${level} not found.`);
    return thac0;
  } catch (error) {
    const errorMessage = `Error in getByCharacterLevel at thac0s service: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const service = {
  getAll,
  getById,
  getByCharacterLevel,
};

export default service;
