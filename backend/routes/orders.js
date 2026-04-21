import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  createPaymentIntent,
  markOrderPaid,
  getDashboardStats,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = express.Router();

router.post('/payment-intent', protect, createPaymentIntent);
router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/my', protect, getMyOrders);
router.route('/').post(protect, createOrder).get(protect, adminOnly, getAllOrders);
router.route('/:id').get(protect, getOrder);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);
router.put('/:id/pay', protect, markOrderPaid);

export default router;
