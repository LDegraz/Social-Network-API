import { Router } from 'express';
import { 
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    deleteReaction 
} from '../../controllers/thoughtController.js';

const router = Router();

// Route for getting all thoughts
router.get('/', getAllThoughts);

// Route for getting a thought by ID
router.get('/:thoughtId', getThoughtById);

// Route for creating a new thought
router.post('/', createThought);

// Route for updating a thought by ID
router.put('/:thoughtId', updateThought);

// Route for deleting a thought by ID
router.delete('/:thoughtId', deleteThought);

// Routes for adding and deleting reactions to a thought
router.post('/:thoughtId/reactions', addReaction); // Add reaction
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction); // Delete reaction

export { router as thoughtRouter };