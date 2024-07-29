import { Router } from 'express';
import { renderHomePage } from '../controllers/index.controller.js';

const router = Router();

router.get('/', renderHomePage);

export default router;
