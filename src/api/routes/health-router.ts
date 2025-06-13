import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
  const response = { status: "ok" };
  res.json(response);
});

export default router;
