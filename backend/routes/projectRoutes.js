import express from 'express';
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';
import { verifyFirebaseToken, requireAdmin } from '../middleware/verifyFirebaseToken.js';

const projectRouter = express.Router();

projectRouter.use(verifyFirebaseToken);

// Create Project
projectRouter.post('/create', requireAdmin, createProject);

// Get All Projects
projectRouter.get('/', getProjects);

// Get Single Project by ID
projectRouter.get('/:id', getProjectById);

// Update Project
projectRouter.put('/:id', updateProject);

// Delete Project
projectRouter.delete('/:id', requireAdmin, deleteProject);

export default projectRouter;
