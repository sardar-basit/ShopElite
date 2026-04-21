import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import stripe from '../config/stripe.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    couponCode,
    discountAmount,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Verify stock availability
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product ${item.name} not found`);
    }
    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.name}`);
    }
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'stripe',
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    couponCode: couponCode || '',
    discountAmount: discountAmount || 0,
  });

  // Reduce product stock
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  res.status(201).json({ success: true, data: order });
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('orderItems.product', 'name images')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: orders.length, data: orders });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('orderItems.product', 'name images price');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Only allow owner or admin
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }

  res.json({ success: true, data: order });
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const query = status ? { orderStatus: status } : {};
  const skip = (Number(page) - 1) * Number(limit);

  const total = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  res.json({
    success: true,
    count: orders.length,
    total,
    pages: Math.ceil(total / Number(limit)),
    data: orders,
  });
});

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.orderStatus = orderStatus;
  if (orderStatus === 'Delivered') {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }

  await order.save();
  res.json({ success: true, data: order });
});

// @desc    Update order payment status (admin)
// @route   PUT /api/orders/:id/payment-status
// @access  Admin
export const updateOrderPaymentStatus = asyncHandler(async (req, res) => {
  const { isPaid } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isPaid = isPaid;
  if (isPaid && !order.paidAt) {
    order.paidAt = Date.now();
  }

  await order.save();
  res.json({ success: true, data: order });
});

// @desc    Create Stripe payment intent
// @route   POST /api/orders/payment-intent
// @access  Private
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'usd', orderId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        orderId: orderId?.toString() || '',
        userId: req.user._id.toString(),
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.warn('Stripe Setup Error:', error.message);
    res.json({
      success: true,
      clientSecret: 'mock_demo_client_secret',
      paymentIntentId: 'pi_mock_' + Date.now(),
    });
  }
});

// @desc    Mark order as paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const markOrderPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.orderStatus = 'Processing';
  order.paymentResult = {
    id: req.body.paymentIntentId,
    status: 'succeeded',
    update_time: new Date().toISOString(),
    email_address: req.user.email,
  };
  order.stripePaymentIntentId = req.body.paymentIntentId;

  await order.save();
  res.json({ success: true, data: order });
});

// @desc    Get admin dashboard stats
// @route   GET /api/orders/stats
// @access  Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);

  const ordersByStatus = await Order.aggregate([
    { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
  ]);

  // Monthly revenue (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyRevenue = await Order.aggregate([
    { $match: { isPaid: true, createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        revenue: { $sum: '$totalPrice' },
        orders: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  res.json({
    success: true,
    data: {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersByStatus,
      monthlyRevenue,
    },
  });
});
