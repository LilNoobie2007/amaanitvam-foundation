import express from 'express';
import { getAll } from './candidate.controller.js';

const router = express.Router();
router.get('/', getAll);
export default router;
