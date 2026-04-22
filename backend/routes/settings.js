import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, admin, updateSettings);

export default router;
