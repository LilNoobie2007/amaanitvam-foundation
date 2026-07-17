import express from 'express';
import { getAll } from './meeting.controller.js';

const router = express.Router();
router.get('/', getAll);
export default router;
