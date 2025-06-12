import { Router } from 'express';
import healthRouter from './health'
import starshipsRouter from './starships';

const router = Router();

router.use('/health', healthRouter);
router.use('/starships', starshipsRouter);

export default router;
