import { Router, Request, Response } from 'express';
import { Document } from 'mongoose';
import Distribution, { IDistribution } from '../models/Distribution';

const router: Router = Router();

// Get all distributions
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const distributions = await Distribution.find().populate('items.livestock');
    res.json(distributions);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error fetching distributions', 
      error: error.message 
    });
  }
});

// Get pending distributions count
router.get('/count/pending', async (_req: Request, res: Response): Promise<void> => {
  try {
    const count = await Distribution.countDocuments({ status: 'pending' });
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error counting pending distributions', 
      error: error.message 
    });
  }
});

// Get distribution by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const distribution = await Distribution.findById(req.params.id).populate('items.livestock');
    if (!distribution) {
      res.status(404).json({ message: 'Distribution not found' });
      return;
    }
    res.json(distribution);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error fetching distribution', 
      error: error.message 
    });
  }
});

// Create distribution
router.post('/', async (req: Request<{}, {}, Omit<IDistribution, keyof Document>>, res: Response): Promise<void> => {
  try {
    const distribution = new Distribution(req.body);
    const savedDistribution = await distribution.save();
    res.status(201).json(savedDistribution);
  } catch (error: any) {
    res.status(400).json({ 
      message: 'Error creating distribution', 
      error: error.message 
    });
  }
});

// Update distribution
router.put('/:id', async (req: Request<{ id: string }, {}, Partial<Omit<IDistribution, keyof Document>>>, res: Response): Promise<void> => {
  try {
    const distribution = await Distribution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('items.livestock');
    
    if (!distribution) {
      res.status(404).json({ message: 'Distribution not found' });
      return;
    }
    res.json(distribution);
  } catch (error: any) {
    res.status(400).json({ 
      message: 'Error updating distribution', 
      error: error.message 
    });
  }
});

// Delete distribution
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const distribution = await Distribution.findByIdAndDelete(req.params.id);
    if (!distribution) {
      res.status(404).json({ message: 'Distribution not found' });
      return;
    }
    res.json({ message: 'Distribution deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error deleting distribution', 
      error: error.message 
    });
  }
});

export default router; 