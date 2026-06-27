import express from 'express';
import {
    createTask,
    getTasks,
    getTaskById,
    getTasksByStatus,
    getTasksByUser,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';
import { verifyFirebaseToken, requireAdmin } from '../middleware/verifyFirebaseToken.js';

const taskRouter = express.Router();

taskRouter.use(verifyFirebaseToken);

// Create Task
taskRouter.post('/create', requireAdmin, createTask);

// Get All Tasks
taskRouter.get('/', getTasks);

// Get Tasks by Status
taskRouter.get('/status/:status', getTasksByStatus);

// Get Tasks Assigned to User
taskRouter.get('/user/:userId', getTasksByUser);

// Get Single Task by ID
taskRouter.get('/:id', getTaskById);

// Update Task
taskRouter.put('/:id', updateTask);

// Delete Task
taskRouter.delete('/:id', requireAdmin, deleteTask);

export default taskRouter;
