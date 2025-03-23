import { Router } from 'express';
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    removeFriend 
} from '../../controllers/userController.js';

const router = Router();

// Route for getting all users and creating a new user
router.route('/')
    .get(getAllUsers) // Fetch all users
    .post(createUser); // Create a new user

// Route for getting, updating, and deleting a user by ID
router.route('/:userId')
    .get(getUserById) // Fetch user by ID
    .put(updateUser) // Update user by ID
    .delete(deleteUser); // Delete user by ID

// Routes for adding and removing friends
router.post('/:userId/friends/:friendId', addFriend); // Add friend
router.delete('/:userId/friends/:friendId', removeFriend); // Remove friend

export { router as userRouter };