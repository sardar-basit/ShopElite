import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

const calcTotals = (items) => ({
  totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
});

const initialItems = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialItems,
    ...calcTotals(initialItems),
    couponCode: '',
    discountAmount: 0,
    shippingAddress: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { _id, name, price, image, stock } = action.payload;
      const existing = state.items.find((i) => i._id === _id);
      if (existing) {
        if (existing.quantity < stock) existing.quantity += 1;
      } else {
        state.items.push({ _id, name, price, image, stock, quantity: 1 });
      }
      Object.assign(state, calcTotals(state.items));
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      Object.assign(state, calcTotals(state.items));
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        item.quantity = Math.max(1, Math.min(quantity, item.stock));
      }
      Object.assign(state, calcTotals(state.items));
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.couponCode = '';
      state.discountAmount = 0;
      saveCart([]);
    },
    applyCoupon: (state, action) => {
      const { code, discount } = action.payload;
      state.couponCode = code;
      state.discountAmount = discount;
    },
    removeCoupon: (state) => {
      state.couponCode = '';
      state.discountAmount = 0;
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  setShippingAddress,
} = cartSlice.actions;
export default cartSlice.reducer;
