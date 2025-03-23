import { Router } from 'express';
import { thoughtRouter } from './thoughtRoutes';
import { userRouter } from './userRoutes';

const router = Router();

router.use('/Thought', thoughtRouter);
router.use('/User', userRouter);

export default router;
