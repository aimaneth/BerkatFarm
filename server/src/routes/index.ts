import { Router } from 'express';
import livestockRoutes from './livestock';
import teamRoutes from './team';
import distributionRoutes from './distribution';
import activityRoutes from './activity';

const router = Router();

// Mount route handlers
router.use('/livestock', livestockRoutes);
router.use('/team', teamRoutes);
router.use('/distribution', distributionRoutes);
router.use('/activity', activityRoutes);

export default router; 