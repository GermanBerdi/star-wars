import { Router } from 'express';
import starshipsRouter from './starships';

const router = Router();

router.use('/starships', starshipsRouter);

export default router;
