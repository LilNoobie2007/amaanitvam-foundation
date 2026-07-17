import express from 'express';
import { getAll } from './internship.controller.js';

const router = express.Router();
router.get('/', getAll);
export default router;
