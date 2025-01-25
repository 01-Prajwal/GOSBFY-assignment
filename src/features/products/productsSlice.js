import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  products: [],
  cart: [], // Add cart state here
  loading: false,
  error: null,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://interview.gdev.gosbfy.com/api/collections/Products/records'
      );
      const products = response.data.items.map((product) => ({
        ...product,
        imageUrl: `https://interview.gdev.gosbfy.com/api/files/${product.collectionId}/${product.id}/${product.image}`,
      }));
      return products;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        // Update quantity if the item already exists in the cart
        existingItem.quantity += product.quantity;
      } else {
        // Add new item to cart
        state.cart.push({ ...product, quantity: product.quantity });
      }
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);
      if (cartItem && quantity > 0) {
        cartItem.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

// Export actions and selectors
export const { addToCart, updateCartQuantity, removeFromCart } = productsSlice.actions;
export const selectProducts = (state) => state.products.products;
export const selectCart = (state) => state.products.cart;

export default productsSlice.reducer;
