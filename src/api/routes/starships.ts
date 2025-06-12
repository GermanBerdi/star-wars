import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    starships: [
      { id: 1, name: "Millennium Falcon" },
      { id: 2, name: "X-Wing" },
      { id: 3, name: "TIE Fighter" },
    ],
  });
});

export default router;
