import express from 'express';
import { getAll } from './notification.controller.js';

const router = express.Router();
router.get('/', getAll);
export default router;
