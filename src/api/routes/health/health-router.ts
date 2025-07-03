import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
  const response = { status: "ok" };
  res.status(200).json(response);
});

export default router;
