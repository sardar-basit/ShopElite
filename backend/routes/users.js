import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  toggleWishlist,
  getWishlist,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = express.Router();

router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, toggleWishlist);

router.route('/').get(protect, adminOnly, getAllUsers);
router
  .route('/:id')
  .get(protect, adminOnly, getUser)
  .put(protect, adminOnly, updateUser)
  .delete(protect, adminOnly, deleteUser);

export default router;
