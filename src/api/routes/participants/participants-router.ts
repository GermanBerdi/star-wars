import { Router } from "express";
import type { Request, Response } from "express";

import characterParticipantsService from "../../../services/character-participants/character-participants-service";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const characterParticipants = await characterParticipantsService.getAll();
    const response = {
      message: "Character participants list",
      data: {
        characterParticipants,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = `Error getting character participants: ${error}`;
    res.status(500).json({ errorMessage });
  }
});

// router.get("/:id", async (req: Request, res: Response): Promise<void> => {
//   try {
//     const id = Number(req.params.id);
//     const characterTemplate = await characterParticipantsService.getById(id);
//     const response = {
//       message: "Character template info",
//       data: {
//         characterTemplate,
//       },
//     };
//     res.status(200).json(response);
//   } catch (error) {
//     const errorMessage = `Error getting character template: ${error}`;
//     if (errorMessage.includes("not found")) {
//       res.status(404).json({ errorMessage });
//       return;
//     }
//     res.status(500).json({ errorMessage });
//   }
// });

export default router;
