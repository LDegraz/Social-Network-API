import { Request, Response } from 'express';
import { Thought } from '../models/index';

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find().populate('username');
        res.json(thoughts);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId).populate('username');
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username } = req.body;
    try {
        const newThought = await Thought.create({ thoughtText, username });
        res.status(201).json(newThought);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({
                message: 'No thought with that ID'
            });
        } else {
            res.json({ message: 'Thought deleted!' });
        }

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};