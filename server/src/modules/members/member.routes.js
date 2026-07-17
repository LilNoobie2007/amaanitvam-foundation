import express from 'express';
import { getAll } from './member.controller.js';

const router = express.Router();
router.get('/', getAll);
export default router;
