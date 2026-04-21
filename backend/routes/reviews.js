import express from 'express';
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/:productId').get(getProductReviews).post(protect, createReview);
router.route('/:id/edit').put(protect, updateReview);
router.route('/:id').delete(protect, deleteReview);

export default router;
