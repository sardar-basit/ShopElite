# ShopElite - Advanced E-commerce Platform

A comprehensive, production-ready full-stack MERN (MongoDB, Express, React, Node.js) application built with Next.js 14 App Router. ShopElite provides a premium shopping experience featuring secure authentication, seamless integration with Stripe for payments, a robust administrative dashboard, and a gorgeous modern UI.

![ShopElite Banner](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200)

## 🚀 Features

### For Customers
- **Dynamic Storefront:** Beautiful landing page, advanced product filtering (category, price, rating, keyword), and responsive product grids.
- **Shopping Cart:** Persistent cart state using Redux Toolkit and localStorage.
- **Flexible Payments:** Checkout securely using Credit/Debit cards (Stripe Integration) or choose the convenient Cash on Delivery (COD) option with active test/demo fallbacks.
- **Order Tracking:** Track past purchases, current statuses, and delivery confirmations from a dedicated user hub.
- **Immersive Design:** Deep blue and accent orange glassmorphic visual system for a premium feel.

### For Administrators
- **Executive Dashboard:** Live metrics, KPI cards, and dynamic revenue trend charts (powered by Chart.js).
- **Product Management:** Full CRUD (Create, Read, Update, Delete) capability including local image uploading, stock management, and "featured status" toggles.
- **Order Processing:** Update user order statuses (Pending, Processing, Shipped, Delivered) securely.
- **User Management:** Manage all registered platform users.

## 💻 Tech Stack

**Frontend Architecture:**
- Framework: Next.js 14 (App Router)
- State Management: Redux Toolkit (Auth, Cart, Products logic)
- Styling: Tailwind CSS & Lucide Icons
- UI Components: custom-built, responsive form management via React Hook Form.
- Payment Handling: @stripe/react-stripe-js

**Backend Architecture:**
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB (configured via Mongoose ORM models)
- Auth: JWT (JSON Web Tokens) & bcryptjs
- File Uploads: Multer

## 🛠️ Getting Started

Follow these instructions to get a local copy of ShopElite running on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16.14.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or Atlas URI)
- A [Stripe Developer Account](https://stripe.com/) (Optional - Demo mode activates automatically without valid keys)

### 1. Backend Setup

Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=sk_test_placeholder_or_real_key
```

Start the backend server:
```bash
npm start
```
*The server will boot on `http://localhost:5000`.*

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder_or_real_key
```

Start the frontend development server:
```bash
npm run dev
```
*The app will be accessible at `http://localhost:3001` or `3000`.*

## 🧪 Default Test Credentials
If you've run the backend seeding scripts to populate your database (or wish to create new ones):
- **Admin**: `admin@ecommerce.com` | Password: `Admin@1234`
- **Customer**: `user@ecommerce.com` | Password: `User@1234`

## ⚖️ License
This project is for educational and portfolio purposes. Feel free to fork and modify!
