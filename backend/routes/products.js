import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  toggleFeatured,
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.get('/categories', getCategories);
router
  .route('/')
  .get(getProducts)
  .post(protect, adminOnly, upload.array('images', 5), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, adminOnly, upload.array('images', 5), updateProduct)
  .delete(protect, adminOnly, deleteProduct);

router.put('/:id/feature', protect, adminOnly, toggleFeatured);

export default router;
