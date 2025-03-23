import { Router } from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought } from '../../controllers/thoughtController';

const router = Router();

router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

export { router as thoughtRouter} ;