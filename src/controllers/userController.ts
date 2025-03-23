import { Request, Response } from 'express';
import { User, Thought } from '../models/index';

export const headCount = async () => {
    const numberOfUsers = await User.aggregate().count('userCount');
    return numberOfUsers;
}

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        const userObj = {
            users,
            headCount: await headCount(),
        }
        res.json(userObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('thoughts').populate('friends');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        // Optionally, remove user's thoughts if needed
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        
        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};