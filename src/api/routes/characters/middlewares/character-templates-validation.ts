import type { Request, Response, NextFunction } from "express";

export const validateCreateCharacterTemplate = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body.character_name) {
    res.status(400).json({ message: "character_name is required." });
    return;
  }
  if (!req.body.class_id) {
    res.status(400).json({ message: "class_id is required." });
    return;
  }
  if (!req.body.character_level) {
    res.status(400).json({ message: "character_level is required." });
    return;
  }
  if (!req.body.armor_type_id) {
    res.status(400).json({ message: "armor_type_id is required." });
    return;
  }
  next();
};
export const validateReassignAbilities = (req: Request, res: Response, next: NextFunction): void => {
  // Validate that body is an array with exactly 6 elements
  if (!Array.isArray(req.body) || req.body.length !== 6) {
    res.status(400).json({
      message: "Body must be an array of 6 elements.",
    });
    return;
  }

  // Validate that array contains exactly [1, 2, 3, 4, 5, 6] in any order
  const validValues = [1, 2, 3, 4, 5, 6];
  if (!req.body.every((value) => validValues.includes(value)) || new Set(req.body).size !== 6) {
    res.status(400).json({
      message: "Array must contain exactly [1, 2, 3, 4, 5, 6] in any order.",
    });
    return;
  }

  next();
};
