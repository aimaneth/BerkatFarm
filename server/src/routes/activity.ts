import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router: Router = Router();

// Get recent activities
router.get('/recent', async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const activities = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(limit);
    res.json(activities);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error fetching activities', 
      error: error.message 
    });
  }
});

// Create activity
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error: any) {
    res.status(400).json({ 
      message: 'Error creating activity', 
      error: error.message 
    });
  }
});

export default router; 