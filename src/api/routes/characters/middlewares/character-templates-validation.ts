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
  if (!req.body.speed) {
    res.status(400).json({ message: "speed is required." });
    return;
  }
  next();
};
