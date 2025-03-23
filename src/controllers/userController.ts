import { Request, Response, NextFunction } from 'express';
import { User, Thought } from '../models/index';

export const headCount = async () => {
    const numberOfUsers = await User.aggregate().count('userCount');
    return numberOfUsers;
}

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        const userObj = {
            users,
            headCount: await headCount(),
        }
        res.json(userObj);
    } catch (error: any) {
        next(error); // Pass the error to the next middleware
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error); // Pass the error to the next middleware
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        next(err); // Pass the error to the next middleware
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
        next(err); // Pass the error to the next middleware
    }
    // Ensure a response is always sent
    return res.status(500).json({ message: 'An unexpected error occurred' });
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        // Optionally, remove user's thoughts if needed
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        
        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        next(err); // Pass the error to the next middleware
    }
    // Ensure a response is always sent
    return res.status(500).json({ message: 'An unexpected error occurred' });
};