import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], 
  totalAmount: 0, 
  totalQuantity: 0 
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart (state, action) {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)

      state.totalQuantity++
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
      }
      state.totalAmount += newItem.price
      console.log('Updated cart state:', JSON.stringify(state, null, 2))
    },
    removeItemFromCart (state, action) {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)

      state.totalQuantity--
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
      state.totalAmount -= existingItem.price
      console.log('Updated cart state:', JSON.stringify(state, null, 2))
    },
    clearCart (state) {
      state.items = []
      state.totalAmount = 0
      state.totalQuantity = 0
      console.log('Cart state after clearing:', JSON.stringify(state, null, 2))
    }
  }
})

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer