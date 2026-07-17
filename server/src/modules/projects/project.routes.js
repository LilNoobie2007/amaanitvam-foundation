import express from 'express';
import { getAll } from './project.controller.js';

const router = express.Router();
router.get('/', getAll);
export default router;
