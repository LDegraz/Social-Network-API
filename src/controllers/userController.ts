import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

export const headCount = async (): Promise<number> => {
  const result = await User.aggregate().count('userCount');
  return result[0]?.userCount || 0;
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json({
      users,
      headCount: await headCount(),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true, runValidators: true });
    if (!user) {
      res.status(404).json({ message: 'No user found with that ID' });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'No such user exists' });
      return;
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User and associated thoughts successfully deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addFriend = async (req: Request<{ userId: string; friendId: string }>, res: Response): Promise<void> => {
  console.log("Add friend");
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFriend = async (req: Request<{ userId: string; friendId: string }>, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
