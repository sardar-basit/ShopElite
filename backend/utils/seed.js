import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

const products = [
  {
    name: 'Apple AirPods Pro (3rd Gen)',
    description: 'Industry-leading Active Noise Cancellation, Adaptive Audio, and Transparency mode. 30 hours total battery life with MagSafe charging case.',
    price: 249.99,
    discountPrice: 199.99,
    category: 'Electronics',
    stock: 50,
    featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400', public_id: '' }],
    seller: 'Tech Haven',
    ratings: 4.8,
    numReviews: 124,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Best-in-class noise cancellation with 30-hour battery. Crystal clear hands-free calling and superior sound quality.',
    price: 399.99,
    discountPrice: 299.99,
    category: 'Electronics',
    stock: 30,
    featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', public_id: '' }],
    seller: 'Audio World',
    ratings: 4.7,
    numReviews: 89,
  },
  {
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 features Nike\'s biggest heel Air unit yet for a super-soft ride. Lightweight and breathable mesh upper.',
    price: 150.00,
    discountPrice: 120.00,
    category: 'Clothing',
    stock: 100,
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', public_id: '' }],
    seller: 'Shoe Palace',
    ratings: 4.5,
    numReviews: 201,
  },
  {
    name: 'MacBook Pro 14" M3',
    description: 'Supercharged by M3 Pro or M3 Max chip. Up to 22 hours battery life. Liquid Retina XDR display with ProMotion technology.',
    price: 1999.99,
    discountPrice: 1899.99,
    category: 'Electronics',
    stock: 15,
    featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', public_id: '' }],
    seller: 'Apple Store',
    ratings: 4.9,
    numReviews: 56,
  },
  {
    name: 'The Pragmatic Programmer',
    description: 'A must-read for software developers. Updated and expanded 20th Anniversary Edition with new principles for agile development.',
    price: 49.99,
    discountPrice: 35.99,
    category: 'Books',
    stock: 200,
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', public_id: '' }],
    seller: 'BookWorld',
    ratings: 4.9,
    numReviews: 312,
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    description: 'Laser reveals microscopic dust. Intelligent reporting on an LCD screen. 60 minutes run time.',
    price: 749.99,
    discountPrice: 649.99,
    category: 'Home & Garden',
    stock: 25,
    featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', public_id: '' }],
    seller: 'Home Essentials',
    ratings: 4.6,
    numReviews: 78,
  },
  {
    name: 'Lululemon Align Leggings',
    description: 'Buttery-soft Nulu fabric. Four-way stretch for a barely-there feeling during yoga and low-impact activities.',
    price: 98.00,
    discountPrice: 78.00,
    category: 'Clothing',
    stock: 80,
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400', public_id: '' }],
    seller: 'Athletic Wear Co.',
    ratings: 4.4,
    numReviews: 156,
  },
  {
    name: 'LEGO Technic Ferrari Daytona SP3',
    description: 'Build the legendary Ferrari Daytona SP3 in LEGO Technic. 3778 pieces. Functioning V12 engine pistons and opening doors.',
    price: 399.99,
    discountPrice: 349.99,
    category: 'Toys',
    stock: 20,
    featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', public_id: '' }],
    seller: 'Toy Kingdom',
    ratings: 4.8,
    numReviews: 44,
  },
  {
    name: 'Samsung 65" 4K QLED TV',
    description: 'Quantum Dot Color technology for over a billion colors. Neo Quantum Processor 4K. Object Tracking Sound+.',
    price: 1499.99,
    discountPrice: 1199.99,
    category: 'Electronics',
    stock: 10,
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400', public_id: '' }],
    seller: 'Electronics Depot',
    ratings: 4.6,
    numReviews: 67,
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and food warmer. 6 quart capacity.',
    price: 99.95,
    discountPrice: 79.95,
    category: 'Home & Garden',
    stock: 60,
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', public_id: '' }],
    seller: 'Kitchen Plus',
    ratings: 4.7,
    numReviews: 423,
  },
  {
    name: 'Theragun Pro Massage Gun',
    description: 'Professional-grade percussive therapy device. 16mm amplitude, 5 built-in speeds, OLED screen. Industry-leading ergonomic arm.',
    price: 599.00,
    discountPrice: 449.00,
    category: 'Sports',
    stock: 35,
    featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', public_id: '' }],
    seller: 'Fitness Pro',
    ratings: 4.5,
    numReviews: 88,
  },
  {
    name: 'Charlotte Tilbury Pillow Talk Lipstick',
    description: 'A universally flattering nude-pink shade. Matte Revolution formula hydrates lips for 10 hours. Buildable color.',
    price: 39.00,
    discountPrice: 32.00,
    category: 'Beauty',
    stock: 150,
    featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1586495777744-4e6232bf6cc9?w=400', public_id: '' }],
    seller: 'Beauty Luxe',
    ratings: 4.6,
    numReviews: 234,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected for seeding');

    // Clear existing data
    await Product.deleteMany();
    await Review.deleteMany();
    console.log('🗑  Cleared existing products and reviews');

    // Ensure admin user exists
    let adminUser = await User.findOne({ email: 'admin@ecommerce.com' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@ecommerce.com',
        password: 'Admin@1234',
        role: 'admin',
      });
      console.log('👤 Admin user created: admin@ecommerce.com / Admin@1234');
    }

    let demoUser = await User.findOne({ email: 'user@ecommerce.com' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Demo Customer',
        email: 'user@ecommerce.com',
        password: 'User@1234',
        role: 'customer',
      });
      console.log('👤 Demo user created: user@ecommerce.com / User@1234');
    }

    // Insert products
    const productsWithCreator = products.map((p) => ({
      ...p,
      createdBy: adminUser._id,
    }));
    const createdProducts = await Product.insertMany(productsWithCreator);
    console.log(`✅ ${createdProducts.length} products seeded`);

    // Add sample reviews
    const reviews = [
      {
        user: demoUser._id,
        product: createdProducts[0]._id,
        rating: 5,
        comment: 'Amazing noise cancellation! Worth every penny.',
      },
      {
        user: demoUser._id,
        product: createdProducts[3]._id,
        rating: 5,
        comment: 'Blazing fast performance. Best laptop I have ever owned.',
      },
      {
        user: adminUser._id,
        product: createdProducts[0]._id,
        rating: 4,
        comment: 'Great product, comfortable fit. Battery life is impressive.',
      },
    ];

    for (const review of reviews) {
      const existing = await Review.findOne({ user: review.user, product: review.product });
      if (!existing) {
        await Review.create(review);
      }
    }

    console.log('⭐ Sample reviews seeded');
    console.log('\n🎉 Database seeded successfully!');
    console.log('📧 Admin: admin@ecommerce.com | Password: Admin@1234');
    console.log('📧 User:  user@ecommerce.com  | Password: User@1234');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
