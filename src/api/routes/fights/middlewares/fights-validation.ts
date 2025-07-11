import type { Request, Response, NextFunction } from "express";

export const validateCreateFight = (req: Request, res: Response, next: NextFunction): void => {
  const { fight_name, available_teams } = req.body;

  if (!fight_name?.trim()) {
    res.status(400).json({ message: "fight_name is required" });
    return;
  }

  if (
    available_teams !== undefined &&
    (!Array.isArray(available_teams) || !available_teams.every((team) => typeof team === "number" && team > 0))
  ) {
    res.status(400).json({
      message:
        "available_teams must be an array of positive numbers for team battles (e.g., [1,2]) or empty array [] for free-for-all",
    });
    return;
  }

  next();
};

export const validateCreateParticipant = (req: Request, res: Response, next: NextFunction): void => {
  const { character_template_id, participant_name } = req.body;

  if (!character_template_id) {
        res.status(400).json({ message: "character_template_id is required." });
        return;
      }
  if (!participant_name) {
        res.status(400).json({ message: "participant_name is required." });
        return;
  }

  next();
};
