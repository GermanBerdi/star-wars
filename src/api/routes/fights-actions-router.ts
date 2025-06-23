// import { Router, Request, Response } from "express";
// import actionService from "../../services/actions/actions-service";
// import { IPerformActionReq } from "../../services/actions/actions-interfaces";
// const router = Router({ mergeParams: true });

// router.post("/", async (req: Request, res: Response): Promise<void> => {
//   const fightId = req.params.fightId;
//   const { combatantId, type } = req.body;
//   const actionToPerfom: IPerformActionReq = {
//     fightId: Number(fightId),
//     combatantId: Number(combatantId),
//     type,
//   };
//   const actionPerformed = await actionService.performAction(actionToPerfom);
//   const response = {
//     message: "Action performed",
//     data: {
//       actionPerformed,
//     },
//   };
//   res.status(200).json(response);
// });

// export default router;
