import { Router, Request, Response } from 'express';
import { Document } from 'mongoose';
import Team, { ITeam } from '../models/Team';

const router: Router = Router();

// Get all team members
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error fetching team members', 
      error: error.message 
    });
  }
});

// Get active team members count
router.get('/count/active', async (_req: Request, res: Response): Promise<void> => {
  try {
    const count = await Team.countDocuments({ status: 'active' });
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error counting active team members', 
      error: error.message 
    });
  }
});

// Get team member by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      res.status(404).json({ message: 'Team member not found' });
      return;
    }
    res.json(member);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error fetching team member', 
      error: error.message 
    });
  }
});

// Create team member
router.post('/', async (req: Request<{}, {}, Omit<ITeam, keyof Document>>, res: Response): Promise<void> => {
  try {
    const member = new Team(req.body);
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (error: any) {
    res.status(400).json({ 
      message: 'Error creating team member', 
      error: error.message 
    });
  }
});

// Update team member
router.put('/:id', async (req: Request<{ id: string }, {}, Partial<Omit<ITeam, keyof Document>>>, res: Response): Promise<void> => {
  try {
    const member = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!member) {
      res.status(404).json({ message: 'Team member not found' });
      return;
    }
    res.json(member);
  } catch (error: any) {
    res.status(400).json({ 
      message: 'Error updating team member', 
      error: error.message 
    });
  }
});

// Delete team member
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      res.status(404).json({ message: 'Team member not found' });
      return;
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error deleting team member', 
      error: error.message 
    });
  }
});

export default router; 