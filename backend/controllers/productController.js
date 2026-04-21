import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Get all products (with search, filter, sort, pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    minRating,
    sort,
    page = 1,
    limit = 12,
    featured,
  } = req.query;

  const query = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (minRating) query.ratings = { $gte: Number(minRating) };
  if (featured === 'true') query.featured = true;

  // Sorting
  let sortQuery = {};
  switch (sort) {
    case 'price_asc':
      sortQuery = { price: 1 };
      break;
    case 'price_desc':
      sortQuery = { price: -1 };
      break;
    case 'rating':
      sortQuery = { ratings: -1 };
      break;
    case 'newest':
      sortQuery = { createdAt: -1 };
      break;
    case 'popular':
      sortQuery = { numReviews: -1 };
      break;
    default:
      sortQuery = { createdAt: -1 };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(Number(limit));

  res.json({
    success: true,
    count: products.length,
    total,
    pages: Math.ceil(total / Number(limit)),
    currentPage: Number(page),
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'createdBy',
    'name'
  );

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ success: true, data: product });
});

// @desc    Create product
// @route   POST /api/products
// @access  Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, discountPrice, featured, couponCode, couponDiscount, seller } = req.body;

  // Handle uploaded images
  let images = [];
  if (req.files && req.files.length > 0) {
    images = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      public_id: file.filename,
    }));
  } else if (req.body.images) {
    // Allow passing image URLs directly
    const rawImages = Array.isArray(req.body.images)
      ? req.body.images
      : [req.body.images];
    images = rawImages.map((url) => ({ url, public_id: '' }));
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    images,
    discountPrice: discountPrice || 0,
    featured: featured || false,
    couponCode: couponCode || '',
    couponDiscount: couponDiscount || 0,
    seller: seller || 'Admin Store',
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, data: product });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin
export const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Handle new image uploads
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      public_id: file.filename,
    }));
    req.body.images = [...(product.images || []), ...newImages];
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: product });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.json({ success: true, message: 'Product deleted successfully' });
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json({ success: true, data: categories });
});

// @desc    Toggle product featured status
// @route   PUT /api/products/:id/feature
// @access  Admin
export const toggleFeatured = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  product.featured = !product.featured;
  await product.save();
  res.json({ success: true, data: product });
});
