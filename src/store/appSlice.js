import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  cart: [],
  user: null,
  loading: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    addToCart: (state, action) => {
      const item = action.payload
      const existing = state.cart.find(i => i.id === item.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.cart.push({ ...item, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(i => i.id !== action.payload)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.cart.find(i => i.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.cart = []
    }
  }
})

export const {
  setProducts,
  setUser,
  setLoading,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = appSlice.actions

export const selectProducts = (state) => state.app.products
export const selectCart = (state) => state.app.cart
export const selectUser = (state) => state.app.user
export const selectLoading = (state) => state.app.loading
export const selectCartCount = (state) =>
  state.app.cart.reduce((sum, item) => sum + item.quantity, 0)

export const selectTotalPrice = (state) =>
  state.app.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

export default appSlice.reducer 