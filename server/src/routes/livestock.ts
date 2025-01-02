import { Router, Request, Response } from 'express';
import { Document } from 'mongoose';
import Livestock, { ILivestock } from '../models/Livestock';

const router: Router = Router();

// Get all livestock
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const livestock = await Livestock.find();
    res.json(livestock);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error fetching livestock', 
      error: error.message 
    });
  }
});

// Get single livestock by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const livestock = await Livestock.findById(req.params.id);
    if (!livestock) {
      res.status(404).json({ message: 'Livestock not found' });
      return;
    }
    res.json(livestock);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error fetching livestock', 
      error: error.message 
    });
  }
});

// Create new livestock
router.post('/', async (req: Request<{}, {}, Omit<ILivestock, keyof Document>>, res: Response): Promise<void> => {
  try {
    const livestock = new Livestock(req.body);
    const savedLivestock = await livestock.save();
    res.status(201).json(savedLivestock);
  } catch (error: any) {
    res.status(400).json({ 
      message: 'Error creating livestock', 
      error: error.message 
    });
  }
});

// Update livestock
router.put('/:id', async (req: Request<{ id: string }, {}, Partial<Omit<ILivestock, keyof Document>>>, res: Response): Promise<void> => {
  try {
    const livestock = await Livestock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!livestock) {
      res.status(404).json({ message: 'Livestock not found' });
      return;
    }
    res.json(livestock);
  } catch (error: any) {
    res.status(400).json({ 
      message: 'Error updating livestock', 
      error: error.message 
    });
  }
});

// Delete livestock
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const livestock = await Livestock.findByIdAndDelete(req.params.id);
    if (!livestock) {
      res.status(404).json({ message: 'Livestock not found' });
      return;
    }
    res.json({ message: 'Livestock deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error deleting livestock', 
      error: error.message 
    });
  }
});

export default router; 