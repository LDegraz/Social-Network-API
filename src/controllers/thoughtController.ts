import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

export const getAllThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getThoughtById = async (req: Request<{ thoughtId: string }>, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createThought = async (
  req: Request<{}, {}, { thoughtText: string; username: string; userId: string }>,
  res: Response
): Promise<void> => {
  try {
    const newThought = await Thought.create({ thoughtText: req.body.thoughtText, username: req.body.username });
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
    res.status(201).json(newThought);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateThought = async (req: Request<{ thoughtId: string }>, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
      return;
    }
    res.json(thought);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteThought = async (req: Request<{ thoughtId: string }>, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json({ message: 'Thought deleted!' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addReaction = async (
  req: Request<{ thoughtId: string }, {}, { reactionBody: string; username: string }>,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json(thought);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReaction = async (
  req: Request<{ thoughtId: string; reactionId: string }>,
  res: Response
): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json({ message: 'Reaction deleted', thought });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
